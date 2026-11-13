import z from "zod";

export const BrandSchema = z.object({
    id: z.number(),
    brand: z.string(),

});

export const brandListResponseSchema = z.object({
    responseCode: z.number(),
    brands: z.array(BrandSchema),
});