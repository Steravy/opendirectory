import { type RegisterTag } from "wasp/server/operations";
import { HttpError } from "wasp/server";
import { RegisterTagInput, RegisterTagResponse } from "../../dto/types";
import { canPerformServerSideAdminAction } from "../../../../server/shared/auth-utils";

export const registerTag: RegisterTag<RegisterTagInput, RegisterTagResponse> = async (data, context) => {

    canPerformServerSideAdminAction(context.user!);

    const { name, slug, description } = data;

    // Normalize inputs for consistent validation
    const normalizedName = name.trim();
    const normalizedSlug = slug.trim().toLowerCase();

    // Check for existing tag with case-insensitive comparison
    const existingTag = await context.entities.Tag.findFirst({
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

    if (existingTag) {
        if (existingTag.slug.toLowerCase() === normalizedSlug) {
            throw new HttpError(
                409,
                "A tag with this URL identifier already exists",
                { 
                    code: "SLUG_ALREADY_EXISTS", 
                    details: { slug: data.slug } 
                }
            );
        }
        if (existingTag.name.toLowerCase() === normalizedName.toLowerCase()) {
            throw new HttpError(
                409,
                "A tag with this name already exists",
                { 
                    code: "NAME_ALREADY_EXISTS", 
                    details: { name: data.name } 
                }
            );
        }
    }

    // Create tag with normalized values
    const newTag = await context.entities.Tag.create({
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

    return newTag;
};
