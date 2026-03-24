export interface Project {
  title: string;
  role: string;
  description: string;
  summary: string;
  impact: string[];
  stack: string[];
  highlights: string[];
  images: string[];
  gradient?: string;
  link?: string;
  repo?: string;
}

export interface Award {
  title: string;
  detail: string;
}

export interface ExperienceItem {
  org: string;
  role: string;
  period: string;
  location: string;
  description: string;
}

export const profile = {
  name: "Arnav Sharma",
  tagline: "Builder · Founder · Engineer",
  email: "arnavsharma0904@gmail.com",
  phone: "(630) 945-1304",
  location: "Naperville, IL",
  github: "https://github.com/ArnavSharma0904",
  linkedin: "https://linkedin.com/in/arnavsharma0904",
};

export const skills = {
  languages: ["Python", "Java", "TypeScript", "JavaScript", "HTML/CSS"],
  tools: [
    "React",
    "Tailwind CSS",
    "MongoDB",
    "GitHub",
    "Figma",
    "Excel",
    "Tableau",
  ],
  soft: ["Public Speaking", "Leadership", "Project Management"],
};

export const projects: Project[] = [
  {
    title: "BizBuzz NFP",
    role: "Executive Director & CTO",
    summary:
      "Nonprofit empowering 650+ students with entrepreneurship & financial literacy.",
    description:
      "Co-founded and scaled a nonprofit that teaches entrepreneurship and financial literacy to high school students across Naperville. Built the full tech stack — website, registration system, and curriculum platform — while leading camps, pitch competitions, and sponsor outreach that secured 40+ local organization partnerships and raised over $10K.",
    impact: ["650+ students", "$10K+ raised", "40+ partners"],
    stack: ["React", "TypeScript", "Tailwind CSS", "MongoDB"],
    highlights: [
      "Built website, registration, and curriculum tools from scratch",
      "Led camps, pitch competitions, and sponsor outreach",
      "Scaled programming across multiple schools in District 203",
    ],
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    ],
    gradient: "linear-gradient(135deg, #10b981, #059669)",
  },
  {
    title: "Decademy",
    role: "Co-Founder",
    summary:
      "AI-powered DECA prep platform reaching 10,000+ students in 50+ countries.",
    description:
      "Built an AI-powered DECA/CTSO preparation platform that has scaled to 10,000+ students in over 50 countries. Designed analytics dashboards that track student progress and interactive roleplay simulations that mimic real competition scenarios, leading to measurable improvement in competition performance and user retention.",
    impact: ["10,000+ students", "50+ countries", "AI-powered prep"],
    stack: ["TypeScript", "React", "AI/ML", "Analytics"],
    highlights: [
      "Designed analytics dashboards for student progress tracking",
      "Built interactive roleplay simulations for competition prep",
      "Scaled to global user base across 50+ countries",
    ],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    ],
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  },
  {
    title: "Shadowed.me",
    role: "Co-Founder",
    summary:
      "District 203's official clubs platform — 2,400+ students, 140+ clubs.",
    description:
      "Developed the official clubs and activities platform for Naperville District 203, serving 2,400+ students and 140+ clubs. Automated calendar management, announcement workflows, and captain/advisor tools — replacing scattered spreadsheets with a unified district-wide system.",
    impact: ["2,400+ students", "140+ clubs", "District-wide"],
    stack: ["TypeScript", "React", "Tailwind CSS"],
    highlights: [
      "Developed district-wide platform adopted officially by D203",
      "Automated captain and advisor workflows",
    ],
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
    ],
    gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
  },
  {
    title: "Eyerobic",
    role: "Technical Director",
    summary:
      "World's first assistive headband for visually impaired athletes — $916K+ in scholarships & funding.",
    description:
      "Led technical development of Eyerobic — the world's first assistive headband that allows visually impaired people to exercise safely and independently. Built a dual-purpose system combining a 120° FOV Raspberry Pi Camera with bone-conduction headphones on a Raspberry Pi 5 platform. Developed the full CV pipeline: HSV color thresholding & contour detection for lane navigation, YOLOv11 object detection for obstacle avoidance, and PIDNet semantic segmentation for trail awareness — trained on 14,000+ labeled frames. V3 guides swimmers for 175 yds and alerts runners of obstacles 40m away. Designed a custom PCB at $31.33, bringing production cost to $142.45 (retail $249). Worked with Rockwell Automation on engineering validation. Selected 1-of-25 from 1,371 entries at the Conrad Challenge Summit at NASA Space Center Houston. Filed a provisional patent. Received $916K+ in scholarships and funding, backed by WAIAI & ArentFox Schiff. Featured on NBC 5 Chicago and Naperville Magazine. Pilot tested with a user with Leber congenital amaurosis.",
    impact: ["$916K+ funding", "1 of 1,371", "14,000+ frames"],
    stack: [
      "Python",
      "YOLOv11",
      "PIDNet",
      "OpenCV",
      "Raspberry Pi 5",
      "Custom PCB",
    ],
    highlights: [
      "Built full CV pipeline — HSV thresholding, contour detection, YOLOv11, PIDNet segmentation",
      "Designed custom PCB ($31.33) — production model at $142.45, retail at $249",
      "Trained algorithm on 14,000+ labeled video frames for real-time guidance",
      "V3 guides swimmers 175 yds & alerts runners of obstacles 40m away",
      "Worked with Rockwell Automation on engineering validation",
      "1 of 25 selected from 1,371 entries — Conrad Challenge Summit at NASA",
      "Filed provisional patent — backed by WAIAI & ArentFox Schiff",
      "Featured on NBC 5 Chicago, Naperville Magazine, fundraised $40K+",
    ],
    images: [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    ],
    gradient: "linear-gradient(135deg, #2563eb, #1d4ed8)",
  },
  {
    title: "Illinois FLL",
    role: "Software Engineer Intern",
    summary:
      "Built genetic algorithm to optimize match scheduling for hundreds of FLL teams.",
    description:
      "Built a genetic algorithm that optimizes competition match scheduling for hundreds of FIRST LEGO League teams across Illinois. Presented the system to the product owner and shipped critical last-minute improvements under tight tournament deadlines.",
    impact: ["Hundreds of teams", "Shipped under deadline", "Genetic algorithm"],
    stack: ["Python", "Genetic Algorithms"],
    highlights: [
      "Presented results to product owner",
      "Shipped last-minute improvements under tournament deadline",
    ],
    images: [
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
    ],
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
  },
];

