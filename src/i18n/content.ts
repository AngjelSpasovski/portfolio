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
import { localized, portfolioData, type SkillIconKey } from "@/data/portfolio-data";
import type { Locale, SiteContent } from "./types";

export type {
  CertificationItem,
  ExperienceItem,
  Locale,
  NavItem,
  ProjectItem,
  SiteContent,
  SkillGroup,
} from "./types";

const sharedSocial = {
  github: siteConfig.links.github,
  linkedin: siteConfig.links.linkedin,
  email: `mailto:${siteConfig.emailAddress}`,
};

const skillIcons = {
  code: Code2,
  sparkles: Sparkles,
  database: Database,
  cpu: Cpu,
  wrench: Wrench,
  network: Network,
} satisfies Record<SkillIconKey, typeof Code2>;

function getStats(locale: Locale) {
  const years = new Date().getUTCFullYear() - portfolioData.profile.careerStartYear;
  const experienceValue = `${Math.max(10, Math.floor(years / 10) * 10)}+`;
  const companiesValue = String(new Set(portfolioData.experience.map((item) => item.company)).size);

  return locale === "mk"
    ? [
        { value: experienceValue, label: "Години искуство" },
        { value: companiesValue, label: "Компании" },
        { value: String(portfolioData.certifications.length), label: "Сертификати" },
        { value: portfolioData.profile.locationCode, label: "Локација" },
      ]
    : [
        { value: experienceValue, label: "Years experience" },
        { value: companiesValue, label: "Companies" },
        { value: String(portfolioData.certifications.length), label: "Certificates" },
        { value: portfolioData.profile.locationCode, label: "Based in" },
      ];
}

function getExperience(locale: Locale) {
  return portfolioData.experience.map((item) => ({
    role: localized(item.role, locale),
    company: item.company,
    current: item.current,
    employmentType: item.employmentType ? localized(item.employmentType, locale) : undefined,
    period: localized(item.period, locale),
    location: localized(item.location, locale),
    summary: localized(item.summary, locale),
    tags: item.tags,
  }));
}

function getSkills(locale: Locale) {
  return portfolioData.skills.map((group) => ({
    title: localized(group.title, locale),
    icon: skillIcons[group.icon],
    items: group.items[locale],
  }));
}

