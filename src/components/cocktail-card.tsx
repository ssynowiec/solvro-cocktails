"use client";

import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { CocktailImage } from "@/components/cocktail-image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Cocktail } from "@/types/cocktail";

interface CocktailItemProps
  extends Cocktail, Omit<HTMLAttributes<HTMLLIElement>, keyof Cocktail> {}

// eslint-disable-next-line react/display-name
export const CocktailCard = forwardRef<HTMLLIElement, CocktailItemProps>(
  (
    {
      id,
      imageUrl,
      name,
      instructions,
      alcoholic,
      category,
      glass,
      updatedAt,
      createdAt,
      ...props
    },
    ref,
  ) => {
    return (
      <li ref={ref} {...props}>
        <Card className="group border-border/50 bg-card hover:border-border hover:bg-card/80 overflow-hidden pt-0 transition-all duration-300">
          <CocktailImage
            id={id}
            imageUrl={imageUrl}
            alcoholic={alcoholic}
            name={name}
          />
          <CardContent className="p-4">
            <h3 className="text-foreground mb-2 text-lg font-semibold text-balance">
              {name}
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="text-muted-foreground text-xs"
              >
                {category}
              </Badge>
              <Badge
                variant="outline"
                className="text-muted-foreground text-xs"
              >
                {glass}
              </Badge>
            </div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
              {instructions}
            </p>
          </CardContent>
        </Card>
      </li>
    );
  },
);
