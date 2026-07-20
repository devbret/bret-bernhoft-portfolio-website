import type { CSSProperties } from "react";
import { skillCategories } from "@/data/skills";
import { cyberRgba } from "@/lib/palette";

const accentVars = (color: number) =>
  ({
    "--accent": cyberRgba(color, 1),
    "--accent-strong": cyberRgba(color, 0.45),
    "--accent-dim": cyberRgba(color, 0.3),
    "--accent-glow": cyberRgba(color, 0.15),
    "--accent-soft": cyberRgba(color, 0.08),
  }) as CSSProperties;

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4 cyber-bg relative">
      <div className="absolute inset-0 cyber-grid opacity-20 z-0"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-cyber-neon font-mono text-lg tracking-widest mb-2 inline-flex items-center justify-center">
            <span className="inline-block w-10 h-[1px] bg-cyber-neon mr-3"></span>
            SKILLS
            <span className="inline-block w-10 h-[1px] bg-cyber-neon ml-3"></span>
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Technical Expertise
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            The tools, languages and platforms I reach for to build complete,
            scalable applications - from front-end interfaces to back-end
            automation and self-hosted infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              style={accentVars(category.color)}
              className="bg-cyber-black/40 border border-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-strong)] hover:shadow-[0_0_28px_var(--accent-glow)]"
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--accent)] opacity-70"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--accent)] opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--accent)] opacity-70"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--accent)] opacity-70"></div>

              <div className="flex items-center mb-6">
                <div className="p-3 bg-[var(--accent-soft)] rounded-md mr-4">
                  <category.icon className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <h4 className="text-xl font-bold">{category.title}</h4>
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <li key={skill}>
                    <span className="inline-block px-3 py-1.5 text-sm font-mono rounded-full border border-[var(--accent-dim)] bg-cyber-black/40 text-white/80 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)]">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
