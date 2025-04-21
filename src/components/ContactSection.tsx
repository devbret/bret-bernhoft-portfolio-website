import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real application, you would send the form data to your backend
    console.log("Form Data:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      alert("Thank you for your message! I will get back to you soon.");
    }, 1500);
  };

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
            Have a project in mind or want to discuss potential opportunities?
            Feel free to reach out through the form below or via the provided
            contact information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <ContactItem
              icon={Mail}
              title="Email"
              value="contact@example.com"
              href="mailto:contact@example.com"
            />
            <ContactItem
              icon={Phone}
              title="Phone"
              value="+1 (555) 123-4567"
              href="tel:+15551234567"
            />
            <ContactItem
              icon={MapPin}
              title="Location"
              value="San Francisco, CA, USA"
              href="#"
            />

            {/* Social links can go here */}

            <div className="p-6 bg-cyber-black/50 border border-white/10 rounded-lg mt-8">
              <h4 className="text-lg font-bold mb-3">Available For</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-neon rounded-full mr-3"></div>
                  Freelance Projects
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-pink rounded-full mr-3"></div>
                  Full-time Positions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-purple rounded-full mr-3"></div>
                  Consulting
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-orange rounded-full mr-3"></div>
                  Technical Mentoring
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 bg-cyber-black/50 border border-white/10 rounded-lg relative overflow-hidden cyber-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 focus:border-cyber-neon focus:ring-cyber-neon/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                    className="bg-white/5 border-white/10 focus:border-cyber-neon focus:ring-cyber-neon/20"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject of your message"
                    className="bg-white/5 border-white/10 focus:border-cyber-neon focus:ring-cyber-neon/20"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message..."
                    rows={6}
                    className="bg-white/5 border-white/10 focus:border-cyber-neon focus:ring-cyber-neon/20 resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group bg-transparent border border-cyber-neon text-cyber-neon hover:bg-cyber-neon hover:text-cyber-black transition-all py-6 cyber-border"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-cyber-neon"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </form>
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
  href: string;
}) => (
  <a
    href={href}
    className="flex items-start group transition-all"
    target={
      href.startsWith("mailto:") || href.startsWith("tel:") ? "_self" : "_blank"
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
);

export default ContactSection;
