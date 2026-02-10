import z from "zod";
import { bulkRegisterTagsSchema, registerTagSchema, updateTagSchema } from "./schemas";

export type RegisterTagInput = z.infer<typeof registerTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
export type BulkRegisterTagsInput = z.infer<typeof bulkRegisterTagsSchema>;

export type RegisterTagResponse = {
    id: string;
    name: string;
    slug: string;
};

export type UpdateTagResponse = RegisterTagResponse;
export type FindAllTagsInput = {
    page?: number;
    pageSize?: number;
};
export type FindTagByIdInput = {
    id: string;
};
export type FindTagBySlugInput = {
    slug: string;
};
export type FindAllTagsResponse = RegisterTagResponse[];
export type FindTagByIdResponse = RegisterTagResponse | null;
export type FindTagBySlugResponse = RegisterTagResponse | null;
