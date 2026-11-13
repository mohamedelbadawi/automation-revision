import z from "zod";
export const UserTypeSchema = z.object({
    usertype: z.string(),
});

export const CategorySchema = z.object({
    usertype: UserTypeSchema,
    category: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;
