import { z } from "zod";

export const IngredientResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  alcohol: z.boolean(),
  type: z.string().nullable(),
  percentage: z.number().nullable(),
  imageUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  measure: z.string().nullable().optional(),
});

export type IngredientResponse = z.infer<typeof IngredientResponseSchema>;
export type Ingredient = Omit<IngredientResponse, "createdAt" | "updatedAt">;
