type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-stone-400">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-4xl text-stone-50 md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-stone-300">{description}</p>
      ) : null}
    </div>
  );
}
