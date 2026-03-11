"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      variant="ghost"
      size="icon"
    >
      {theme === "dark" && <Sun />}
      {theme === "light" && <Moon />}
    </Button>
  );
};
