import { useEffect, useRef, useState, type ElementType } from "react";
import { ArrowDown, Cpu, Workflow, Zap, Shield } from "lucide-react";

/* ----------------------------- Helpers ----------------------------- */

/**
 * Reveal-on-scroll + focus-aware neon marker.
 * - Content subtly fades/slides in when it enters the viewport.
 * - Neon marker ONLY shows while the paragraph is focused (keyboard) or hovered.
 * - Marker disappears when focus/hover leaves (your request).
 */
function ParagraphReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          setVisible(e.isIntersecting);
        });
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // Keyboard focusable without adding it to the normal tab order:
      tabIndex={-1}
      data-visible={visible ? "true" : "false"}
      data-focused={focused ? "true" : "false"}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      className={[
        // layout
        "relative pl-5 outline-none",
        // neon marker (left edge). It appears only when focused/hovered.
        "before:absolute before:left-0 before:top-2 before:h-4 before:w-1 before:rounded before:bg-cyber-neon/80",
        "before:opacity-0 before:translate-x-[-4px] before:transition-all before:duration-200",
        "data-[focused=true]:before:opacity-100 data-[focused=true]:before:translate-x-0",
        // content reveal (when visible in viewport)
        "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
        "motion-safe:data-[visible=true]:translate-y-0 motion-safe:data-[visible=false]:translate-y-1",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/** Core value card with icon and gentle hover lift. */
function CoreValueCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-white/[0.07]">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyber-neon/15 border border-cyber-neon/30">
          <Icon className="h-5 w-5 text-cyber-neon" />
        </span>
        <div>
          <h5 className="text-white font-medium">{title}</h5>
          <p className="text-white/60 text-sm mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
}

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-20 px-4 cyber-bg relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-20 z-0"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-cyber-neon font-mono text-lg tracking-widest mb-2">
              <span className="inline-block w-10 h-[1px] bg-cyber-neon mr-3 align-middle"></span>
              ABOUT ME
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Passionate Full Stack Software Engineer
            </h3>

            {/* Portrait with 3D tilt + neon edge glow (idea #11) */}
            <div className="relative mt-8 mb-6 hidden lg:block">
              <div
                className={[
                  "group relative w-64 h-64 rounded-lg overflow-hidden border-2 border-cyber-neon/50 cyber-border",
                  "bg-black/20 transform-gpu",
                  "motion-safe:hover:rotate-[1.5deg] motion-safe:hover:translate-x-0.5 motion-safe:hover:-translate-y-0.5",
                  "transition-all duration-300",
                  "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
                ].join(" ")}
              >
                {/* outer neon glow */}
                <div className="pointer-events-none absolute -inset-0.5 rounded-lg opacity-0 blur-md transition duration-300 group-hover:opacity-100 bg-gradient-to-br from-cyber-neon/25 to-cyber-pink/25" />
                {/* inner gradient glaze */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 to-cyber-blue/10" />
                <img
                  src="https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/5a3517f9-fee3-4763-93ff-238c315bb034.jpeg"
                  alt="Engineer Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 border-2 border-cyber-pink/50 rounded-lg"></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3">
            {/* Measure + rhythm tweaks (idea #6) */}
            <div className="space-y-6 text-white/80 max-w-prose md:leading-8">
              {/* Paragraph 1: slightly larger on md+ */}
              <ParagraphReveal className="md:[&_p]:text-xl">
                <p className="text-lg leading-relaxed md:leading-8">
                  I am a Full Stack Software Engineer specializing in low-code
                  development, with a strong focus on building secure, scalable
                  applications using Quickbase and cloud-integrated automation
                  platforms. My background spans from WordPress deployments to
                  enterprise-grade business systems, giving me a unique
                  perspective on how people interact with technology at scale.
                </p>
              </ParagraphReveal>

              <ParagraphReveal>
                <p className="leading-relaxed md:leading-8">
                  Since 2021, I have led the development of production-grade
                  Quickbase applications, engineered API integrations across
                  services like AWS, Trello and Zapier, and delivered automation
                  workflows that cut operational overhead. My work consistently
                  emphasizes collaboration, user-centric interfaces and
                  real-time reporting to empower all users.
                </p>
              </ParagraphReveal>

              <ParagraphReveal>
                <p className="leading-relaxed md:leading-8">
                  I focus on blending application development, business process
                  automation and platform interoperability. My current toolbox
                  includes Quickbase (Pipelines, Webhooks, APIs, Dashboards),
                  JavaScript, React, Python, SQL and platforms such as Zapier. I
                  also maintain a private homelab where I prototype integrations
                  with self-hosted LLMs and AI-driven tooling for workflow
                  intelligence.
                </p>
              </ParagraphReveal>

              <ParagraphReveal>
                <p className="leading-relaxed md:leading-8">
                  My ongoing goal is to design systems that simplify complexity,
                  reduce manual effort and expand access to reliable,
                  high-performing technology.
                </p>
              </ParagraphReveal>

              {/* Core Values as micro-cards with icons and hover lift (idea #10) */}
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-xl font-bold mb-4">Core Values</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CoreValueCard
                    icon={Cpu}
                    title="Clean Code"
                    desc="Writing maintainable, readable, and efficient code"
                  />
                  <CoreValueCard
                    icon={Workflow}
                    title="User-Centric"
                    desc="Designing with the end-user's experience in mind"
                  />
                  <CoreValueCard
                    icon={Zap}
                    title="Continuous Learning"
                    desc="Always expanding knowledge and skills"
                  />
                  <CoreValueCard
                    icon={Shield}
                    title="Problem Solving"
                    desc="Finding elegant solutions to complex challenges"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <a
            href="#projects"
            className="flex flex-col items-center text-white/50 hover:text-cyber-neon transition-colors"
          >
            <span className="text-sm mb-2">View My Projects</span>
            <ArrowDown className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
