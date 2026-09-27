import type { Locale } from "@/i18n/types";
import type { ProjectVisualId } from "@/data/portfolio-data";

export type { ProjectVisualId } from "@/data/portfolio-data";

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
        alt: locale === "mk" ? "Лого на DBStore" : "DBStore logo",
      },
      title: "DB Store",
      type: locale === "mk" ? "Веб-продукт во живо" : "Live product website",
      main: {
        src: "/images/projects/dbstore/home.webp",
        alt: locale === "mk" ? "Преглед на почетната страница на DBStore" : "DBStore home page preview",
        label: locale === "mk" ? "Преглед на почетна" : "Home page preview",
      },
      thumbnails: [
        {
          src: "/images/projects/dbstore/login.webp",
          alt: locale === "mk" ? "Преглед на најавата во DBStore" : "DBStore login preview",
          label: locale === "mk" ? "Најава" : "Login flow",
        },
        {
          src: "/images/projects/dbstore/dashboard.webp",
          alt: locale === "mk" ? "Преглед на контролната табла на DBStore" : "DBStore dashboard preview",
          label: locale === "mk" ? "Контролна табла" : "Dashboard",
        },
      ],
      tone: "blue",
    },
    "opera-mes": {
      chromeLabel: "Enterprise UI",
      logo: {
        src: "/images/projects/opera-mes/logo.png",
        alt: locale === "mk" ? "Лого на Opera MES" : "Opera MES logo",
      },
      title: "Opera MES",
      type: locale === "mk" ? "Приватен enterprise производ" : "Private enterprise product",
      main: {
        src: "/images/projects/opera-mes/machines.webp",
        alt: locale === "mk" ? "Преглед на интерфејсот за машини во Opera MES" : "Opera MES machines interface preview",
        label: locale === "mk" ? "Куриран преглед" : "Curated product preview",
        private: true,
      },
      thumbnails: [
        {
          src: "/images/projects/opera-mes/charts.webp",
          alt: locale === "mk" ? "Преглед на аналитиката во Opera MES" : "Opera MES analytics preview",
          label: locale === "mk" ? "Аналитика" : "Analytics",
          private: true,
        },
        {
          src: "/images/projects/opera-mes/node-manager.webp",
          alt: locale === "mk" ? "Преглед на конфигурацијата во Opera MES" : "Opera MES configuration preview",
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
        alt: locale === "mk" ? "Лого на DentCare Macedonia" : "DentCare Macedonia logo",
      },
      title: "DentCare Macedonia",
      type: locale === "mk" ? "Веб-страница за дентален туризам" : "Dental tourism website",
      main: {
        src: "/images/projects/dentcare/home.webp",
        alt:
          locale === "mk"
            ? "Почетна страница на DentCare Macedonia"
            : "DentCare Macedonia home page",
        label: locale === "mk" ? "Почетна страница" : "Home preview",
      },
      thumbnails: [
        {
          src: "/images/projects/dentcare/travel.webp",
          alt:
            locale === "mk"
              ? "Секција со туристички локации на DentCare Macedonia"
              : "DentCare Macedonia travel landmarks section",
          label: locale === "mk" ? "Водич за патување" : "Travel guide",
        },
        {
          src: "/images/projects/dentcare/process.webp",
          alt:
            locale === "mk"
              ? "Секција со процесот на третман на DentCare Macedonia"
              : "DentCare Macedonia treatment process section",
          label: locale === "mk" ? "Процес на третман" : "Process flow",
        },
      ],
      tone: "cyan",
    },
  };
}
