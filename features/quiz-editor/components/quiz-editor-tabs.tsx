"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  {
    text: "Editor",
    route: "/edit",
  },
  {
    text: "Publish",
    route: "/publish",
  },
];

function QuizEditorTabs() {
  const [route, setRoute] = useState(items[0].route);

  return (
    <div className="grid grid-cols-2 gap-1 rounded-full bg-muted p-1">
      {items.map((item) => {
        const isActive = item.route === route;

        return (
          <Link
            key={item.route}
            href={item.route}
            className={`rounded-full py-1 px-3 text-center transition-all max-sm:text-xs ${
              isActive
                ? "bg-background shadow-sm dark:text-background dark:bg-foreground"
                : "text-muted-foreground hover:bg-background/50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setRoute(item.route);
            }}
          >
            {item.text}
          </Link>
        );
      })}
    </div>
  );
}

export default QuizEditorTabs;
