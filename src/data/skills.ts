import {
  Code,
  BrainCircuit,
  LayoutDashboard,
  Share2,
  Workflow,
  Server,
} from "lucide-react";
import type { ElementType } from "react";
import { CYBER } from "@/lib/palette";

export type SkillCategory = {
  id: string;
  title: string;
  icon: ElementType;
  color: number;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    color: CYBER.neon,
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
    color: CYBER.purple,
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
    color: CYBER.orange,
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
    color: CYBER.pink,
    title: "Frontend & UI",
    icon: LayoutDashboard,
    skills: ["React", "Vite", "Tailwind CSS", "D3.js", "Three.js", "AngularJS"],
  },
  {
    id: "backend",
    color: CYBER.blue,
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
    color: CYBER.brightPurple,
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
