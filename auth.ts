import { User } from "@/lib/auth/types";
import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Keycloak from "next-auth/providers/keycloak";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Keycloak,
    GitHub,
    Credentials({
      name: "DjangoBackend",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          // Replace with your Django API endpoint
          const response = await fetch(
            "http://localhost:8000/api/auth/login/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data.user) {
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              roles: data.user.roles,
              permissions: data.user.permissions,
              isAdmin: data.user.isAdmin,
            };
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // token.roles = user.roles;
        // token.permissions = user.permissions;
        // token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // session.user.roles = token.roles;
        // session.user.permissions = token.permissions;
        // session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});
