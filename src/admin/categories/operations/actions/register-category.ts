import { RegisterCategory } from "wasp/server/operations";
import { HttpError } from "wasp/server";
import { canPerformServerSideAdminAction } from "../../../../server/shared/auth-utils";
import { RegisterCategoryInput, RegisterCategoryResponse } from "../../dto/types";

export const registerCategory: RegisterCategory<RegisterCategoryInput, RegisterCategoryResponse> = async (data, context) => {

    canPerformServerSideAdminAction(context.user!);

    const { name, slug, description } = data;

    // Normalize inputs for consistent validation
    const normalizedName = name.trim();
    const normalizedSlug = slug.trim().toLowerCase();

    // Check for existing category with case-insensitive comparison
    const existingCategory = await context.entities.Category.findFirst({
        where: {
            OR: [
                {
                    slug: {
                        equals: normalizedSlug,
                        mode: 'insensitive'
                    }
                },
                {
                    name: {
                        equals: normalizedName,
                        mode: 'insensitive'
                    }
                }
            ],
            deletedAt: null
        },
        select: {
            id: true,
            name: true,
            slug: true
        }
    });

    if (existingCategory) {
        if (existingCategory.name.toLowerCase() === normalizedName.toLowerCase()) {
            throw new HttpError(
                409,
                "A category with this name already exists",
                {
                    code: "NAME_ALREADY_EXISTS",
                    details: { name: data.name }
                }
            );
        }

        if (existingCategory.slug.toLowerCase() === normalizedSlug) {
            throw new HttpError(
                409,
                "A category with this URL identifier already exists",
                {
                    code: "SLUG_ALREADY_EXISTS",
                    details: { slug: data.slug }
                }
            );
        }
    }

    // Create category with normalized values
    const newCategory = await context.entities.Category.create({
        data: {
            name: normalizedName,
            slug: normalizedSlug,
            description: description?.trim() || null,
        },
        select: {
            id: true,
            name: true,
            slug: true
        }
    });

    return newCategory;
};