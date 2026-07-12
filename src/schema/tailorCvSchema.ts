import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const tailorCvSchema = z.object({
  jobDesc: z
    .string()
    .trim()
    .min(10, "Job description must be at least 10 characters.")
    .max(2500, "Job description cannot exceed 2500 characters."),

  file: z
    .custom<File>((file) => file instanceof File, {
      message: "Please upload your CV.",
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Only PDF files are allowed.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File must not exceed 5 MB.",
    }),
});

export type TailorCvForm = z.infer<typeof tailorCvSchema>;
