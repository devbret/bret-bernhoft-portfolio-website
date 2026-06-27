import {
  Code,
  BrainCircuit,
  LayoutDashboard,
  Share2,
  Workflow,
  Server,
} from "lucide-react";
import type { ElementType } from "react";

type SkillCategory = {
  id: string;
  title: string;
  icon: ElementType;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    icon: Code,
    skills: [
      "JavaScript / TypeScript",
      "Python",
      "SQL / MySQL",
      "HTML5 / CSS3",
      "Bash",
      "PHP",
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: BrainCircuit,
    skills: [
      "Gemma",
      "Mistral",
      "Anthropic",
      "OpenAI",
      "Copilot",
      "Perplexity",
      "Cursor",
    ],
  },
  {
    id: "lowcode",
    title: "Low-Code & Deployment",
    icon: Workflow,
    skills: [
      "Quickbase",
      "AWS",
      "Zapier",
      "Notion",
      "Trello",
      "Docker",
      "Portainer",
      "Kubernetes",
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    icon: LayoutDashboard,
    skills: ["React", "Vite", "Tailwind CSS", "D3.js", "Three.js", "AngularJS"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: Share2,
    skills: [
      "Node.js / Express",
      "Flask",
      "REST APIs",
      "GraphQL",
      "Webhooks",
      "OAuth",
    ],
  },
  {
    id: "devops",
    title: "DevOps & Homelab",
    icon: Server,
    skills: [
      "Linux",
      "Raspberry Pi",
      "CI/CD",
      "Git / GitHub",
      "AWS",
      "Netlify",
      "Proxmox",
      "Pi-hole",
      "OPNsense",
    ],
  },
];

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
              className="bg-cyber-black/40 border border-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 relative overflow-hidden transition-all hover:border-cyber-neon/30"
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-neon opacity-70"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-pink opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-orange opacity-70"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-purple opacity-70"></div>

              <div className="flex items-center mb-6">
                <div className="p-3 bg-cyber-purple/10 rounded-md mr-4">
                  <category.icon className="w-6 h-6 text-cyber-purple" />
                </div>
                <h4 className="text-xl font-bold">{category.title}</h4>
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <li key={skill}>
                    <span className="inline-block px-3 py-1.5 text-sm font-mono rounded-full border border-cyber-neon/30 bg-cyber-black/40 text-white/80 transition-colors hover:border-cyber-neon hover:text-cyber-neon hover:bg-cyber-neon/5">
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
