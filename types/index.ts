import type { ReactNode } from 'react';

export interface PublicationAuthor {
  name: string;
  orcid?: string;
  isGroupMember?: boolean;
}

export interface PublicationLinks {
  doi?: string;
  openAlexId?: string;
  landingUrl?: string;
  pdfUrl?: string;
  codeUrl?: string;
}

export interface Publication {
  id: string;
  title: string;
  year: number;
  venue?: string;
  type?: string;
  tldr?: string | null;
  citationCount?: number;
  openAccess?: boolean;
  authors: PublicationAuthor[];
  links: PublicationLinks;
  source?: string;
  manualNote?: string;
}

export interface Mentor {
  name: string;
  nameEn: string;
  position: string;
  photo: string;
  bio: string;
  research: string[];
  publications: string;
  awards: string[];
  honors: string[];
  email: string;
}

export interface Student {
  name: string;
  photo: string;
  research: string;
  id?: string;
}

export interface TeamData {
  mentor: Mentor;
  students: Student[];
}

export interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  content: ReactNode;
}
