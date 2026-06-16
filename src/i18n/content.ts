import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Languages,
  MapPin,
  Network,
  Sparkles,
  Wrench,
} from "lucide-react";

import { siteConfig } from "@/config/site";

export type Locale = "en" | "mk";

export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  tags: string[];
};

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export type ProjectItem = {
  title: string;
  type: string;
  period: string;
  company: string;
  description: string;
  stack: string[];
  href?: string;
  visualId?: "dbstore" | "opera-mes";
};

export type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
};

export type SiteContent = {
  locale: Locale;
  langLabel: string;
  switchLabel: string;
  nav: NavItem[];
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
  hero: {
    badge: string;
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    cvCta: string;
    stats: { value: string; label: string }[];
  };
  about: {
    tag: string;
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string; icon: LucideIcon }[];
  };
  experience: {
    tag: string;
    title: string;
    subtitle: string;
    items: ExperienceItem[];
  };
  skills: {
    tag: string;
    title: string;
    subtitle: string;
    groups: SkillGroup[];
  };
  projects: {
    tag: string;
    title: string;
    subtitle: string;
    items: ProjectItem[];
    note: string;
  };
  certifications: {
    tag: string;
    title: string;
    subtitle: string;
    items: CertificationItem[];
  };
  contact: {
    tag: string;
    title: string;
    text: string;
    emailLabel: string;
    githubLabel: string;
    linkedinLabel: string;
  };
  footer: string;
};

const sharedSocial = {
  github: siteConfig.links.github,
  linkedin: siteConfig.links.linkedin,
  email: `mailto:${siteConfig.emailAddress}`,
};

