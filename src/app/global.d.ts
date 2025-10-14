export {};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
    gtag: (
      command: "config" | "event",
      targetId: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

declare module "*.css";
