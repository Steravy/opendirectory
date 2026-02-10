import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugSchema = z
    .string()
    .min(2)
    .max(60)
    .regex(slugRegex, "Slug must be kebab-case (lowercase, hyphens only)");

export const registerTagSchema = z.object({
    name: z
        .string()
        .min(2, "Name is too short")
        .max(50, "Name is too long"),

    slug: slugSchema,

    description: z
        .string()
        .max(160, "Description should be under 160 characters")
        .optional(),
});

export const updateTagSchema = z
    .object({
        id: z.string().min(1),

        name: z.string().min(2).max(50).optional(),
        slug: slugSchema.optional(),
        description: z.string().max(160).optional(),
    })
    .refine(
        ({ name, slug, description }) =>
            name !== undefined ||
            slug !== undefined ||
            description !== undefined,
        {
            message: "At least one field must be updated",
        }
    );

export const bulkRegisterTagsSchema = z.object({
    tags: z
        .array(registerTagSchema)
        .min(1, "At least one tag is required"),
});
