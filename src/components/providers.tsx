"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
