import { FindCategoryById, FindCategoryBySlug } from "wasp/server/operations";
import { FindCategoryByIdInput, FindCategoryByIdResponse, FindCategoryBySlugInput, FindCategoryBySlugResponse } from "../../dto/types";
import { HttpError } from "wasp/server";

export const findCategoryBySlug: FindCategoryBySlug<FindCategoryBySlugInput, FindCategoryBySlugResponse> = async (args, context) => {

    const { slug } = args;

    if (!slug) {
        throw new HttpError(
            400,
            "Slug is required to find a category!",
            { code: "BAD_REQUEST" }
        )
    };

    const category = await context.entities.Category.findUnique({
        where: {
            slug,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            createdAt: true,
        }
    });

    if (!category) {
        throw new HttpError(
            404,
            "Category not found!",
            { code: "NOT_FOUND", details: { slug } }
        )
    }

    return category;
};

export const findCategoryById: FindCategoryById<FindCategoryByIdInput, FindCategoryByIdResponse> = async (args, context) => {

    const { id } = args;

    if (!id) {
        throw new HttpError(
            400,
            "ID is required to find a category!",
            { code: "BAD_REQUEST" }
        )
    };

    const category = await context.entities.Category.findUnique({
        where: {
            id,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            createdAt: true,
        }
    });

    if (!category) {
        throw new HttpError(
            404,
            "Category not found!",
            { code: "NOT_FOUND", details: { id } }
        )
    }

    return category;
};