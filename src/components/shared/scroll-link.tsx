"use client";

import * as React from "react";

type ScrollLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href: string;
};

export function ScrollLink({ href, onClick, type = "button", ...props }: ScrollLinkProps) {
  const scrollToSection = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const sectionId = href.replace("#", "");
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <button type={type} onClick={scrollToSection} {...props} />;
}
