import { CocktailCard } from "@/components/cocktail-card";
import { CocktailDetails } from "@/components/cocktail-details";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Cocktail } from "@/types/cocktail";

interface CocktailItemProps extends Cocktail {}

export function CocktailItem({ ...cocktail }: CocktailItemProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CocktailCard {...cocktail} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{cocktail.name}</SheetTitle>
          <SheetDescription>Details about cocktail.</SheetDescription>
        </SheetHeader>
        <CocktailDetails cocktailId={cocktail.id} />
      </SheetContent>
    </Sheet>
  );
}
