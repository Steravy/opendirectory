import { type FindAllTags } from "wasp/server/operations";
import { FindAllTagsInput, FindAllTagsResponse } from "../../dto/types";

export const findAllTags: FindAllTags<FindAllTagsInput, FindAllTagsResponse> = async (args, context) => {

    const { page = 1, pageSize = 20 } = args;
    const take = pageSize > 100 ? 100 : pageSize;
    const skip = (page - 1) * take;

    return context.entities.Tag.findMany({
        where: {
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            slug: true,
        },
        orderBy: {
            createdAt: "asc",
        },
        take,
        skip,
    });
};
