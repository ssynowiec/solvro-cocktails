"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react";

import { CocktailImage } from "@/components/cocktail-image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { env } from "@/env";
import { CocktailDetailsResponseSchema } from "@/types/cocktail";

interface CocktailDetailsProps {
  cocktailId: number;
}

export function CocktailDetails({ cocktailId }: CocktailDetailsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["cocktail", cocktailId],
    queryFn: async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/cocktails/${cocktailId.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cocktail details");
      }

      const parseResult = CocktailDetailsResponseSchema.safeParse(
        await response.json(),
      );

      if (!parseResult.success) {
        throw new Error(parseResult.error.message);
      }

      return parseResult.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data == null) {
    return <div>Cocktail not found.</div>;
  }

  const { data: cocktail } = data;

  return (
    <div className="flex flex-1 auto-rows-min flex-col gap-6 overflow-auto px-4">
      <CocktailImage
        id={cocktail.id}
        imageUrl={cocktail.imageUrl}
        name={cocktail.name}
        alcoholic={cocktail.alcoholic}
      />
      <p className="text-lg font-bold">Ingredients</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Name</TableHead>
            <TableHead className="text-center">Percentage</TableHead>
            <TableHead className="text-center">Alcohol</TableHead>
            <TableHead className="text-right">Measure</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cocktail.ingredients.map((ingredient) => (
            <TableRow key={ingredient.id}>
              <TableCell className="font-medium">{ingredient.name}</TableCell>
              <TableCell className="text-center">
                {ingredient.percentage}
              </TableCell>
              <TableCell className="text-center">
                {ingredient.alcohol ? <Check /> : <X />}
              </TableCell>
              <TableCell className="text-right">{ingredient.measure}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-lg font-bold">Instructions</p>
      <p>{cocktail.instructions}</p>
    </div>
  );
}
