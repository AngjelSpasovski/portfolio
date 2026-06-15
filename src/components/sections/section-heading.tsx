type SectionHeadingProps = {
  tag: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ tag, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
        {tag}
      </p>
      <h2 className="text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
