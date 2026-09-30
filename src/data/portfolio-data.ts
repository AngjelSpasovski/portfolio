import rawPortfolioData from "./portfolio-data.json";

export const projectVisualIds = ["dbstore", "portfolio", "opera-mes", "dentcare"] as const;
export type ProjectVisualId = (typeof projectVisualIds)[number];

export type DataLocale = "en" | "mk";
export type LocalizedText = Record<DataLocale, string>;
export type LocalizedList = Record<DataLocale, string[]>;
export type SkillIconKey = "code" | "sparkles" | "database" | "cpu" | "wrench" | "network";

type ExperienceRecord = {
  id: string;
  role: LocalizedText;
  company: string;
  current: boolean;
  employmentType?: LocalizedText;
  period: LocalizedText;
  location: LocalizedText;
  summary: LocalizedText;
  tags: string[];
};

type SkillRecord = {
  id: string;
  title: LocalizedText;
  icon: SkillIconKey;
  items: LocalizedList;
};

type ProjectRecord = {
  id: string;
  status: "draft" | "published" | "archived";
  visibility: "public" | "private";
  category: "product" | "enterprise" | "client" | "learning" | "project-hub";
  current: boolean;
  featured: boolean;
  sortOrder: number;
  title: string;
  type: LocalizedText;
  period: LocalizedText;
  company: LocalizedText;
  summary: LocalizedText;
  caseStudy: {
    context: LocalizedText;
    role: LocalizedText;
    challenge: LocalizedText;
    contribution: LocalizedText;
    outcome: LocalizedText;
  };
  technologies: string[];
  featuredTechnologies: string[];
  cvTechnologies?: string[];
  links: { live?: string; repository?: string };
  visualId?: ProjectVisualId;
};

type CertificationRecord = {
  id: string;
  title: string;
  issuer: string;
  issuedYear: number;
  date: LocalizedText;
  courseUrl?: string;
  credentialUrl?: string;
};

export type PortfolioData = {
  profile: {
    careerStartYear: number;
    locationCode: string;
    summary: LocalizedList;
  };
  experience: ExperienceRecord[];
  skills: SkillRecord[];
  projects: ProjectRecord[];
  certifications: CertificationRecord[];
};

function hasLocalizedText(value: unknown): value is LocalizedText {
  if (!value || typeof value !== "object") return false;
  const localized = value as Record<string, unknown>;
  return ["en", "mk"].every(
    (locale) => typeof localized[locale] === "string" && localized[locale].trim().length > 0,
  );
}

function assertUnique(values: string[], label: string) {
  if (new Set(values).size !== values.length) {
    throw new Error(`Portfolio data contains duplicate ${label}.`);
  }
}

function isAbsoluteHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validatePortfolioData(data: PortfolioData) {
  if (!data.profile.summary.en.length || !data.profile.summary.mk.length) {
    throw new Error("Portfolio profile summary is incomplete.");
  }

  assertUnique(data.experience.map((item) => item.id), "experience IDs");
  assertUnique(data.skills.map((item) => item.id), "skill IDs");
  assertUnique(data.projects.map((item) => item.id), "project IDs");
  assertUnique(data.certifications.map((item) => item.id), "certification IDs");

  for (const item of data.experience) {
    if (![item.role, item.period, item.location, item.summary].every(hasLocalizedText)) {
      throw new Error(`Experience '${item.id}' is missing localized content.`);
    }
    if (item.employmentType && !hasLocalizedText(item.employmentType)) {
      throw new Error(`Experience '${item.id}' has an incomplete employment type.`);
    }
    assertUnique(item.tags, `tags for experience '${item.id}'`);
  }

  for (const skill of data.skills) {
    if (!hasLocalizedText(skill.title) || !skill.items.en.length || !skill.items.mk.length) {
      throw new Error(`Skill group '${skill.id}' is incomplete.`);
    }
  }

  for (const project of data.projects) {
    if (typeof project.current !== "boolean") {
      throw new Error(`Project '${project.id}' is missing its current status.`);
    }
    if (![project.type, project.period, project.company, project.summary].every(hasLocalizedText)) {
      throw new Error(`Project '${project.id}' is missing localized content.`);
    }
    if (!Object.values(project.caseStudy).every(hasLocalizedText)) {
      throw new Error(`Project '${project.id}' has an incomplete localized case study.`);
    }
    assertUnique(project.technologies, `technologies for project '${project.id}'`);
    if (project.cvTechnologies) {
      assertUnique(project.cvTechnologies, `CV technologies for project '${project.id}'`);
    }
    if (project.featuredTechnologies.length < 5 || project.featuredTechnologies.length > 7) {
      throw new Error(`Project '${project.id}' must feature between five and seven technologies.`);
    }
    if (!project.featuredTechnologies.every((technology) => project.technologies.includes(technology))) {
      throw new Error(`Project '${project.id}' has a featured technology outside its full stack.`);
    }
    if (project.visibility === "public" && !project.links.live && !project.links.repository) {
      throw new Error(`Public project '${project.id}' requires a public link.`);
    }
    if (project.visibility === "private" && (project.links.live || project.links.repository)) {
      throw new Error(`Private project '${project.id}' cannot expose public links.`);
    }
    if (project.visualId && !projectVisualIds.includes(project.visualId)) {
      throw new Error(`Project '${project.id}' references an unknown visual ID.`);
    }
  }

  for (const certification of data.certifications) {
    if (!hasLocalizedText(certification.date)) {
      throw new Error(`Certification '${certification.id}' is missing a localized date.`);
    }
    if (!Number.isInteger(certification.issuedYear) || certification.issuedYear < 1900) {
      throw new Error(`Certification '${certification.id}' has an invalid issued year.`);
    }
    for (const [label, value] of [
      ["course", certification.courseUrl],
      ["credential", certification.credentialUrl],
    ] as const) {
      if (value && !isAbsoluteHttpUrl(value)) {
        throw new Error(`Certification '${certification.id}' has an invalid ${label} URL.`);
      }
    }
  }

}

export const portfolioData = rawPortfolioData as unknown as PortfolioData;
validatePortfolioData(portfolioData);

export function localized(text: LocalizedText, locale: DataLocale) {
  return text[locale];
}
