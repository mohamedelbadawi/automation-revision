import { z } from "zod";
import { CategorySchema } from "./Category.schema";



export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  brand: z.string(),
  category: CategorySchema,
});

export const ProductsListResponseSchema = z.object({
  responseCode: z.number(),
  products: z.array(ProductSchema),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductsListResponse = z.infer<typeof ProductsListResponseSchema>;

