export interface Profile {
  name: string;
  roles: string[];
  tagline: string;
  education: {
    degree: string;
    institution: string;
    expectedGraduation: string;
  };
  github: string;
  email: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Technology {
  label: string;
  category?: string;
}

export type ProjectId =
  | "orion"
  | "hearttune"
  | "nisf"
  | "ahal"
  | "prysm"
  | "bhoomi"
  | "minchal";

export interface ProjectLinks {
  github?: string;
  liveUrl?: string;
  caseStudyHref?: string;
}

export interface Project {
  id: ProjectId;
  name: string;
  /** Concise product line. Empty when undocumented — never fabricated. */
  tagline: string;
  /** 1–2 sentences of verified context. Empty when undocumented. */
  description: string;
  /** Accurate category only. Empty when unknown. */
  category: string;
  /** Verified technologies/capabilities, display-priority ordered. */
  technologies: string[];
  featured?: boolean;
  /** Only populated with real destinations. */
  links?: ProjectLinks;
}
