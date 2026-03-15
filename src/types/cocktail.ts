import { z } from "zod";

import { IngredientResponseSchema } from "@/types/ingredient";

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

export const CocktailDetailsResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
    glass: z.string(),
    instructions: z.string(),
    imageUrl: z.string(),
    alcoholic: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    ingredients: z.array(IngredientResponseSchema),
  }),
});

export type CocktailResponse = z.infer<typeof CocktailResponseSchema>;
export type Cocktail = CocktailResponse["data"][number];
