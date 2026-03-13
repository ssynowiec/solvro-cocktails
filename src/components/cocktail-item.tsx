"use client";

import { GlassWater, Heart, Wine } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFavorite } from "@/hooks/use-favorite";
import { cn } from "@/lib/utils";
import type { Cocktail } from "@/types/cocktail";

interface CocktailItemProps extends Cocktail {}

export function CocktailItem({ ...cocktail }: CocktailItemProps) {
  const { favorites, toggleFavorite } = useFavorite();

  const isFavorite = favorites.includes(cocktail.id);

  return (
    <li>
      <Card className="group border-border/50 bg-card hover:border-border hover:bg-card/80 overflow-hidden pt-0 transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={cocktail.imageUrl}
            alt={cocktail.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="from-background/80 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "bg-background/80 hover:bg-background absolute top-3 right-3 h-9 w-9 rounded-full backdrop-blur-sm transition-all hover:scale-110",
              isFavorite && "text-red-500 hover:text-red-600",
            )}
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite(cocktail.id);
            }}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            <span className="sr-only">
              {isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
            </span>
          </Button>
          <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between">
            <Badge
              variant={cocktail.alcoholic ? "default" : "secondary"}
              className="gap-1 text-xs"
            >
              {cocktail.alcoholic ? (
                <>
                  <Wine className="h-3 w-3" />
                  Alcoholic
                </>
              ) : (
                <>
                  <GlassWater className="h-3 w-3" />
                  Non-alcoholic
                </>
              )}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-foreground mb-2 text-lg font-semibold text-balance">
            {cocktail.name}
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-muted-foreground text-xs">
              {cocktail.category}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground text-xs">
              {cocktail.glass}
            </Badge>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {cocktail.instructions}
          </p>
        </CardContent>
      </Card>
    </li>
  );
}
