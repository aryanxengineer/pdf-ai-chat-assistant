import { z } from "zod";

export const uploadDocumentSchema = z.object({
  originalname: z
    .string()
    .trim()
    .min(1),

  mimetype: z
    .literal("application/pdf"),

  size: z
    .number()
    .max(10 * 1024 * 1024, "Max file size: 10MB"),
});

export type UploadDocumentInput =
  z.infer<typeof uploadDocumentSchema>; 