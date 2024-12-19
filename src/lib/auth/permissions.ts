import { User } from "@/lib/auth/types";

export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false;
  if (user.isAdmin) return true;
  return user.permissions.includes(permission);
}

export function hasRole(user: User | null, role: string): boolean {
  if (!user) return false;
  if (user.isAdmin) return true;
  return user.roles.includes(role);
}

export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  return user.isAdmin;
}
