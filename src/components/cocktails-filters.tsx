import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categories } from "@/constants/categories";
import { useFilters } from "@/hooks/use-filters";

export function CocktailsFilters() {
  const {
    search,
    handleSearchChange,
    alcoholic,
    setAlcoholic,
    categories: categoriesFilters,
    setCategories,
  } = useFilters();
  return (
    <aside className="flex w-full flex-col gap-4 lg:sticky lg:top-16 lg:h-fit lg:w-1/4 lg:min-w-[25vw]">
      <Input
        type="search"
        placeholder="Search..."
        defaultValue={search}
        onChange={handleSearchChange}
      />
      <div className="space-y-3">
        <h4 className="text-foreground text-sm font-medium">Cocktail type</h4>
        <RadioGroup
          value={alcoholic}
          onValueChange={async (value) =>
            setAlcoholic(
              value === "all" ? null : (value as "alcoholic" | "non-alcoholic"),
            )
          }
          className="w-fit space-y-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="all" id="all" />
            <Label
              htmlFor="all"
              className="text-muted-foreground cursor-pointer text-sm"
            >
              All
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="true" id="alcoholic" />
            <Label
              htmlFor="alcoholic"
              className="text-muted-foreground cursor-pointer text-sm"
            >
              Alcoholic
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="false" id="non-alcoholic" />
            <Label
              htmlFor="non-alcoholic"
              className="text-muted-foreground cursor-pointer text-sm"
            >
              Non-alcoholic
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-3">
        <h4 className="text-foreground text-sm font-medium">
          Cocktail category
        </h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={categoriesFilters.includes(category)}
                onCheckedChange={async (checked) => {
                  await setCategories((previous) => {
                    if (checked === true) {
                      return [...new Set([...previous, category])];
                    }
                    return previous.filter((c) => c !== category);
                  });
                }}
              />
              <Label
                htmlFor={category}
                className="text-muted-foreground cursor-pointer text-sm"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
