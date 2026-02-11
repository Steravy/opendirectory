import { AuthUser } from "wasp/auth";
import { HttpError } from "wasp/server";
import { UserRole } from "./types";

export const canPerformServerSideAdminAction = (user: AuthUser) => {

    if (!user) {
        throw new HttpError(
            401,
            "You must be logged in to make this operation!",
            { code: "UNAUTHORIZED" }
        )
    } else if (user.role !== UserRole.OWNER) {
        throw new HttpError(
            403,
            "You do not have permission to make this operation!",
            { code: "FORBIDDEN" }
        )
    }
};

export const userCanSeeDeletedItems = (user: AuthUser) => {

    if (!user) return false;

    return user.role === UserRole.OWNER;
};