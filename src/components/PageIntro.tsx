type PageIntroProps = {
  icon: string;
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function PageIntro({
  icon,
  eyebrow,
  title,
  description,
  align = "left",
}: PageIntroProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      <div className="flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      {eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/70">{eyebrow}</p>
      ) : null}
      <div className="space-y-3">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
          {title}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base dark:text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
}
