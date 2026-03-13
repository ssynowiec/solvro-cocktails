"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

const useIsMounted = () => {
  return useSyncExternalStore(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    () => () => {
      /* empty */
    },
    () => true,
    () => false,
  );
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const mounted = useIsMounted();

  return (
    <Button
      onClick={() => {
        setTheme((previous) => (previous === "light" ? "dark" : "light"));
      }}
      variant="ghost"
      size="icon"
    >
      {mounted && theme === "dark" ? <Sun /> : null}
      {mounted && theme === "light" ? <Moon /> : null}
    </Button>
  );
}
