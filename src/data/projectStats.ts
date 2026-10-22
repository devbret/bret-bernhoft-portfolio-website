export type ProjectStat = {
  label: string;
  value: string;
};

export type ProjectStats = {
  projectId: number;
  summary: string;
  stats: ProjectStat[];
};

export const projectStats: ProjectStats[] = [
  {
    projectId: 1,
    summary: `Transforms traffic collision data into an interactive, filterable heatmap using Python and a JavaScript frontend. In order to accomplish this the Python script processes a CSV file containing coordinates, cleans the data and outputs a JSON file with the fields required for visualization. 
    
    Next a JavaScript-based Leaflet map renders the processed data as a heat layer where intensity reflects collision severity. A control panel allows users to filter collisions by year, injury and fatality counts, weather, lighting, severity and text search. Additional controls allow users to adjust heat radius and blur, toggle the heat layer and automatically fit displayed data onto the screen.`,
    stats: [
      { label: "Lines Of Code", value: "740" },
      { label: "Started", value: "January 5th, 2026" },
      { label: "Primary Language", value: "JavaScript" },
      { label: "License Information", value: "MIT License" },
    ],
  },
  {
    projectId: 2,
    summary: "",
    stats: [],
  },
  {
    projectId: 3,
    summary: "",
    stats: [],
  },
  {
    projectId: 4,
    summary: "",
    stats: [],
  },
  {
    projectId: 5,
    summary: "",
    stats: [],
  },
  {
    projectId: 6,
    summary: "",
    stats: [],
  },
  {
    projectId: 7,
    summary: "",
    stats: [],
  },
  {
    projectId: 8,
    summary: "",
    stats: [],
  },
  {
    projectId: 9,
    summary: "",
    stats: [],
  },
  {
    projectId: 10,
    summary: "",
    stats: [],
  },
  {
    projectId: 11,
    summary: "",
    stats: [],
  },
  {
    projectId: 12,
    summary: "",
    stats: [],
  },
  {
    projectId: 13,
    summary: "",
    stats: [],
  },
  {
    projectId: 14,
    summary: "",
    stats: [],
  },
  {
    projectId: 15,
    summary: "",
    stats: [],
  },
  {
    projectId: 16,
    summary: "",
    stats: [],
  },
  {
    projectId: 17,
    summary: "",
    stats: [],
  },
  {
    projectId: 18,
    summary: "",
    stats: [],
  },
  {
    projectId: 19,
    summary: "",
    stats: [],
  },
  {
    projectId: 20,
    summary: "",
    stats: [],
  },
  {
    projectId: 21,
    summary: "",
    stats: [],
  },
  {
    projectId: 22,
    summary: "",
    stats: [],
  },
  {
    projectId: 23,
    summary: "",
    stats: [],
  },
  {
    projectId: 24,
    summary: "",
    stats: [],
  },
  {
    projectId: 25,
    summary: "",
    stats: [],
  },
  {
    projectId: 26,
    summary: "",
    stats: [],
  },
  {
    projectId: 27,
    summary: "",
    stats: [],
  },
  {
    projectId: 28,
    summary: "",
    stats: [],
  },
];
