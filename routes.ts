/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for the API routes that are used for authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect route after loggin.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
