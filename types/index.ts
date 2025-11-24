// 新闻数据类型
export interface NewsItem {
  month: string;
  category: 'research' | 'award' | 'activity';
  title: string;
  description: string;
}

export interface NewsYear {
  year: string;
  items: NewsItem[];
}

// 发表作品数据类型
export interface Publication {
  title: string;
  year: string;
  link?: string;
  description: string;
  authors: string[];
  image?: string;
}

// 团队成员数据类型
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

// 轮播图数据类型
export interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  content: string | React.ReactNode;
}

