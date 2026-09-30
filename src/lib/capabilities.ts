export function supportsDesktopWebGL(minWidth = 768): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const preference = window.matchMedia("(min-width: " + minWidth + "px) and (prefers-reduced-motion: no-preference)");
  const device = navigator as Navigator & { deviceMemory?: number };
  const cpuIsCapable = navigator.hardwareConcurrency === undefined || navigator.hardwareConcurrency > 4;
  const memoryIsCapable = device.deviceMemory === undefined || device.deviceMemory > 4;
  return preference.matches && cpuIsCapable && memoryIsCapable && typeof window.WebGLRenderingContext !== "undefined";
}
