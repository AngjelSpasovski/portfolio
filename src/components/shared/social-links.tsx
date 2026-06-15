import { Mail } from "lucide-react";

type SocialLinksProps = {
  github: string;
  linkedin: string;
  email: string;
  labels: {
    github: string;
    linkedin: string;
    email: string;
  };
};

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.95c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92v2.8c0 .27.18.59.69.49A10.16 10.16 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      <path d="M5.34 8.86H2.67V21h2.67V8.86ZM4 3a1.55 1.55 0 1 0 0 3.1A1.55 1.55 0 0 0 4 3Zm17.33 11.22c0-3.27-1.74-5.36-4.58-5.36-1.84 0-2.86 1.02-3.35 1.73V8.86h-2.66V21h2.66v-6.49c0-1.71.84-3.03 2.47-3.03 1.43 0 2.78.87 2.78 3.08V21h2.68v-6.78ZM8.93 8.86H6.26V21h2.67V8.86Z" />
    </svg>
  );
}

const items = [
  { key: "github", Icon: GitHubMark },
  { key: "linkedin", Icon: LinkedInMark },
  { key: "email", Icon: Mail },
] as const;

export function SocialLinks({ github, linkedin, email, labels }: SocialLinksProps) {
  const hrefs = { github, linkedin, email };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map(({ key, Icon }) => (
        <a
          key={key}
          href={hrefs[key]}
          target={key === "email" ? undefined : "_blank"}
          rel={key === "email" ? undefined : "noreferrer"}
          aria-label={labels[key]}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-950 shadow-sm transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/15 dark:bg-white dark:text-zinc-950 dark:hover:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}
