import { z } from "zod";
import { slugSchema, findAllBaseSchema, idSchema, createUpdateRefine, createUpdateRefineMessage } from "../../../server/shared/schemas";

export const registerCategorySchema = z.object({
    name: z
        .string()
        .min(2, "Category name must be at least 2 characters long")
        .max(50, "Category name cannot exceed 50 characters")
        .regex(/^[a-zA-Z0-9\s\-_&]+$/, "Category name can only contain letters, numbers, spaces, hyphens, underscores, and ampersands"),

    slug: slugSchema,

    description: z
        .string()
        .max(160, "Description cannot exceed 160 characters. Keep it concise to help users understand the category.")
        .optional(),
});

export const updateCategorySchema = z
    .object({
        id: idSchema,
        name: z.string().min(2, "Category name must be at least 2 characters long").max(50, "Category name cannot exceed 50 characters").regex(/^[a-zA-Z0-9\s\-_&]+$/, "Category name can only contain letters, numbers, spaces, hyphens, underscores, and ampersands").optional(),
        slug: slugSchema.optional(),
        description: z.string().max(160, "Description cannot exceed 160 characters. Keep it concise to help users understand the category.").optional().nullable(),
    })
    .refine(
        createUpdateRefine("Category"),
        {
            message: createUpdateRefineMessage("Category"),
        }
    );

export const bulkRegisterCategoriesSchema = z.object({
    categories: z
        .array(registerCategorySchema)
        .min(1, "At least one category is required"),
});

export const findAllCategoriesSchema = findAllBaseSchema;