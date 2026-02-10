import { type UpdateTag } from "wasp/server/operations";
import { UpdateTagInput, UpdateTagResponse } from "../../dto/types";
import { canPerformServerSideAdminAction } from "../../../../server/shared/auth-utils";

export const updateTag: UpdateTag<UpdateTagInput, UpdateTagResponse> = async (args, context) => {

    canPerformServerSideAdminAction(context.user!);

    const { id, name, slug, description } = args;

    return context.entities.Tag.update({
        where: { id },
        data: {
            name,
            slug,
            description,
        },
        select: {
            id: true,
            name: true,
            slug: true,
        }
    });

};
