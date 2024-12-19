"use server";

import { z } from "zod";
import { RegisterSchema } from "@/schemas/login";

export const RegisterCredentials = async (
  data: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { message: "Register failed" };
  }

  //   const { name, email, password } = validatedFields.data;

  return { message: "Register successful" };
};
