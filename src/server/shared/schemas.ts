import { z } from "zod";

// Reusable validation patterns
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugSchema = z
    .string()
    .min(2)
    .max(60)
    .regex(slugRegex, "Slug must be kebab-case (lowercase, hyphens only)");

export const paginationSchema = z.object({
    page: z.number().int().positive().optional().default(1),
    pageSize: z.number().int().positive().max(100).optional().default(20),
});

export const searchSchema = z.object({
    query: z.string().min(1).max(100).optional(),
    includeDeleted: z.boolean().optional().default(false),
});

// Combine pagination and search for common find-all pattern
export const findAllBaseSchema = paginationSchema.merge(searchSchema);

// Common validation helpers
export const idSchema = z.string().min(1, "ID is required");

export const createUpdateRefine = (entityName: string) => 
    (data: Record<string, any>) => {
        const { id, ...updates } = data;
        return Object.keys(updates).length > 0;
    };

export const createUpdateRefineMessage = (entityName: string) => 
    `At least one field must be provided to update the ${entityName.toLowerCase()}`;