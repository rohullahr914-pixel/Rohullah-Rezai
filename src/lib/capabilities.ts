import { useCallback, useSyncExternalStore } from "react";

function desktopWebGLQuery(minWidth: number): string {
  return "(min-width: " + minWidth + "px) and (prefers-reduced-motion: no-preference)";
}

export function supportsDesktopWebGL(minWidth = 768): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const preference = window.matchMedia(desktopWebGLQuery(minWidth));
  const device = navigator as Navigator & { deviceMemory?: number };
  const cpuIsCapable = navigator.hardwareConcurrency === undefined || navigator.hardwareConcurrency > 4;
  const memoryIsCapable = device.deviceMemory === undefined || device.deviceMemory > 4;
  return preference.matches && cpuIsCapable && memoryIsCapable && typeof window.WebGLRenderingContext !== "undefined";
}

const getServerSnapshot = () => false;

export function useSupportsDesktopWebGL(minWidth = 768): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    if (typeof window === "undefined") return () => {};

    const preference = window.matchMedia(desktopWebGLQuery(minWidth));
    preference.addEventListener("change", onChange);
    return () => preference.removeEventListener("change", onChange);
  }, [minWidth]);

  const getSnapshot = useCallback(() => supportsDesktopWebGL(minWidth), [minWidth]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
