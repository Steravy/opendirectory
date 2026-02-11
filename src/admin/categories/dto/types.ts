import z from "zod";
import {
    bulkRegisterCategoriesSchema,
    findAllCategoriesSchema,
    registerCategorySchema,
    updateCategorySchema
} from "./schemas";
import { StringOrNull } from "../../../server/shared/types";

export type RegisterCategoryInput = z.infer<typeof registerCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type BulkRegisterCategoriesInput = z.infer<typeof bulkRegisterCategoriesSchema>;

export type RegisterCategoryResponse = {
    id: string;
    name: string;
    slug: string;
};

export type CategorySearchResponse = { description: StringOrNull, createdAt: Date } & RegisterCategoryResponse;
export type FindSingleCategoryResponse = CategorySearchResponse;

export type UpdateCategoryResponse = RegisterCategoryResponse;
export type FindAllCategoriesInput = z.infer<typeof findAllCategoriesSchema>;
export type FindCategoryByIdInput = {
    id: string;
};
export type FindCategoryBySlugInput = {
    slug: string;
};
export type FindAllCategoriesResponse = CategorySearchResponse[];
export type FindCategoryByIdResponse = FindSingleCategoryResponse | null;
export type FindCategoryBySlugResponse = FindSingleCategoryResponse | null;