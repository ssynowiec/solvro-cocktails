import { ThemeToggle } from "@/components/theme-toggle";

export const Nav = () => {
  return (
    <nav className="h-12 sticky top-0 flex items-center gap-4 px-4 z-10 bg-background">
      <h1>Cocktails KN Solvro</h1>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
};