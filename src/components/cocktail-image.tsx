import { GlassWater, Heart, Wine } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorite } from "@/hooks/use-favorite";
import { cn } from "@/lib/utils";

interface CocktailImageProps {
  id: number;
  imageUrl: string;
  name: string;
  alcoholic: boolean;
}

export function CocktailImage({
  id,
  imageUrl,
  name,
  alcoholic,
}: CocktailImageProps) {
  const { favorites, toggleFavorite } = useFavorite();

  const isFavorite = favorites.includes(id);

  return (
    <div className="relative aspect-square overflow-hidden">
      <Image
        src={imageUrl}
        alt={name}
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
          toggleFavorite(id);
        }}
      >
        <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
        <span className="sr-only">
          {isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        </span>
      </Button>
      <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between">
        <Badge
          variant={alcoholic ? "default" : "secondary"}
          className="gap-1 text-xs"
        >
          {alcoholic ? (
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
  );
}
