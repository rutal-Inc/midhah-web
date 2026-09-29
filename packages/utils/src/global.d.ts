export {};

declare global {
  interface GptSlotRenderEndedEvent {
    slot: GptSlot;
    isEmpty: boolean;
  }

  interface GptPubAdsService {
    refresh(slots?: GptSlot[] | null): void;
    addEventListener(
      eventType: "slotRenderEnded",
      listener: (event: GptSlotRenderEndedEvent) => void,
    ): GptPubAdsService;
    removeEventListener(
      eventType: "slotRenderEnded",
      listener: (event: GptSlotRenderEndedEvent) => void,
    ): boolean;
  }

  interface GptSlot {
    addService(service: GptPubAdsService): GptSlot;
    setConfig(config: { targeting?: Record<string, string | string[]> }): void;
  }

  interface Googletag {
    cmd: Array<() => void>;
    defineSlot(
      adUnitPath: string,
      size: Array<[number, number]>,
      divId: string,
    ): GptSlot | null;
    pubads(): GptPubAdsService;
    setConfig(config: {
      singleRequest?: boolean;
      collapseDiv?: "DISABLED" | "BEFORE_FETCH" | "ON_NO_FILL";
    }): void;
    enableServices(): void;
    display(divId: string): void;
    destroySlots(slots?: GptSlot[]): boolean;
  }

  interface Window {
    adsbygoogle?: unknown[];
    googletag?: Googletag;
    gtag?: (
      command: "config" | "event",
      targetId: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}
