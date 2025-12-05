import { Code, LayoutDashboard, Share2, Cpu, Globe, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const skillCategories = [
  {
    id: "core",
    title: "Core Development",
    icon: Globe,
    skills: [
      { name: "JavaScript / TypeScript", level: 100 },
      { name: "HTML5 / CSS3", level: 100 },
      { name: "Python", level: 85 },
      { name: "Node.js / Express", level: 85 },
      { name: "SQL / MySQL", level: 80 },
      { name: "Flask (Python)", level: 75 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend And UI Engineering",
    icon: LayoutDashboard,
    skills: [
      { name: "React", level: 100 },
      { name: "Vite", level: 90 },
      { name: "D3.js", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Three.js", level: 75 },
      { name: "AngularJS", level: 70 },
    ],
  },
  {
    id: "apis",
    title: "APIs And Integration",
    icon: Share2,
    skills: [
      { name: "REST API Design And Integration", level: 95 },
      { name: "Quickbase API And Automation", level: 90 },
      { name: "Zapier", level: 85 },
      { name: "Webhooks", level: 80 },
      { name: "GraphQL", level: 80 },
      { name: "OAuth And Authentication Systems", level: 75 },
    ],
  },
  {
    id: "tools",
    title: "DevOps And Automation",
    icon: Zap,
    skills: [
      { name: "Docker / GitHub Actions", level: 90 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "AWS (EC2, RDS)", level: 85 },
      { name: "Proxmox / Linux Admin", level: 80 },
      { name: "OPNsense / Pi-hole", level: 80 },
      { name: "Netlify / Nginx / Self-Hosting", level: 80 },
    ],
  },
  {
    id: "lowcode",
    title: "Low-Code And Productivity Tools",
    icon: Cpu,
    skills: [
      { name: "Quickbase Development", level: 95 },
      { name: "Zapier Automation", level: 90 },
      { name: "Git / GitHub Workflows", level: 90 },
      { name: "Notion", level: 85 },
      { name: "Airtable", level: 80 },
      { name: "Trello", level: 75 },
    ],
  },
  {
    id: "languages",
    title: "Scripting And Languages",
    icon: Code,
    skills: [
      { name: "JavaScript / TypeScript", level: 100 },
      { name: "HTML5 / CSS3", level: 100 },
      { name: "Python", level: 85 },
      { name: "Bash", level: 75 },
      { name: "PHP", level: 65 },
      { name: "Ruby", level: 60 },
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
            As a full stack software engineer, I have honed my skills across
            various technologies and frameworks, allowing me to build complete,
            scalable applications from front to back.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="bg-cyber-black/40 border border-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 relative group overflow-hidden transition-all hover:border-cyber-neon/30"
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

              <div className="space-y-5">
                {category.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-sm">{skill.name}</span>
                      <span className="font-mono text-xs text-cyber-neon">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2 bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
