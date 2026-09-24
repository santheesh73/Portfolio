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


export interface EngineeringPrinciple {
  index: string;
  label: string;
  title: string;
  description: string;
}


export interface SkillItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  projects?: string[];
  featured?: boolean;
}

export interface SkillGroupData {
  id: string;
  index: string;
  title: string;
  tagline: string;
  items: SkillItem[];
}

export type ProofCategory = "hackathon" | "open-source" | "milestone";

export interface ProofItem {
  id: string;
  category: ProofCategory;
  title: string;
  /** Year or event label, only when verified. Omitted otherwise. */
  year?: string;
  organization?: string;
  theme?: string;
  description: string;
  /** References an existing project — never duplicated content. */
  relatedProject?: ProjectId;
  /** Verified URLs only. */
  href?: string;
}

export * from "./exhibition";
