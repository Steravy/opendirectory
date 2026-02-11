import { type FindAllTags } from "wasp/server/operations";
import { FindAllTagsInput, FindAllTagsResponse } from "../../dto/types";
import { Prisma } from '@prisma/client';

export const findAllTags: FindAllTags<FindAllTagsInput, FindAllTagsResponse> = async (args, context) => {

    const { page = 1, pageSize = 20, query, includeDeleted = false } = args;
    const take = pageSize > 100 ? 100 : pageSize;
    const skip = (page - 1) * take;

    const whereClause: Prisma.TagWhereInput = {};

    if (!includeDeleted) {
        whereClause.deletedAt = null;
    }

    if (query) {
        whereClause.OR = [
            { name: { contains: query, mode: 'insensitive' } },
            { slug: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
        ];
    }

    return context.entities.Tag.findMany({
        where: whereClause,
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "asc",
        },
        take,
        skip,
    });

}
