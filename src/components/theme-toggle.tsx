"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => {
        setTheme((previous) => (previous === "light" ? "dark" : "light"));
      }}
      variant="ghost"
      size="icon"
    >
      {theme === "dark" && <Sun />}
      {theme === "light" && <Moon />}
    </Button>
  );
}
