"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "../../auth";
import { LoginSchema } from "@/schemas/login";

export const LoginCredentials = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { message: "Login failed" };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials" };
      }
    }
    throw error;
  }
  return { message: "Login successful" };
};
