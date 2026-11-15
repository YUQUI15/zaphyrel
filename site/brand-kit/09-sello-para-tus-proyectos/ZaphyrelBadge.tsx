"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";

export interface ZaphyrelBadgeProps {
  prefix?: string;
  brand?: string;
  href?: string;
  subtitle?: string;
  theme?: "auto" | "dark" | "light";
  variant?: "glass" | "minimal" | "editorial";
}

const EMBLEM_URI = "data:image/webp;base64,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";

function resolveTheme(forced?: "auto" | "dark" | "light"): "dark" | "light" {
  if (forced === "dark" || forced === "light") return forced;
  if (typeof document === "undefined") return "dark";
  const nodes = [document.documentElement, document.body].filter(Boolean);
  for (const el of nodes) {
    const dt = (
      el.getAttribute("data-theme") ||
      el.getAttribute("data-bs-theme") ||
      el.getAttribute("data-color-scheme") ||
      ""
    ).toLowerCase();
    if (/^(dark|night|oscuro)$/.test(dt)) return "dark";
    if (/^(light|day|claro)$/.test(dt)) return "light";
    if (el.classList.contains("dark") || el.classList.contains("night")) return "dark";
    if (el.classList.contains("light") || el.classList.contains("day")) return "light";
  }
  return typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ZaphyrelBadge({
  prefix = "by",
  brand = "ZAPHYREL",
  href = "https://zaphyrel-site.vercel.app",
  subtitle = "Ecosistemas Digitales · Software a Medida",
  theme = "auto",
  variant = "glass",
}: ZaphyrelBadgeProps) {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [bottomPx, setBottomPx] = useState<number>(14);
  const [leftPx, setLeftPx] = useState<number>(14);

  useEffect(() => {
    const sync = () => {
      setMode(resolveTheme(theme));
      const mobile = window.innerWidth <= 560;
      let b = mobile ? 10 : 14;
      let l = mobile ? 10 : 14;
      const navs = document.querySelectorAll(
        'nav, .nav, [role="navigation"], [data-mobile-nav], .mobile-nav, .bottom-nav, .md\\:hidden.fixed'
      );
      navs.forEach((el) => {
        const st = getComputedStyle(el);
        if (st.position !== "fixed" || st.display === "none") return;
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) return;
        if (
          r.bottom >= window.innerHeight - 30 &&
          r.height >= 32 &&
          r.height <= 120 &&
          r.left <= 185 &&
          r.right >= 80
        ) {
          b = Math.max(b, Math.round(window.innerHeight - r.top + 10));
        }
      });
      setBottomPx(b);
      setLeftPx(l);
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", sync);
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      obs.disconnect();
      mq.removeEventListener?.("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, [theme]);

  const isLight = mode === "light";
  const rounded = variant === "editorial" ? "rounded-[9px]" : "rounded-full";

  return (
    <div
      style={{ bottom: `max(${bottomPx}px, env(safe-area-inset-bottom, 0px))`, left: `${leftPx}px` }}
      className="fixed z-[2147482000] pointer-events-none print:hidden"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={`${brand} · ${subtitle}`}
        aria-label={`${prefix} ${brand} — Visitar sitio oficial`}
        className={[
          "group relative pointer-events-auto inline-flex items-center gap-[6px] sm:gap-[7px]",
          variant === "minimal" ? "h-[26px] px-[9px] pl-[3.5px]" : "h-[25px] sm:h-[29px] px-[9px] sm:px-[11px] pl-[3px] sm:pl-[4px]",
          rounded,
          "border backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 select-none",
          isLight
            ? "bg-white/88 hover:bg-white border-slate-900/15 hover:border-sky-500/45 text-[#090E1C] shadow-[0_6px_20px_-6px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.95)]"
            : "bg-[#090D19]/82 hover:bg-[#0C1222]/95 border-sky-200/20 hover:border-sky-300/55 text-[#F8FAFF] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.14)]",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none hidden sm:flex flex-col gap-0.5 absolute left-0 bottom-[calc(100%+8px)] px-2.5 py-1.5 rounded-[10px] border backdrop-blur-xl whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200",
            isLight
              ? "bg-white/95 border-slate-900/12 text-[#090E1C] shadow-lg"
              : "bg-[#080C17]/95 border-sky-300/25 text-[#F8FAFF] shadow-2xl",
          ].join(" ")}
        >
          <span className="text-[10.5px] font-semibold tracking-wide">{brand} · {subtitle}</span>
          <span className={`text-[9px] font-medium ${isLight ? "text-slate-600" : "text-slate-400"}`}>zaphyrel-site.vercel.app ↗</span>
        </span>
        <span
          aria-hidden="true"
          className={[
            "grid place-items-center shrink-0 w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]",
            variant === "editorial" ? "rounded-[6px]" : "rounded-full",
            "bg-[radial-gradient(circle_at_32%_26%,#162344_0%,#060A16_100%)]",
            "ring-1 ring-sky-300/40 group-hover:ring-sky-300/75 transition-transform duration-300 group-hover:scale-105",
          ].join(" ")}
        >
          <img
            src={EMBLEM_URI}
            alt={brand}
            className="w-[14px] h-[14px] sm:w-[17px] sm:h-[17px] object-contain"
            decoding="async"
          />
        </span>
        <span className="inline-flex items-baseline gap-[4px] leading-none whitespace-nowrap">
          <span
            className={[
              "text-[7.8px] sm:text-[8.5px] font-medium uppercase tracking-[0.11em]",
              isLight ? "text-slate-600" : "text-slate-300/80",
            ].join(" ")}
          >
            {prefix}
          </span>
          <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.15em]">
            {brand}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="w-[3.5px] h-[3.5px] sm:w-[4px] sm:h-[4px] rounded-full bg-gradient-to-br from-[#5EB8FF] via-[#D5BEFF] to-[#FF9AFF] shadow-[0_0_6px_rgba(94,184,255,0.75)] opacity-85 group-hover:opacity-100 group-hover:scale-125 transition-transform"
        />
      </a>
    </div>
  );
}

export default ZaphyrelBadge;
