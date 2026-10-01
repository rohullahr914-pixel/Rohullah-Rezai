"use client";

import { useEffect, useSyncExternalStore } from "react";

const storageKey = "rohullah-portfolio-theme";
const eventName = "portfolio-theme-change";

const themes = [
  { id: "obsidian", name: "Obsidian" },
  { id: "aurora", name: "Aurora" },
  { id: "porcelain", name: "Porcelain" },
] as const;

type Theme = (typeof themes)[number]["id"];

const themeColors: Record<Theme, string> = {
  obsidian: "#080b0d",
  aurora: "#08091a",
  porcelain: "#f2eee6",
};

function isTheme(value: string | null | undefined): value is Theme {
  return themes.some((theme) => theme.id === value);
}

function getStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return isTheme(stored) ? stored : "obsidian";
  } catch {
    return "obsidian";
  }
}

function getSnapshot(): Theme {
  const theme = document.documentElement.dataset.theme;
  return isTheme(theme) ? theme : getStoredTheme();
}

function getServerSnapshot(): Theme {
  return "obsidian";
}

function subscribe(onChange: () => void) {
  window.addEventListener(eventName, onChange);
  return () => window.removeEventListener(eventName, onChange);
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", themeColors[theme]);
  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // The selected theme still applies for this page even when storage is unavailable.
  }
  window.dispatchEvent(new Event(eventName));
}

export function ThemePicker() {
  const activeTheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return (
    <div className="theme-picker" role="group" aria-label="Choose color theme">
      {themes.map((theme) => (
        <button
          className={"theme-option theme-option-" + theme.id}
          key={theme.id}
          type="button"
          title={theme.name}
          aria-label={"Use " + theme.name + " theme"}
          aria-pressed={activeTheme === theme.id}
          onClick={() => applyTheme(theme.id)}
        >
          <span className="theme-swatch" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
