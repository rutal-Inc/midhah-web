"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme switching plumbing for the design system's semantic tokens
 * (see app/theme.generated.css). Dark mode stays unreachable until the
 * toggle ships in Settings — defaultTheme is forced to light.
 */
export default function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
