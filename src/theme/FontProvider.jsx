import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FontCtx = createContext({
  fontKey: "sans",
  setFontKey: () => {},
  fontSizeKey: "normal",
  setFontSizeKey: () => {},
  densityKey: "cozy",
  setDensityKey: () => {},
  fontOptions: [],
  sizeOptions: [],
  densityOptions: [],
});

const FONT_MAP = {
  sans: 'var(--font-sans)',
  roboto: 'var(--font-roboto)',
  poppins: 'var(--font-poppins)',
  serif: 'var(--font-serif)',
  mono: 'var(--font-mono)',
};
const FONT_OPTIONS = [
  { key: "sans",    label: "Inter (Sans)" },
  { key: "roboto",  label: "Roboto (Sans)" },
  { key: "poppins", label: "Poppins (Sans)" },
  { key: "serif",   label: "Merriweather (Serif)" },
  { key: "mono",    label: "JetBrains Mono (Mono)" },
];

/** Tamaños (podés ajustar a gusto) */
const SIZE_MAP = {
  small: { size: "15px", line: 1.45 },
  normal:{ size: "16px", line: 1.55 },
  large: { size: "18px", line: 1.65 },
};
const SIZE_OPTIONS = [
  { key: "small",  label: "Pequeña" },
  { key: "normal", label: "Normal" },
  { key: "large",  label: "Grande" },
];

/** Densidad/espaciado general */
const DENSITY_MAP = {
  compact: { s1: "4px",  s2: "8px",  s3: "12px", btnPy: "6px"  },
  cozy:    { s1: "6px",  s2: "10px", s3: "16px", btnPy: "8px"  },
  roomy:   { s1: "8px",  s2: "14px", s3: "22px", btnPy: "10px" },
};
const DENSITY_OPTIONS = [
  { key: "compact", label: "Compacta" },
  { key: "cozy",    label: "Cómoda" },
  { key: "roomy",   label: "Amplia" },
];

function getInitial(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ?? fallback;
  } catch { return fallback; }
}

export function FontProvider({ children }) {
  const [fontKey, setFontKey] = useState(() => {
    const stored = getInitial("fontKey", null);
    if (stored && FONT_MAP[stored]) return stored;
    return "sans";
  });

  const [fontSizeKey, setFontSizeKey] = useState(() => {
    const stored = getInitial("fontSizeKey", null);
    return stored && SIZE_MAP[stored] ? stored : "normal";
  });

  const [densityKey, setDensityKey] = useState(() => {
    const stored = getInitial("densityKey", null);
    return stored && DENSITY_MAP[stored] ? stored : "cozy";
  });

  /** Aplica tipografía */
  useEffect(() => {
    const value = FONT_MAP[fontKey] ?? FONT_MAP.sans;
    document.documentElement.style.setProperty("--font", value);
    localStorage.setItem("fontKey", fontKey);
  }, [fontKey]);

  /** Aplica tamaño + interlineado */
  useEffect(() => {
    const { size, line } = SIZE_MAP[fontSizeKey] ?? SIZE_MAP.normal;
    document.documentElement.style.setProperty("--font-size", size);
    document.documentElement.style.setProperty("--line-height", String(line));
    localStorage.setItem("fontSizeKey", fontSizeKey);
  }, [fontSizeKey]);

  /** Aplica densidad/espaciado */
  useEffect(() => {
    const { s1, s2, s3, btnPy } = DENSITY_MAP[densityKey] ?? DENSITY_MAP.cozy;
    const root = document.documentElement.style;
    root.setProperty("--space-1", s1);
    root.setProperty("--space-2", s2);
    root.setProperty("--space-3", s3);
    root.setProperty("--btn-py", btnPy);
    localStorage.setItem("densityKey", densityKey);
  }, [densityKey]);

  const value = useMemo(() => ({
    fontKey, setFontKey,
    fontSizeKey, setFontSizeKey,
    densityKey, setDensityKey,
    fontOptions: FONT_OPTIONS,
    sizeOptions: SIZE_OPTIONS,
    densityOptions: DENSITY_OPTIONS,
  }), [fontKey, fontSizeKey, densityKey]);

  return <FontCtx.Provider value={value}>{children}</FontCtx.Provider>;
}

export const useFont = () => useContext(FontCtx);
