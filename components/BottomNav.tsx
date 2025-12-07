"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

const NAV_LINKS = [
  { href: "/" as Route, label: "Home", icon: "🏠" },
  { href: "/vocabulary" as Route, label: "Vocabulary", icon: "🧠" },
  { href: "/verbs" as Route, label: "Verbs", icon: "📝" },
  { href: "/progress" as Route, label: "Progress", icon: "📈" }
] satisfies Array<{ href: Route; label: string; icon: string }>;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-lg items-center justify-around rounded-3xl border border-white/80 bg-white/90 p-3 shadow-card backdrop-blur">
      {NAV_LINKS.map((link) => {
        const active =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition ${
              active
                ? "bg-primary-50 text-primary-600"
                : "text-slate-500 hover:text-primary-500"
            }`}
          >
            <span className="text-base">{link.icon}</span>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
