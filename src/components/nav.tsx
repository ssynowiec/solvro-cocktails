import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  return (
    <nav className="bg-background sticky top-0 z-10 flex h-12 items-center gap-4 px-4">
      <h1>Cocktails KN Solvro</h1>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}
