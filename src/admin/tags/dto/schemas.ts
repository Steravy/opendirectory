import { z } from "zod";
import { slugSchema, findAllBaseSchema, idSchema, createUpdateRefine, createUpdateRefineMessage } from "../../../server/shared/schemas";

export const registerTagSchema = z.object({
    name: z
        .string()
        .min(2, "Tag name must be at least 2 characters long")
        .max(50, "Tag name cannot exceed 50 characters")
        .regex(/^[a-zA-Z0-9\s\-_&\/]+$/, "Tag name can only contain letters, numbers, spaces, hyphens, underscores, forward slashes, and ampersands"),

    slug: slugSchema,

    description: z
        .string()
        .max(160, "Description cannot exceed 160 characters. Keep it concise to help users understand when to use this tag.")
        .optional(),
});

export const updateTagSchema = z
    .object({
        id: idSchema,
        name: z.string().min(2, "Tag name must be at least 2 characters long").max(50, "Tag name cannot exceed 50 characters").regex(/^[a-zA-Z0-9\s\-_&\/]+$/, "Tag name can only contain letters, numbers, spaces, hyphens, underscores, forward slashes, and ampersands").optional(),
        slug: slugSchema.optional(),
        description: z.string().max(160, "Description cannot exceed 160 characters. Keep it concise to help users understand when to use this tag.").optional().nullable(),
    })
    .refine(
        createUpdateRefine("Tag"),
        {
            message: createUpdateRefineMessage("Tag"),
        }
    );

export const bulkRegisterTagsSchema = z.object({
    tags: z
        .array(registerTagSchema)
        .min(1, "At least one tag is required"),
});

export const findAllTagsSchema = findAllBaseSchema;
