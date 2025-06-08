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
                I am a Full Stack Software Engineer specializing in low-code
                development, with a strong focus on building secure, scalable
                applications using Quickbase and cloud-integrated automation
                platforms. My background spans from WordPress deployments to
                business systems, giving me a unique perspective on how people
                interact with technology at scale.
              </p>

              <p className="leading-relaxed">
                For nearly 4 years, I have led the development of
                production-grade Quickbase applications used by multi-state
                field teams, engineered API integrations across cloud services
                like AWS, Trello and Zapier and delivered automation workflows
                that cut operational overhead by over 20%. My work consistently
                emphasizes collaboration, user-centric interfaces and real-time
                reporting to empower decision-makers and ground teams alike.
              </p>

              <p className="leading-relaxed">
                I am particularly interested in roles blending application
                development, business process automation and platform
                interoperability. My current toolbox includes Quickbase
                (Pipelines, Webhooks, APIs, Dashboards), JavaScript, React,
                Python, SQL and platforms like Power Platform and Zapier. I also
                maintain a private homelab where I prototype integrations with
                self-hosted LLMs and AI-driven tooling for workflow
                intelligence.
              </p>

              <p className="leading-relaxed">
                I am actively seeking opportunities where I can grow as a
                low-code engineer and automation architect. My goal is to design
                systems that simplify complexity, reduce manual effort and
                expand access to reliable, high-performing technology.
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
