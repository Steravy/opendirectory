import z from "zod";
import { bulkRegisterTagsSchema, findAllTagsSchema, registerTagSchema, updateTagSchema } from "./schemas";
import { StringOrNull } from "../../../server/shared/types";

export type RegisterTagInput = z.infer<typeof registerTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
export type BulkRegisterTagsInput = z.infer<typeof bulkRegisterTagsSchema>;

export type RegisterTagResponse = {
    id: string;
    name: string;
    slug: string;
};

export type TagSearchResponse = { description: StringOrNull, createdAt: Date } & RegisterTagResponse;
export type FindSingleTagResponse = TagSearchResponse;

export type UpdateTagResponse = RegisterTagResponse;
export type FindAllTagsInput = z.infer<typeof findAllTagsSchema>;
export type FindTagByIdInput = {
    id: string;
};
export type FindTagBySlugInput = {
    slug: string;
};
export type FindAllTagsResponse = TagSearchResponse[];
export type FindTagByIdResponse = FindSingleTagResponse | null;
export type FindTagBySlugResponse = FindSingleTagResponse | null;
