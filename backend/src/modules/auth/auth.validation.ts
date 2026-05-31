import { USER_ROLES } from "@modules/user/user.model.js";
import { z } from "zod";

export const signupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3)
        .max(50),

    email: z
        .email()
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(8)
        .max(32),
});

export const loginSchema = z.object({
    email: z
        .email()
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(1),
});

export const updateUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3)
        .max(50)
        .optional(),

    role: z
        .enum(USER_ROLES)
        .optional(),
});

export type SignupInput =
    z.infer<typeof signupSchema>;

export type LoginInput =
    z.infer<typeof loginSchema>;

export type UpdateUserInput =
    z.infer<typeof updateUserSchema>;