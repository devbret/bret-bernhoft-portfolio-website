import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ElementType,
} from "react";
import { ArrowDown, Cpu, Workflow, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useNearViewport } from "@/hooks/useNearViewport";

const HoloPortrait = lazy(() => import("./HoloPortrait"));

const PORTRAIT_SRC = "/portrait.jpeg";

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
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      data-visible={visible ? "true" : "false"}
      data-focused={focused ? "true" : "false"}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      className={[
        "relative pl-5 outline-none",
        "before:absolute before:left-0 before:top-2 before:h-4 before:w-1 before:rounded before:bg-cyber-neon/80",
        "before:opacity-0 before:translate-x-[-4px] before:transition-all before:duration-200",
        "data-[focused=true]:before:opacity-100 data-[focused=true]:before:translate-x-0",
        "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
        "motion-safe:data-[visible=true]:translate-y-0 motion-safe:data-[visible=false]:translate-y-1",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

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
  const sectionRef = useRef<HTMLElement>(null);
  const [holoReady, setHoloReady] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const nearViewport = useNearViewport(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 cyber-bg relative overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid opacity-20 z-0"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-cyber-neon font-mono text-lg tracking-widest mb-2">
              <span className="inline-block w-10 h-[1px] bg-cyber-neon mr-3 align-middle"></span>
              ABOUT ME
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Passionate Software Engineer
            </h3>

            {isDesktop && (
              <div className="relative mt-8 mb-6">
                <div
                  className={[
                    "group relative w-80 h-80 rounded-lg overflow-hidden border-2 border-cyber-neon/50 cyber-border",
                    "bg-black/20 transform-gpu",
                    "motion-safe:hover:rotate-[1.5deg] motion-safe:hover:translate-x-0.5 motion-safe:hover:-translate-y-0.5",
                    "transition-all duration-300",
                    "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute -inset-0.5 rounded-lg opacity-0 blur-md transition duration-300 group-hover:opacity-100 bg-gradient-to-br from-cyber-neon/25 to-cyber-pink/25" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 to-cyber-blue/10" />
                  <img
                    src={PORTRAIT_SRC}
                    alt="Engineer Portrait"
                    className={cn(
                      "w-full h-full object-cover transition-opacity duration-700",
                      holoReady && "opacity-0",
                    )}
                  />
                  {nearViewport && (
                    <Suspense fallback={null}>
                      <HoloPortrait
                        src={PORTRAIT_SRC}
                        onReady={() => setHoloReady(true)}
                      />
                    </Suspense>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6 text-white/80 max-w-prose md:leading-8">
              <ParagraphReveal>
                <p className="text-lg md:text-xl leading-[2.1rem] md:leading-[2.13rem]">
                  I am a software engineer building LLM-powered applications and
                  data pipelines. My core stack is Python, TypeScript, React and
                  SQL on AWS, shipped through Git and GitHub Actions CI/CD.
                </p>
              </ParagraphReveal>

              <ParagraphReveal>
                <p className="leading-relaxed md:leading-8">
                  Since 2021 I have led the development of production
                  applications, from WordPress sites to internal tools on
                  Quickbase. I also build REST API integrations connecting AWS
                  services to other platforms, such as Trello and Zapier. Which
                  together automate workflows cutting thousands of hours per
                  week of manual work and powering two-way reporting for 300
                  colleagues.
                </p>
              </ParagraphReveal>

              <ParagraphReveal>
                <p className="leading-relaxed md:leading-8">
                  I run a Linux homelab where I serve self-hosted LLMs through
                  Ollama on dedicated GPU hardware and monitor services with
                  Prometheus and Grafana. Recent builds include Flask services
                  for checking username availability across 100 sites, a
                  Raspberry Pi pipeline to turn pressure-sensor data into D3.js
                  visualizations and a lyrics-analysis app whose Python backend
                  emits a rhyme-network graph for an interactive frontend. I am
                  now focused on agent workflows with the Claude API, building
                  tools to take repetitive work off people's plates.
                </p>
              </ParagraphReveal>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-xl font-bold mb-4">Core Values</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CoreValueCard
                    icon={Cpu}
                    title="Clean Code"
                    desc="Writing maintainable, readable and efficient code"
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

        <div className="flex justify-center mt-16">
          <a
            href="#projects"
            className="flex flex-col items-center text-white/50 hover:text-cyber-neon transition-colors"
          >
            <span className="text-sm mb-2">View My Projects</span>
            <ArrowDown className="motion-safe:animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
