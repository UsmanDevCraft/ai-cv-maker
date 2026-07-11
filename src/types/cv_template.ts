export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  bullet_points: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
}

export interface TailoredCV {
  full_name: string;
  email: string;
  phone: string;
  links: string[];
  professional_summary: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
}

export interface FinalTailoredOutput {
  cv: TailoredCV;
  cover_letter: string;
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
