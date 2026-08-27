"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  { text: "Editor", route: "/edit" },
  { text: "Publish", route: "/publish" },
];

export default function QuizTabs() {
  const [activeRoute, setActiveRoute] = useState(items[0].route);
  const activeIndex = items.findIndex((item) => item.route === activeRoute);

  return (
    <div className="relative inline-grid grid-cols-2 rounded-full bg-muted p-1 text-xs font-medium sm:text-sm">
      {/* Sliding Background Indicator */}
      <span
        className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-background shadow-xs dark:bg-foreground transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {items.map((item) => {
        const isActive = item.route === activeRoute;

        return (
          <Link
            key={item.route}
            href={item.route}
            onClick={(e) => {
              e.preventDefault();
              setActiveRoute(item.route);
            }}
            className={`relative z-10 px-4 py-1.5 text-center transition-colors duration-100 ${
              isActive
                ? "text-foreground dark:text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.text}
          </Link>
        );
      })}
    </div>
  );
}