export const content: Record<Locale, SiteContent> = {
  en: {
    locale: "en",
    langLabel: "EN",
    switchLabel: "MK",
    social: sharedSocial,
    nav: [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      badge: "Software Engineer",
      eyebrow: "Frontend engineering for practical enterprise products",
      title: "Angjel",
      highlight: "Spasovski",
      description:
        "Software Engineer with 10+ years of experience in web application development, frontend engineering, enterprise software products, and reliable user interfaces for complex business workflows.",
      primaryCta: "View work",
      secondaryCta: "Get in touch",
      cvCta: "Download CV",
      stats: [
        { value: "10+", label: "Years experience" },
        { value: "6", label: "Companies" },
        { value: "12", label: "Certificates" },
        { value: "MK", label: "Based in" },
      ],
    },
    about: {
      tag: "01 / About",
      title: "Reliable frontend work for complex products.",
      paragraphs: [
        "My recent work has focused on Opera MES, a Manufacturing Execution System for manufacturing operations, where I contribute to frontend development, software design, product maintenance, and improvements to complex production workflows.",
        "I have also worked on products such as ArkCase and Move One, with experience in JavaScript-based interfaces, CSS, forms, modals, UI maintenance, bug fixing, and long-running enterprise applications.",
        "Earlier in my career I gained experience in IT administration, scripting, network maintenance, and web platform support, which gives me a broader view when building practical software.",
      ],
      facts: [
        { label: "Current role", value: "Software Engineer @ CYBERTEC", icon: BriefcaseBusiness },
        { label: "Location", value: "Skopje, Macedonia", icon: MapPin },
        { label: "Education", value: "BSc Computer Science, UKIM", icon: GraduationCap },
        { label: "Languages", value: "English, Macedonian", icon: Languages },
      ],
    },
    experience: {
      tag: "02 / Experience",
      title: "Work history",
      subtitle:
        "A decade-long path across software engineering, frontend development, IT administration, and design.",
      items: [
        {
          role: "Software Engineer",
          company: "CYBERTEC",
          period: "Jun 2024 - Present",
          location: "Hybrid",
          summary:
            "Continuing development of Opera MES after OPEN DATA was acquired by CYBERTEC, with broader engineering focus across frontend development, software design, system improvements, product maintenance, usability, performance, and reliability.",
          tags: ["Opera MES", "Software Design", "Frontend", "Maintainability", "Enterprise Product"],
        },
        {
          role: "Frontend Developer",
          company: "OPEN DATA Srl",
          period: "Jun 2018 - Jun 2024",
          location: "Skopje, Macedonia",
          summary:
            "Worked on Opera MES, building and maintaining web-based user interfaces for complex production workflows, with emphasis on usability, reliability, and long-term maintainability.",
          tags: ["JavaScript", "HTML5", "CSS", "Production Workflows", "Reusable UI"],
        },
        {
          role: "IT Administrator",
          company: "Winner - Vienna Insurance Group",
          period: "Mar 2017 - Jun 2018",
          location: "Macedonia",
          summary:
            "Maintained internal IT infrastructure, network reliability, data collection scripts, web platform operations, and day-to-day technical support for users.",
          tags: ["Networking", "IT Support", "Scripting", "Web Platform"],
        },
        {
          role: "Frontend Developer",
          company: "Armedia",
          period: "Jul 2016 - Mar 2017",
          location: "Macedonia",
          summary:
            "Worked on ArkCase, focusing on frontend maintenance, bug fixing, CSS issues, modals, forms, layout consistency, usability, and application stability.",
          tags: ["ArkCase", "JavaScript", "AngularJS", "Forms", "CSS"],
        },
        {
          role: "Frontend Developer",
          company: "Vorteks ED",
          period: "May 2015 - Apr 2016",
          location: "Skopje",
          summary:
            "Worked on Move One, a transport and relocation management product, contributing to frontend UI development and maintenance with Stylus, jQuery, and Backbone.js.",
          tags: ["Move One", "JavaScript", "CSS", "Stylus", "Backbone.js"],
        },
      ],
    },
    skills: {
      tag: "03 / Skills",
      title: "Technical stack",
      subtitle:
        "Core technologies, product areas, and tools from long-running enterprise web applications.",
      groups: [
        { title: "Languages & Core", icon: Code2, items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "SASS / SCSS", "Web Design"] },
        { title: "Frontend", icon: Sparkles, items: ["AngularJS", "Angular 2+", "Bootstrap", "Responsive Design", "Forms & Modals"] },
        { title: "Data & APIs", icon: Database, items: ["REST APIs", "JSON / XML", "Oracle SQL", "D3.js", "Plotly", "DevExpress"] },
        { title: "Engineering", icon: Cpu, items: ["Software Design", "Maintainability", "Debugging", "Product Maintenance", "Performance"] },
        { title: "Tools", icon: Wrench, items: ["Git / GitHub", "npm", "Webpack", "CLI", "Figma"] },
        { title: "Systems", icon: Network, items: ["IT Administration", "Scripting", "Network Maintenance", "Windows Server", "CCNA Foundations"] },
      ],
    },
    projects: {
      tag: "04 / Projects",
      title: "Selected work",
      subtitle:
        "Public and private product work. Private enterprise products are described without repository links.",
      note: "The project structure is ready for more live projects when you decide to add them.",
      items: [
        {
          title: "DB Store",
          type: "Live project",
          period: "2026",
          company: "Personal / Product",
          description:
            "A live web project used as a public example of frontend delivery, product presentation, and practical implementation quality.",
          stack: ["Frontend", "Responsive UI", "Product Website"],
          href: "https://dbstore.online",
          visualId: "dbstore",
        },
        {
          title: "Opera MES",
          type: "Enterprise product",
          period: "2018 - Present",
          company: "OPEN DATA / CYBERTEC",
          description:
            "Manufacturing Execution System used to support and optimize production processes through reliable frontend workflows and long-term product maintenance.",
          stack: ["JavaScript", "Enterprise UI", "REST API", "Manufacturing Workflows"],
          visualId: "opera-mes",
        },
      ],
    },
    certifications: {
      tag: "05 / Credentials",
      title: "Certifications",
      subtitle: "Selected certifications from frontend development, AI tooling, and networking foundations.",
      items: [
        { title: "ChatGPT & Generative AI - The Complete Guide", issuer: "Udemy", date: "Issued Nov 2024" },
        { title: "Angular Front To Back", issuer: "Udemy", date: "Issued Sep 2022" },
        { title: "JavaScript: Understanding the Weird Parts", issuer: "Udemy", date: "Issued Aug 2017" },
        { title: "CCNA: Network Fundamentals", issuer: "Cisco", date: "Issued Nov 2011" },
      ],
    },
    contact: {
      tag: "06 / Contact",
      title: "Let us talk about practical software.",
      text: "Open to meaningful software engineering conversations, frontend work, enterprise product improvements, and practical web application projects.",
      emailLabel: "Email",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
    },
    footer: "Software Engineer based in Skopje, Macedonia.",
  },

  mk: {
    locale: "mk",
    langLabel: "MK",
    switchLabel: "EN",
    social: sharedSocial,
    nav: [
      { label: "За мене", href: "#za-mene" },
      { label: "Искуство", href: "#iskustvo" },
      { label: "Вештини", href: "#veshtini" },
      { label: "Проекти", href: "#proekti" },
      { label: "Контакт", href: "#kontakt" },
    ],
    hero: {
      badge: "Софтверски инженер",
      eyebrow: "Frontend инженеринг за практични деловни производи",
      title: "Анѓел",
      highlight: "Спасовски",
      description:
        "Софтверски инженер со 10+ години искуство во развој на веб апликации, frontend инженеринг, enterprise софтверски производи и сигурни кориснички интерфејси за комплексни деловни процеси.",
      primaryCta: "Види проекти",
      secondaryCta: "Контакт",
      cvCta: "Преземи CV",
      stats: [
        { value: "10+", label: "Години искуство" },
        { value: "6", label: "Компании" },
        { value: "12", label: "Сертификати" },
        { value: "MK", label: "Локација" },
      ],
    },
    about: {
      tag: "01 / За мене",
      title: "Сигурен frontend за комплексни деловни производи.",
      paragraphs: [
        "Мојата понова работа е фокусирана на Opera MES, Manufacturing Execution System за производствени операции. Таму придонесувам во frontend development, software design, product maintenance и подобрување на комплексни производствени процеси.",
        "Имам работено и на производи како ArkCase и Move One, со искуство во JavaScript интерфејси, CSS, форми, модали, UI одржување, bug fixing и долгорочни enterprise апликации.",
        "Претходно стекнав искуство и во IT администрација, scripting, network maintenance и web platform support, што ми помага пошироко да размислувам кога градам практични software решенија.",
      ],
      facts: [
        { label: "Моментална улога", value: "Software Engineer @ CYBERTEC", icon: BriefcaseBusiness },
        { label: "Локација", value: "Скопје, Македонија", icon: MapPin },
        { label: "Образование", value: "BSc Computer Science, УКИМ", icon: GraduationCap },
        { label: "Јазици", value: "Англиски, Македонски", icon: Languages },
      ],
    },
    experience: {
      tag: "02 / Искуство",
      title: "Работно искуство",
      subtitle:
        "Пат низ software engineering, frontend development, IT администрација и дизајн.",
      items: [
        {
          role: "Software Engineer",
          company: "CYBERTEC",
          period: "Јун 2024 - Сега",
          location: "Hybrid",
          summary:
            "Продолжување на развојот на Opera MES по аквизицијата на OPEN DATA од CYBERTEC, со поширок engineering фокус на frontend development, software design, системски подобрувања, product maintenance, употребливост, перформанси и стабилност.",
          tags: ["Opera MES", "Software Design", "Frontend", "Maintainability", "Enterprise Product"],
        },
        {
          role: "Frontend Developer",
          company: "OPEN DATA Srl",
          period: "Јун 2018 - Јун 2024",
          location: "Скопје, Македонија",
          summary:
            "Работа на Opera MES, градење и одржување web-based UI за комплексни производствени процеси, со фокус на употребливост, стабилност и долгорочна maintainability.",
          tags: ["JavaScript", "HTML5", "CSS", "Production Workflows", "Reusable UI"],
        },
        {
          role: "IT Administrator",
          company: "Winner - Vienna Insurance Group",
          period: "Март 2017 - Јун 2018",
          location: "Македонија",
          summary:
            "Одржување IT инфраструктура, network reliability, scripts за собирање податоци, web platform operations и секојдневна техничка поддршка.",
          tags: ["Networking", "IT Support", "Scripting", "Web Platform"],
        },
        {
          role: "Frontend Developer",
          company: "Armedia",
          period: "Јули 2016 - Март 2017",
          location: "Македонија",
          summary:
            "Работа на ArkCase, со фокус на frontend maintenance, bug fixing, CSS issues, модали, форми, layout consistency, употребливост и стабилност на апликацијата.",
          tags: ["ArkCase", "JavaScript", "AngularJS", "Forms", "CSS"],
        },
        {
          role: "Frontend Developer",
          company: "Vorteks ED",
          period: "Мај 2015 - Април 2016",
          location: "Скопје",
          summary:
            "Работа на Move One, transport and relocation management product, со frontend UI development и maintenance со Stylus, jQuery и Backbone.js.",
          tags: ["Move One", "JavaScript", "CSS", "Stylus", "Backbone.js"],
        },
      ],
    },
    skills: {
      tag: "03 / Вештини",
      title: "Технички стек",
      subtitle:
        "Технологии, product области и алатки од долгорочни enterprise web апликации.",
      groups: [
        { title: "Јазици и основа", icon: Code2, items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "SASS / SCSS", "Web Design"] },
        { title: "Frontend", icon: Sparkles, items: ["AngularJS", "Angular 2+", "Bootstrap", "Responsive UI", "Форми и модали"] },
        { title: "Податоци и APIs", icon: Database, items: ["REST APIs", "JSON / XML", "Oracle SQL", "D3.js", "Plotly", "DevExpress"] },
        { title: "Engineering", icon: Cpu, items: ["Software Design", "Maintainability", "Debugging", "Product Maintenance", "Performance"] },
        { title: "Алатки", icon: Wrench, items: ["Git / GitHub", "npm", "Webpack", "CLI", "Figma"] },
        { title: "Системи", icon: Network, items: ["IT Administration", "Scripting", "Network Maintenance", "Windows Server", "CCNA Foundations"] },
      ],
    },
    projects: {
      tag: "04 / Проекти",
      title: "Избрана работа",
      subtitle:
        "Јавни и приватни примери од мојата работа на производи. Приватните enterprise производи се опишани без repository линкови.",
      note: "Структурата е подготвена за додавање нови live проекти кога ќе одлучиме да ја прошириме.",
      items: [
        {
          title: "DB Store",
          type: "Live проект",
          period: "2026",
          company: "Личен проект",
          description:
            "Live web project како јавен пример за frontend delivery, product presentation и практичен квалитет на имплементација.",
          stack: ["Frontend", "Responsive UI", "Product Website"],
          href: "https://dbstore.online",
          visualId: "dbstore",
        },
        {
          title: "Opera MES",
          type: "Enterprise производ",
          period: "2018 - Сега",
          company: "OPEN DATA / CYBERTEC",
          description:
            "Manufacturing Execution System за поддршка и оптимизација на производствени процеси преку сигурни frontend workflows и долгорочен product maintenance.",
          stack: ["JavaScript", "Enterprise UI", "REST API", "Manufacturing Workflows"],
          visualId: "opera-mes",
        },
      ],
    },
    certifications: {
      tag: "05 / Сертификати",
      title: "Сертификати",
      subtitle: "Избрани сертификати од frontend development, AI tooling и основи на networking.",
      items: [
        { title: "ChatGPT & Generative AI - The Complete Guide", issuer: "Udemy", date: "Издаден ноември 2024" },
        { title: "Angular Front To Back", issuer: "Udemy", date: "Издаден септември 2022" },
        { title: "JavaScript: Understanding the Weird Parts", issuer: "Udemy", date: "Издаден август 2017" },
        { title: "CCNA: Network Fundamentals", issuer: "Cisco", date: "Издаден ноември 2011" },
      ],
    },
    contact: {
      tag: "06 / Контакт",
      title: "Да зборуваме за практичен софтвер.",
      text: "Отворен сум за квалитетни software engineering разговори, frontend работа, подобрувања на enterprise производи и практични web application проекти.",
      emailLabel: "Е-пошта",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
    },
    footer: "Софтверски инженер од Скопје, Македонија.",
  },
};

export const localeConfig = {
  en: {
    path: "/",
    sectionIds: {
      about: "about",
      experience: "experience",
      skills: "skills",
      projects: "projects",
      contact: "contact",
    },
  },
  mk: {
    path: "/mk",
    sectionIds: {
      about: "za-mene",
      experience: "iskustvo",
      skills: "veshtini",
      projects: "proekti",
      contact: "kontakt",
    },
  },
} as const;
