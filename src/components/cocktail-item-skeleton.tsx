import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CocktailItemSkeleton() {
  return (
    <Card className="border-border/50 bg-card overflow-hidden pt-0">
      <div className="relative aspect-square overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
        <div className="absolute bottom-3 left-3">
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <div className="absolute top-3 right-3">
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
      <CardContent className="p-4">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <div className="mb-3 flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  );
}
