import { type UpdateCategory } from "wasp/server/operations";
import { UpdateCategoryInput, UpdateCategoryResponse } from "../../dto/types";
import { canPerformServerSideAdminAction } from "../../../../server/shared/auth-utils";
import { HttpError } from "wasp/server";
import { Prisma } from "@prisma/client";

export const updateCategory: UpdateCategory<UpdateCategoryInput, UpdateCategoryResponse> = async (args, context) => {

    canPerformServerSideAdminAction(context.user!);

    const { id, name, slug, description } = args;

    // Check if category exists and is not deleted
    const existingCategory = await context.entities.Category.findUnique({
        where: { id, deletedAt: null },
    });

    if (!existingCategory) {
        throw new HttpError(404, "Category not found or deleted", { code: "NOT_FOUND" });
    }

    // Build update data dynamically - only include provided fields
    const updateData: Prisma.CategoryUpdateInput = {};
    
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;

    // Ensure we're actually updating something
    if (Object.keys(updateData).length === 0) {
        throw new HttpError(400, "No fields provided to update", { code: "BAD_REQUEST" });
    }

    return context.entities.Category.update({
        where: { id },
        data: updateData,
        select: {
            id: true,
            name: true,
            slug: true,
        }
    });

};