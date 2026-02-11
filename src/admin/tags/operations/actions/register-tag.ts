import { type RegisterTag } from "wasp/server/operations";
import { RegisterTagInput, RegisterTagResponse } from "../../dto/types";
import { canPerformServerSideAdminAction } from "../../../../server/shared/auth-utils";

export const registerTag: RegisterTag<RegisterTagInput, RegisterTagResponse> = async (data, context) => {

    canPerformServerSideAdminAction(context.user!);

    const { name, slug, description } = data;

    const newTag = await context.entities.Tag.create({
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

    return newTag;
};
