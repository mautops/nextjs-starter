import { User as DefaultSessionUser } from "next-auth";

export interface User extends DefaultSessionUser {
  // roles: string[];
  // permissions: string[];
  // isAdmin: boolean;
}

export interface AuthResponse {
  user: User | null;
  error?: string;
}

export interface Permission {
  id: string;
  name: string;
  codename: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}
