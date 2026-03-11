"use client";

import { Cocktail } from "@/types/cocktail";
import Image from "next/image";
import { Heart, Wine, WineOff } from "lucide-react";
import { useFavorite } from "@/hooks/useFavorite";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CocktailItemProps extends Cocktail {}

export const CocktailItem = ({ ...cocktail }: CocktailItemProps) => {
  const { favorites, toggleFavorite } = useFavorite();

  const isFavorite = favorites.includes(cocktail.id);

  return (
    <li className="flex gap-4 p-4 items-center">
      <div className="relative">
        <Image
          src={cocktail.imageUrl}
          alt={cocktail.name}
          width={100}
          height={100}
          className="rounded-lg"
          loading="eager"
        />
        <Button
          onClick={() => toggleFavorite(cocktail.id)}
          aria-label="Toggle bookmark"
          size="icon"
          variant="ghost"
          className="absolute top-1 left-1"
        >
          <Heart className={cn(isFavorite ? "fill-foreground" : "")} />
        </Button>
      </div>
      <h2>{cocktail.name}</h2>
      {cocktail.alcoholic ? <Wine /> : <WineOff />}
    </li>
  );
};
