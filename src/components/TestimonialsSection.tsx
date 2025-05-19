type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatarUrl?: string;
  tag?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Christopher Bloom",
    role: "Principal Front-end Engineer at Knapsack",
    quote:
      "Bret is a very capable engineer with a natural curiosity and wide range of technological interests that inform his problem solving skills. [...] Bret is a considerate and helpful team member who I regard with utmost respect.",
    avatarUrl: "",
    tag: "Software Engineering",
  },
  {
    id: 2,
    name: "Deja Drummer",
    role: "Technical Requirements Analyst @ BAH",
    quote:
      "I highly recommend Bret for any professional opportunity or collaboration. He is incredibly experienced and has a deep understanding of his field, which was evident in the thoughtful advice he gave me even on my personal technical projects.",
    avatarUrl: "",
    tag: "Cybersecurity",
  },
  {
    id: 3,
    name: "Frank Diepmaat",
    role: "Growth Marketer at LeadDesk & Founder of Hacktoria CTF",
    quote:
      "I had the pleasure of working with Bret on two occasions. First as an early team member of Hacktoria. The other occasion was during my time at DataCrunch, where Bret organized a whole panel of developers to help us test a new application.",
    avatarUrl: "",
    tag: "Open Source Intelligence",
  },
  {
    id: 4,
    name: "Jacob Beauchamp",
    role: "Software Engineer",
    quote:
      "Bret has a real, demonstrated passion for software engineering. [...] Through his publications and commitment to genuine interests in forward-looking technologies like AI and data analytics, it's clear that he'd be a great candidate for a software engineering role in today's market onward.",
    avatarUrl: "",
    tag: "Software Engineering",
  },
  {
    id: 5,
    name: "John Bailey",
    role: "Cybersecurity Analyst",
    quote:
      "Bret is an excellent communicator and a true professional. He has always been willing to support me on my journey, demonstrating patience, expertise, and a strong commitment to helping both me and the broader tech community.",
    avatarUrl: "",
    tag: "Cybersecurity",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="endorsements" className="py-20 px-4 cyber-bg relative">
      <div className="absolute inset-0 cyber-grid opacity-20 z-0"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-cyber-neon font-mono text-lg tracking-widest mb-2">
              <span className="inline-block w-10 h-[1px] bg-cyber-neon mr-3 align-middle"></span>
              ENDORSEMENTS
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              LinkedIn Recommendations
            </h3>
            <p className="text-white/70 max-w-2xl">
              Words from colleagues, mentors and collaborators who have worked
              alongside me.
            </p>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="flex flex-wrap justify-center -mx-2">
          {testimonials.map((t) => (
            <div key={t.id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6">
              <div className="h-full bg-white/5 border border-white/10 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-4">
                  {t.avatarUrl && (
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-12 h-12 rounded-full border border-white/20"
                    />
                  )}
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {t.name}
                    </h4>
                    <p className="text-sm text-white/60">{t.role}</p>
                  </div>
                </div>
                <p className="text-white/80 italic">“{t.quote}”</p>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/70 text-lg">
              No testimonials found for this filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