export const awards: Award[] = [
  {
    title: "State Qualifier",
    detail: "DECA (2023–25), Debate (2023–25), BPA (2023–25), HOSA (2024–25)",
  },
  {
    title: "FIRST Chairman's Award",
    detail: "FIRST Robotics World Championship Qualifier (2023–2025)",
  },
  {
    title: "Honor Roll",
    detail: "GPA 4.1/5.0 — Naperville North High School",
  },
  {
    title: "UC Berkeley Summer 2023",
    detail:
      "Quantum Computing & ML (Grade A) — Python financial risk prediction project",
  },
];

export const experience: ExperienceItem[] = [
  {
    org: "Lincoln Park Conservancy",
    role: "Data Analyst Intern",
    period: "May – Aug 2024",
    location: "Chicago, IL",
    description:
      "Cleaned/analyzed datasets in Excel/Tableau; built dashboards on visitor flow, staffing, and energy usage.",
  },
  {
    org: "Naperville North Yearbook",
    role: "Business Manager",
    period: "Aug 2024 – Present",
    location: "Naperville, IL",
    description:
      "Managed advertising sales, sponsor partnerships, and business operations for the school yearbook.",
  },
  {
    org: "Investment Club",
    role: "Vice President",
    period: "Aug 2023 – Present",
    location: "Naperville, IL",
    description:
      "Run weekly meetings and speaker events; built stock simulations and introduced the Penn Data Science Challenge team.",
  },
  {
    org: "Huskie Robotics (Team 3061)",
    role: "Media Manager",
    period: "Aug 2022 – Present",
    location: "Naperville, IL",
    description:
      "Managed branding and sponsor outreach; supported Chairman's Award submissions and Worlds qualification.",
  },
  {
    org: "Power Up NFP",
    role: "Finance Coordinator",
    period: "May 2025 – Present",
    location: "Naperville, IL",
    description:
      "Managed budgets and donation drives; helped distribute 120+ computers and 70+ monitors to local families and nonprofits.",
  },
];
