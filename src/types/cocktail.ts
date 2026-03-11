import { z } from "zod";

export const CocktailResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      instructions: z.string(),
      alcoholic: z.boolean(),
      category: z.string(),
      glass: z.string(),
      imageUrl: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
  meta: z.object({
    currentPage: z.number(),
    firstPage: z.number(),
    firstPageUrl: z.string(),
    lastPage: z.number(),
    lastPageUrl: z.string(),
    nextPageUrl: z.string().nullable(),
    perPage: z.number(),
    previousPageUrl: z.string().nullable(),
    total: z.number(),
  }),
});

export type CocktailResponse = z.infer<typeof CocktailResponseSchema>;
export type Cocktail = CocktailResponse["data"][number];
