import { ArrowDown } from "lucide-react";

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

            <div className="relative mt-8 mb-6 hidden lg:block">
              <div className="w-64 h-64 border-2 border-cyber-neon/50 rounded-lg overflow-hidden cyber-border">
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 to-cyber-blue/10"></div>
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
            <div className="space-y-6 text-white/80">
              <p className="text-lg leading-relaxed">
                I am a Full Stack Software Engineer focused on building
                automation-first tools that simplify operations, reduce friction
                and unlock smarter workflows.
              </p>

              <p className="leading-relaxed">
                My journey began in WordPress and digital communications, where
                I gained hands-on experience with analytics, content systems and
                community platforms. That foundation evolved into full stack
                development across a range of industries.
              </p>

              <p className="leading-relaxed">
                Today, I specialize in creating custom solutions using
                Quickbase, Zapier, REST and GraphQL APIs, Python, React and SQL.
                I am passionate about streamlining repetitive work, connecting
                systems and building high-impact tools.
              </p>

              <p className="leading-relaxed">
                I am especially drawn to the intersection of automation,
                intelligence and user experience. And am actively advancing
                toward a role as a Senior AI Engineer where I can apply these
                principles at scale.
              </p>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-xl font-bold mb-4">Core Values</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CoreValue
                    number="01"
                    title="Clean Code"
                    description="Writing maintainable, readable, and efficient code"
                  />
                  <CoreValue
                    number="02"
                    title="User-Centric"
                    description="Designing with the end-user's experience in mind"
                  />
                  <CoreValue
                    number="03"
                    title="Continuous Learning"
                    description="Always expanding knowledge and skills"
                  />
                  <CoreValue
                    number="04"
                    title="Problem Solving"
                    description="Finding elegant solutions to complex challenges"
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

const CoreValue = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <div className="flex">
    <div className="mr-4">
      <span className="text-cyber-neon font-mono text-sm">{number}</span>
    </div>
    <div>
      <h5 className="text-white font-medium mb-1">{title}</h5>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  </div>
);

export default AboutSection;
