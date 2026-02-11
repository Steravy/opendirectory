import { RegisterCategory } from "wasp/server/operations";
import { canPerformServerSideAdminAction } from "../../../../server/shared/auth-utils";
import { RegisterCategoryInput, RegisterCategoryResponse } from "../../dto/types";

export const registerCategory: RegisterCategory<RegisterCategoryInput, RegisterCategoryResponse> = async (data, context) => {

    canPerformServerSideAdminAction(context.user!);

    const { name, slug, description } = data;

    const newCategory = await context.entities.Category.create({
        data: {
            name,
            slug,
            description,
        },
        select: {
            id: true,
            name: true,
            slug: true
        }
    });

    return newCategory;
};