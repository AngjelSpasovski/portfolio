import type { Locale } from "@/i18n/types";

export type ProjectVisualId = "dbstore" | "opera-mes" | "dentcare";

export type ProjectVisual = {
  chromeLabel: string;
  logo: {
    src: `/${string}`;
    alt: string;
  };
  title: string;
  type: string;
  main: ProjectVisualImage;
  thumbnails: ProjectVisualImage[];
  tone: "blue" | "cyan";
};

export type ProjectVisualImage = {
  src: `/${string}`;
  alt: string;
  label: string;
  private?: boolean;
};

export function getProjectVisuals(locale: Locale): Record<ProjectVisualId, ProjectVisual> {
  return {
    dbstore: {
      chromeLabel: "dbstore.online",
      logo: {
        src: "/images/projects/dbstore/logo.png",
        alt: "DBStore logo",
      },
      title: "DB Store",
      type: locale === "mk" ? "Веб-продукт во живо" : "Live product website",
      main: {
        src: "/images/projects/dbstore/home.webp",
        alt: "DBStore home page preview",
        label: locale === "mk" ? "Преглед на почетна" : "Home page preview",
      },
      thumbnails: [
        {
          src: "/images/projects/dbstore/login.webp",
          alt: "DBStore login preview",
          label: locale === "mk" ? "Најава" : "Login flow",
        },
        {
          src: "/images/projects/dbstore/dashboard.webp",
          alt: "DBStore dashboard preview",
          label: locale === "mk" ? "Контролна табла" : "Dashboard",
        },
      ],
      tone: "blue",
    },
    "opera-mes": {
      chromeLabel: "Enterprise UI",
      logo: {
        src: "/images/projects/opera-mes/logo.png",
        alt: "Opera MES logo",
      },
      title: "Opera MES",
      type: locale === "mk" ? "Приватен enterprise производ" : "Private enterprise product",
      main: {
        src: "/images/projects/opera-mes/machines.webp",
        alt: "Opera MES machines interface preview",
        label: locale === "mk" ? "Куриран преглед" : "Curated product preview",
        private: true,
      },
      thumbnails: [
        {
          src: "/images/projects/opera-mes/charts.webp",
          alt: "Opera MES analytics preview",
          label: locale === "mk" ? "Аналитика" : "Analytics",
          private: true,
        },
        {
          src: "/images/projects/opera-mes/node-manager.webp",
          alt: "Opera MES configuration preview",
          label: locale === "mk" ? "Конфигурација" : "Configuration",
          private: true,
        },
      ],
      tone: "cyan",
    },
    dentcare: {
      chromeLabel: "dentcare-macedonia.web.app",
      logo: {
        src: "/images/projects/dentcare/logo.svg",
        alt: "DentCare Macedonia logo",
      },
      title: "DentCare Macedonia",
      type: locale === "mk" ? "Dental tourism website" : "Dental tourism website",
      main: {
        src: "/images/projects/dentcare/home.webp",
        alt:
          locale === "mk"
            ? "DentCare Macedonia home страница"
            : "DentCare Macedonia home page",
        label: locale === "mk" ? "Home preview" : "Home preview",
      },
      thumbnails: [
        {
          src: "/images/projects/dentcare/travel.webp",
          alt:
            locale === "mk"
              ? "DentCare Macedonia travel landmarks секција"
              : "DentCare Macedonia travel landmarks section",
          label: locale === "mk" ? "Travel guide" : "Travel guide",
        },
        {
          src: "/images/projects/dentcare/process.webp",
          alt:
            locale === "mk"
              ? "DentCare Macedonia treatment process секција"
              : "DentCare Macedonia treatment process section",
          label: locale === "mk" ? "Process flow" : "Process flow",
        },
      ],
      tone: "cyan",
    },
  };
}
