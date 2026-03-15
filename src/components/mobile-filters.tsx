"use client";

import { Funnel } from "lucide-react";

import { CocktailsFilters } from "@/components/cocktails-filters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileFilters() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button size="icon">
          <Funnel />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter or search cocktail</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <CocktailsFilters />
        </div>
      </SheetContent>
    </Sheet>
  );
}
