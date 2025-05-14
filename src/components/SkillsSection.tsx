import { Code, Database, Globe, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Skill categories with their respective skills and levels
const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: Globe,
    skills: [
      { name: "React / React Native", level: 90 },
      { name: "TypeScript / JavaScript", level: 95 },
      { name: "HTML / CSS / SASS", level: 85 },
      { name: "Redux / Context API", level: 80 },
      { name: "Next.js", level: 75 },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: Database,
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "MongoDB / Mongoose", level: 80 },
      { name: "SQL / PostgreSQL", level: 75 },
      { name: "RESTful APIs", level: 90 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    id: "tools",
    title: "DevOps & Tools",
    icon: Zap,
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker / Kubernetes", level: 65 },
      { name: "CI/CD Pipelines", level: 70 },
      { name: "AWS / Cloud Services", level: 75 },
      { name: "Testing (Jest, Cypress)", level: 80 },
    ],
  },
  {
    id: "languages",
    title: "Languages & Frameworks",
    icon: Code,
    skills: [
      { name: "JavaScript / TypeScript", level: 95 },
      { name: "Python", level: 80 },
      { name: "Java", level: 65 },
      { name: "C#", level: 60 },
      { name: "PHP", level: 70 },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4 cyber-bg relative">
      {/* Background elements */}
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
            As a full stack software engineer, I honed my skills across various
            technologies and frameworks, allowing me to build complete, scalable
            applications from front to back.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="bg-cyber-black/40 border border-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 relative group overflow-hidden transition-all hover:border-cyber-neon/30"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-neon opacity-70"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-pink opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-orange opacity-70"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-purple opacity-70"></div>

              {/* Header */}
              <div className="flex items-center mb-6">
                <div className="p-3 bg-cyber-purple/10 rounded-md mr-4">
                  <category.icon className="w-6 h-6 text-cyber-purple" />
                </div>
                <h4 className="text-xl font-bold">{category.title}</h4>
              </div>

              {/* Skills */}
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
