import type { LucideIcon } from "lucide-react";
import type { ProjectVisualId } from "@/data/portfolio-data";

export type Locale = "en" | "mk";

export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  current: boolean;
  employmentType?: string;
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
  id: string;
  categoryLabel: string;
  title: string;
  type: string;
  period: string;
  company: string;
  description: string;
  stack: string[];
  technologies: string[];
  caseStudy: {
    context: string;
    role: string;
    challenge: string;
    contribution: string;
    outcome: string;
  };
  href?: string;
  visualId?: ProjectVisualId;
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
    atsCvCta: string;
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