function getProjects(locale: Locale) {
  const categories = {
    product: { en: "Personal project", mk: "Личен проект" },
    enterprise: { en: "Enterprise project", mk: "Enterprise проект" },
    client: { en: "Client project", mk: "Клиентски проект" },
    learning: { en: "Learning project", mk: "Проект за учење" },
    "project-hub": { en: "Project Hub", mk: "Project Hub" },
  };
  return portfolioData.projects
    .filter((project) => project.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((project) => ({
      id: project.id,
      categoryLabel: categories[project.category][locale],
      title: project.title,
      type: localized(project.type, locale),
      period: localized(project.period, locale),
      company: localized(project.company, locale),
      description: localized(project.summary, locale),
      stack: project.featuredTechnologies,
      technologies: project.technologies,
      caseStudy: {
        context: localized(project.caseStudy.context, locale),
        role: localized(project.caseStudy.role, locale),
        challenge: localized(project.caseStudy.challenge, locale),
        contribution: localized(project.caseStudy.contribution, locale),
        outcome: localized(project.caseStudy.outcome, locale),
      },
      href: project.links.live ?? project.links.repository,
      visualId: project.visualId,
    }));
}

function getCertifications(locale: Locale) {
  return [...portfolioData.certifications]
    .sort((a, b) => b.issuedYear - a.issuedYear)
    .map((certification) => ({
      title: certification.title,
      issuer: certification.issuer,
      date: localized(certification.date, locale),
      courseUrl: certification.courseUrl,
      credentialUrl: certification.credentialUrl,
    }));
}

export const content: Record<Locale, SiteContent> = {
  en: {
    locale: "en",
    langLabel: "EN",
    switchLabel: "MK",
    social: sharedSocial,
    nav: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Certs", href: "#certifications" },
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
      cvCta: "Designed CV",
      atsCvCta: "ATS CV",
      stats: getStats("en"),
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
      items: getExperience("en"),
    },
    skills: {
      tag: "03 / Skills",
      title: "Technical stack",
      subtitle:
        "Core technologies, product areas, and tools from long-running enterprise web applications.",
      groups: getSkills("en"),
    },
    projects: {
      tag: "04 / Projects",
      title: "Selected work",
      subtitle:
        "Public and private product work. Private enterprise products are described without repository links.",
      items: getProjects("en"),
    },
    certifications: {
      tag: "05 / Credentials",
      title: "Certifications",
      subtitle: "Selected certifications from frontend development, AI tooling, and networking foundations.",
      courseLabel: "View course",
      credentialLabel: "View credential",
      showAllLabel: "View all certificates",
      showFewerLabel: "Show fewer certificates",
      items: getCertifications("en"),
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
      { label: "Почеток", href: "#pochetok" },
      { label: "За мене", href: "#za-mene" },
      { label: "Искуство", href: "#iskustvo" },
      { label: "Вештини", href: "#veshtini" },
      { label: "Проекти", href: "#proekti" },
      { label: "Сертификати", href: "#sertifikati" },
      { label: "Контакт", href: "#kontakt" },
    ],
    hero: {
      badge: "Софтверски инженер",
      eyebrow: "Frontend инженеринг за практични enterprise решенија",
      title: "Анѓел",
      highlight: "Спасовски",
      description:
        "Софтверски инженер со 10+ години искуство во развој на веб-апликации, frontend инженеринг, enterprise производи и стабилни кориснички интерфејси за сложени деловни процеси.",
      primaryCta: "Види проекти",
      secondaryCta: "Контакт",
      cvCta: "Дизајнирано CV",
      atsCvCta: "ATS CV",
      stats: getStats("mk"),
    },
    about: {
      tag: "01 / За мене",
      title: "Стабилен frontend за сложени деловни производи.",
      paragraphs: [
        "Во последните години работам на Opera MES, Manufacturing Execution System за производствени операции. Мојот придонес е во frontend development, software design, product maintenance и подобрување на сложени производствени процеси.",
        "Работев и на производи како ArkCase и Move One, со искуство во JavaScript интерфејси, CSS, форми, модали, UI одржување, bug fixing и долгорочни enterprise апликации.",
        "Претходно стекнав искуство и во IT администрација, scripting, network maintenance и web platform support, што ми дава поширока перспектива кога градам практични software решенија.",
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
        "Професионален пат низ software engineering, frontend development, IT администрација и product design.",
      items: getExperience("mk"),
    },
    skills: {
      tag: "03 / Вештини",
      title: "Технички стек",
      subtitle:
        "Технологии, product области и алатки користени во долгорочни enterprise web апликации.",
      groups: getSkills("mk"),
    },
    projects: {
      tag: "04 / Проекти",
      title: "Избрана работа",
      subtitle:
        "Јавни и приватни примери од мојата работа на софтверски производи. Приватните enterprise производи се прикажани без repository линкови.",
      items: getProjects("mk"),
    },
    certifications: {
      tag: "05 / Сертификати",
      title: "Сертификати",
      subtitle: "Избрани сертификати од frontend development, AI tooling и основи на networking.",
      courseLabel: "Види курс",
      credentialLabel: "Види сертификат",
      showAllLabel: "Види ги сите сертификати",
      showFewerLabel: "Прикажи помалку сертификати",
      items: getCertifications("mk"),
    },
    contact: {
      tag: "06 / Контакт",
      title: "Да зборуваме за практичен софтвер.",
      text: "Отворен сум за разговори за software engineering, frontend работа, подобрување на enterprise производи и практични web application проекти.",
      emailLabel: "Е-пошта",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
    },
    footer: "Софтверски инженер од Скопје, Македонија.",
  },
};

export const localeConfig = {
  en: {
    path: "/en",
    sectionIds: {
      home: "home",
      about: "about",
      experience: "experience",
      skills: "skills",
      projects: "projects",
      certifications: "certifications",
      contact: "contact",
    },
  },
  mk: {
    path: "/mk",
    sectionIds: {
      home: "pochetok",
      about: "za-mene",
      experience: "iskustvo",
      skills: "veshtini",
      projects: "proekti",
      certifications: "sertifikati",
      contact: "kontakt",
    },
  },
} as const;
