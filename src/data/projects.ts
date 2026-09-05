export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  category?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Clark County Vehicle Collisions",
    description:
      "View traffic collision records in Clark County, WA as an interactive web-based heatmap.",
    image: "/projects/clark-county-collisions.jpg",
    tags: ["Python", "Leaflet", "Public Domain"],
    githubUrl: "https://github.com/devbret/clark-county-collisions",
    liveUrl: "https://collisions.bretbernhoft.com/",
  },
  {
    id: 2,
    title: "Cyberpunk Website",
    description:
      "A fictional corporate website set in a cyberpunk universe, built to feel like a real company's public-facing presence.",
    image: "/projects/cyberpunk-corpo-website.jpg",
    tags: ["React", "Vite", "Three.js", "Node.js"],
    githubUrl: "https://github.com/devbret/cyberpunk-corpo-website",
    liveUrl: "https://corpo.bretbernhoft.com/",
  },
  {
    id: 3,
    title: "Mapping A Website's Internal Links",
    description:
      "Explore a website's internal links, then visualize those connections as a network graph with analysis using Claude AI.",
    image: "/projects/mapping-website-internal-links.jpg",
    tags: ["Python", "JavaScript", "D3", "OSINT"],
    githubUrl: "https://github.com/devbret/website-internal-links",
    liveUrl: "https://links.bretbernhoft.com/",
  },
  {
    id: 4,
    title: "Consumer Price Indices",
    description:
      "Interactive data visualization of Consumer Price Indices built using JavaScript and D3.",
    image: "/projects/faostat-consumer-price-indices.jpg",
    tags: ["JavaScript", "D3", "FAOSTAT", "Python"],
    githubUrl: "https://github.com/devbret/faostat-consumer-price-indices",
    liveUrl: "https://cpi.bretbernhoft.com/",
  },
  {
    id: 5,
    title: "Tech Knowledge Hub",
    description:
      "An evolving collection of Bret Bernhoft's personally curated glossary terms and resource links.",
    image: "/projects/tech-knowledge-hub.jpg",
    tags: ["React", "Vite", "TypeScript", "FOSS"],
    githubUrl: "https://github.com/devbret/tech-knowledge-hub",
    liveUrl: "https://tkh.bretbernhoft.com/",
  },
  {
    id: 6,
    title: "Neon Run",
    description:
      "Built in TypeScript on WebGL2 with no game engine, libraries or asset files.",
    image: "/projects/neon-run.jpg",
    tags: ["WebGL2", "TypeScript", "JavaScript"],
    githubUrl: "https://github.com/devbret/neon-run",
    liveUrl: "https://neonrun.bretbernhoft.com/",
  },
  {
    id: 7,
    title: "Detailed Audio Analyses And Visualizations",
    description:
      "Measure the evolution of audio features for sound files. Then visualize the data.",
    image: "/projects/detailed-audio-analysis.jpg",
    tags: ["D3", "Python", "JSON", "Librosa"],
    githubUrl: "https://github.com/devbret/detailed-audio-analysis",
    liveUrl: "https://daav.bretbernhoft.com/",
  },
  {
    id: 8,
    title: "Document And Entity Map",
    description:
      "Interactive D3 network graph linking documents to the entities mentioned therein.",
    image: "/projects/document-entity-map.jpg",
    tags: ["JavaScript", "D3", "PDFs", "OSINT"],
    githubUrl: "https://github.com/devbret/document-entity-map",
    liveUrl: "https://entity.bretbernhoft.com/",
  },
  {
    id: 9,
    title: "TriMet GTFS Data Visualization",
    description:
      "Processes GTFS data into a JSON file, which a frontend decodes to animate vehicles on a map.",
    image: "/projects/trimet-gtfs-visualization.jpg",
    tags: ["Python", "Leaflet", "JSON"],
    githubUrl: "https://github.com/devbret/trimet-gtfs-visualization",
    liveUrl: "https://trimet.bretbernhoft.com/",
  },
  {
    id: 10,
    title: "FAOSTAT Populations",
    description:
      "Transforms CSV data into an interactive visualization to reveal how country populations change over time.",
    image: "/projects/faostat-populations.jpg",
    tags: ["Python", "CSV", "JSON", "FAOSTAT"],
    githubUrl: "https://github.com/devbret/faostat-populations",
    liveUrl: "https://populations.bretbernhoft.com/",
  },
  {
    id: 11,
    title: "Portland Parks Trees",
    description:
      "View data about trees in parks from Portland, Oregon as an interactive web-based heatmap.",
    image: "/projects/portland-parks-trees.jpg",
    tags: ["JavaScript", "Leaflet", "Public Domain"],
    githubUrl: "https://github.com/devbret/portland-parks-trees",
    liveUrl: "https://trees.bretbernhoft.com/",
  },
  {
    id: 12,
    title: "C-TRAN Average Wait Times",
    description:
      "Average wait times for C-TRAN stops in Vancouver, Washington visualized as a map.",
    image: "/projects/c-tran-wait-times.jpg",
    tags: ["JavaScript", "Python", "Public Domain"],
    githubUrl: "https://github.com/devbret/c-tran-wait-times",
    liveUrl: "https://ctran.bretbernhoft.com/",
  },
  {
    id: 13,
    title: "Character Interactions",
    description:
      "Map direct conversations between different characters in a body of text using Python and D3.",
    image: "/projects/character-interactions.jpg",
    tags: ["Python", "JavaScript", "D3", "JSON"],
    githubUrl: "https://github.com/devbret/character-interactions",
    liveUrl: "https://neuromancer.bretbernhoft.com/",
  },
  {
    id: 14,
    title: "Rhyming Words",
    description:
      "Analyzes a text file to detect rhymes, builds a network from those relationships and visualizes the resulting structure with D3.",
    image: "/projects/networked-rhyming-words.jpg",
    tags: ["Python", "JavaScript", "D3", "JSON"],
    githubUrl: "https://github.com/devbret/networked-rhyming-words",
    liveUrl: "https://rhymes.bretbernhoft.com/",
  },
  {
    id: 15,
    title: "Industrialization Paths",
    description:
      "Renders an animated D3 bubble chart showing how countries move over time across two economic indicators.",
    image: "/projects/global-industrialization-paths.jpg",
    tags: ["FAOSTAT", "Python", "D3", "JSON"],
    githubUrl: "https://github.com/devbret/global-industrialization-paths",
    liveUrl: "https://global.bretbernhoft.com/",
  },
  {
    id: 16,
    title: "Music Events Replay Heatmap",
    description:
      "A timeline of geocoded music events on an interactive Leaflet map for quickly navigating event volume.",
    image: "/projects/music-events-replay-heatmap.jpg",
    tags: ["Leaflet", "MusicBrainz", "JavaScript"],
    githubUrl: "https://github.com/devbret/music-events-replay-heatmap",
    liveUrl: "https://events.bretbernhoft.com/",
  },
  {
    id: 17,
    title: "Facial Recognition System",
    description:
      "Identifies people in photographs by matching every detected face against reference photos.",
    image: "/projects/facial-recognition-system.jpg",
    tags: ["Biometrics", "YuNet", "Python"],
    githubUrl: "https://github.com/devbret/facial-recognition-system",
    liveUrl: "",
  },
  {
    id: 18,
    title: "AI Chat Interface",
    description:
      "A chat interface for holding conversations with different locally deployed AI models.",
    image: "/projects/ai-chat-interface.jpg",
    tags: ["Python", "JavaScript", "Ollama", "LLM"],
    githubUrl: "https://github.com/devbret/ai-chat-interface",
    liveUrl: "",
  },
  {
    id: 19,
    title: "YouTube Playlists Tracker App",
    description:
      "Catalog your viewing progress with YouTube playlists, organized by user-defined categories, via this app.",
    image: "/projects/youtube-playlists-tracker-app.jpg",
    tags: ["Flask", "Python", "JavaScript", "D3"],
    githubUrl: "https://github.com/devbret/youtube-playlists-tracker-app",
    liveUrl: "",
  },
  {
    id: 20,
    title: "Browser Automation Experiments",
    description:
      "Scripts to test, analyze and interact with websites automatically, helping improve performance and reliability.",
    image: "/projects/browser-automation-experiments.jpg",
    tags: ["Selenium", "Puppeteer", "TypeScript"],
    githubUrl: "https://github.com/devbret/browser-automation-experiments",
    liveUrl: "",
  },
  {
    id: 21,
    title: "Pi-hole Data Measurement Tools",
    description:
      "A collection of various software tools for measuring DNS queries downloaded from a Pi-hole as a CSV file.",
    image: "/projects/pihole-data-measurement-tools.jpg",
    tags: ["Raspberry Pi", "Python", "D3", "OPSEC"],
    githubUrl: "https://github.com/devbret/pihole-data-measurement-tools",
    liveUrl: "",
  },
  {
    id: 22,
    title: "MCP9808 Sensor Project",
    description:
      "Code for combining a RPi Zero 2 WH with an Adafruit MCP9808 temperature sensor to measure air temperatures.",
    image: "/projects/mcp9808-sensor-project.jpg",
    tags: ["Raspberry Pi", "Flask", "JavaScript"],
    githubUrl: "https://github.com/devbret/mcp9808-sensor-project",
    liveUrl: "",
  },
  {
    id: 23,
    title: "Homelab Documentation",
    description:
      "Documentation for a self-hosted Kubernetes homelab running Mistral-7B, with Pi-hole and OPNsense.",
    image: "/projects/homelab.jpg",
    tags: ["Shell", "Docker", "AI", "Networking"],
    githubUrl: "https://github.com/devbret/homelab",
    liveUrl: "",
  },
  {
    id: 24,
    title: "GeoSpy API Mapping Application",
    description:
      "Query the GeoSpy API for images using Python. Then visualize that data with D3.",
    image: "/projects/geospy-api-mapping.jpg",
    tags: ["AI", "Python", "D3", "OSINT"],
    githubUrl: "https://github.com/devbret/geospy-api-mapping",
    liveUrl: "",
  },
  {
    id: 25,
    title: "OSINT Keyword Searches",
    description:
      "Build and organize your OSINT searches on different platforms, including Google, Reddit, YouTube and Bluesky.",
    image: "/projects/osint-keyword-searches.jpg",
    tags: ["Flask", "JavaScript", "Quantified Self"],
    githubUrl: "https://github.com/devbret/osint-keyword-searches",
    liveUrl: "",
  },
  {
    id: 26,
    title: "Username Availability Checker",
    description:
      "Check the availability of a username across twenty popular social media platforms.",
    image: "/projects/username-availability-checker.jpg",
    tags: ["Python", "JavaScript", "Social Media"],
    githubUrl: "https://github.com/devbret/username-availability-checker",
    liveUrl: "",
    category: "",
  },
  {
    id: 27,
    title: "Web Content Finder",
    description:
      "Visits each result's landing page, scrapes the readable text and saves it all to an output folder.",
    image: "/projects/web-content-finder.jpg",
    tags: ["Claude", "Google", "BeautifulSoup"],
    githubUrl: "https://github.com/devbret/web-content-finder",
    liveUrl: "",
    category: "",
  },
  {
    id: 28,
    title: "Anthropic News Bot",
    description:
      "Explores topics by using Anthropic's Claude model and surfaces the most significant stories in a dashboard.",
    image: "/projects/anthropic-news-bot.jpg",
    tags: ["Claude", "NewsAPI", "GNews", "Python"],
    githubUrl: "https://github.com/devbret/anthropic-news-bot",
    liveUrl: "",
    category: "",
  },
];
