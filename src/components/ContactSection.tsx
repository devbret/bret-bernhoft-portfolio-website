import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 cyber-bg relative">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20 z-0"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-cyber-neon font-mono text-lg tracking-widest mb-2 inline-flex items-center justify-center">
            <span className="inline-block w-10 h-[1px] bg-cyber-neon mr-3"></span>
            CONTACT
            <span className="inline-block w-10 h-[1px] bg-cyber-neon ml-3"></span>
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Want to discuss potential employment opportunities? Feel free to
            reach out through the provided contact information.
          </p>
        </div>

        <div className="flex justify-center items-center min-h-[50vh]">
          {/* Contact Info */}
          <div className="space-y-8">
            <ContactItem
              icon={Mail}
              title="Email"
              value="contact@bretbernhoft.com"
              href="mailto:contact@bretbernhoft.com"
            />
            <ContactItem
              icon={Phone}
              title="Phone"
              value="+1 (503) 801-6123"
              href="tel:+15038016123"
            />
            <ContactItem
              icon={MapPin}
              title="Location"
              value="Vancouver, WA, USA"
            />

            <div className="p-6 bg-cyber-black/50 border border-white/10 rounded-lg mt-8">
              <h4 className="text-lg font-bold mb-3">Available For</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-pink rounded-full mr-3"></div>
                  Full-Time Positions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-orange rounded-full mr-3"></div>
                  Technical Mentoring
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
}) =>
  href ? (
    <a
      href={href}
      className="flex items-start group transition-all"
      target={
        href.startsWith("mailto:") || href.startsWith("tel:")
          ? "_self"
          : "_blank"
      }
      rel="noopener noreferrer"
    >
      <div className="p-3 bg-cyber-purple/10 rounded-md mr-4 group-hover:bg-cyber-purple/20 transition-all">
        <Icon className="w-6 h-6 text-cyber-purple" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-white/70">{title}</h4>
        <p className="font-semibold group-hover:text-cyber-neon transition-colors">
          {value}
        </p>
      </div>
    </a>
  ) : (
    <div className="flex items-center">
      <div className="p-3 bg-cyber-purple/10 rounded-md mr-4 group-hover:bg-cyber-purple/20 transition-all">
        <Icon className="w-6 h-6 text-cyber-purple" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-white/70">{title}</h4>
        <p className="font-semibold group-hover:text-cyber-neon transition-colors">
          {value}
        </p>
      </div>
    </div>
  );

export default ContactSection;
