"use client";

import * as React from "react";

import { assetPath } from "@/lib/asset-path";

export function LocaleRedirect() {
  const target = assetPath("/en/");

  React.useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 text-foreground">
      <p className="text-sm text-muted-foreground">
        Opening the English portfolio. <a className="font-semibold text-blue-600 underline" href={target}>Continue</a>
      </p>
    </main>
  );
}
