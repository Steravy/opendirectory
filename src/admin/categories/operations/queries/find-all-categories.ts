import { type FindAllCategories } from "wasp/server/operations";
import { FindAllCategoriesInput, FindAllCategoriesResponse } from "../../dto/types";
import { Prisma } from '@prisma/client';
import { userCanSeeDeletedItems } from "../../../../server/shared/auth-utils";

export const findAllCategories: FindAllCategories<FindAllCategoriesInput, FindAllCategoriesResponse> = async (args, context) => {

    const { page = 1, pageSize = 20, query, includeDeleted = false } = args;
    const take = pageSize > 100 ? 100 : pageSize;
    const skip = (page - 1) * take;
    const userCanSeedDeleted = userCanSeeDeletedItems(context.user!);
    const whereClause: Prisma.CategoryWhereInput = {};

    if (!userCanSeedDeleted) whereClause.deletedAt = null;
    else {
        if (!includeDeleted) whereClause.deletedAt = null;
    }

    if (query) {
        whereClause.OR = [
            { name: { contains: query, mode: 'insensitive' } },
            { slug: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
        ];
    }

    return context.entities.Category.findMany({
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

};