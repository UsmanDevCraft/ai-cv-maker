export interface WorkExperience {
  company: string;
  role: string;
  duration?: string | null;
  bullet_points: string[];
}

export interface ResumeLink {
  type?: string | null;
  text?: string | null;
  url?: string | null;
}

export interface Education {
  institution: string;
  degree: string;
  duration?: string | null;
}

export interface Project {
  name: string;
  description?: string | null;
  technologies: string[];
  duration?: string | null;
  link?: string | null;
}

export interface Certification {
  name: string;
  issuer?: string | null;
  year?: string | null;
}

export interface Award {
  title: string;
  issuer?: string | null;
  year?: string | null;
}

export interface Publication {
  title: string;
  publisher?: string | null;
  year?: string | null;
  link?: string | null;
}

export interface VolunteerExperience {
  organization?: string | null;
  role?: string | null;
  duration?: string | null;
  bullet_points: string[];
}

export interface Language {
  language: string;
  proficiency?: string | null;
}

export interface TailoredCV {
  full_name: string;
  email: string;
  phone: string;
  links: ResumeLink[];
  professional_summary: string;
  skills: string[];
  technical_skills: string[];
  soft_skills: string[];
  tools_and_technologies: string[];
  experience: WorkExperience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
  volunteer_experience: VolunteerExperience[];
  languages: Language[];
}

export interface ResumeAnalytics {
  ats_score: number;
  resume_parse_rate: number;
  keyword_match: number;
  experience_relevance: number;
  overall_job_match: number;
}

export interface FinalTailoredOutput {
  cv: TailoredCV;
  cover_letter: string;
  analytics: ResumeAnalytics;
}

export interface CoverLetterDocumentProps {
  cv: TailoredCV;
  coverLetterText: string;
}

export interface PDFPreviewPanelProps {
  cv: TailoredCV;
  coverLetterText: string;
  activePreviewTab: "cv" | "cl";
}

export type Props = {
  rotateDepth?: number;
  translateDepth?: number;
  glareOpacity?: number;
  scaleFactor?: number;
  className?: string;
  children: React.ReactNode;
};
