import { type FindTagById, type FindTagBySlug } from "wasp/server/operations";
import { FindTagByIdInput, FindTagByIdResponse, FindTagBySlugInput, FindTagBySlugResponse } from "../../dto/types";
import { HttpError } from "wasp/server";

export const findTagBySlug: FindTagBySlug<FindTagBySlugInput, FindTagBySlugResponse> = async (args, context) => {

    const { slug } = args;

    if (!slug) {
        throw new HttpError(
            400,
            "Slug is required to find a tag!",
            { code: "BAD_REQUEST" }
        )
    };

    const tag = await context.entities.Tag.findUnique({
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

    if (!tag) {
        throw new HttpError(
            404,
            "Tag not found!",
            { code: "NOT_FOUND", details: { slug } }
        )
    }

    return tag;
};

export const findTagById: FindTagById<FindTagByIdInput, FindTagByIdResponse> = async (args, context) => {

    const { id } = args;

    if (!id) {
        throw new HttpError(
            400,
            "ID is required to find a tag!",
            { code: "BAD_REQUEST" }
        )
    };

    const tag = await context.entities.Tag.findUnique({
        where: {
            id,
            deletedAt: null,
        }
    });

    if (!tag) {
        throw new HttpError(
            404,
            "Tag not found!",
            { code: "NOT_FOUND", details: { id } }
        )
    }

    return tag;
};