import { z } from "zod";
import { slugSchema, findAllBaseSchema, idSchema, createUpdateRefine, createUpdateRefineMessage } from "../../../server/shared/schemas";

export const registerCategorySchema = z.object({
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

export const updateCategorySchema = z
    .object({
        id: idSchema,
        name: z.string().min(2, "Name is too short").max(50, "Name is too long").optional(),
        slug: slugSchema.optional(),
        description: z.string().max(160, "Description should be under 160 characters").optional().nullable(),
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