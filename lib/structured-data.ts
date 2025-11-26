/**
 * 生成组织结构化数据（JSON-LD）
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: '西浦微系统课题组',
    alternateName: 'XJTLU Microsystems Research Group',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/hero-image1.png`,
    description: '西浦微系统课题组由宋鹏飞教授领导，致力于微纳米技术、生物传感器、微流控平台和自动化控制技术的前沿研究。',
    foundingDate: '2018',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
      addressLocality: '苏州',
      addressRegion: '江苏省',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'Pengfei.Song@xjtlu.edu.cn',
      contactType: 'Research Inquiries',
    },
    member: {
      '@type': 'Person',
      name: 'Pengfei Song',
      jobTitle: 'Assistant Professor',
      email: 'Pengfei.Song@xjtlu.edu.cn',
    },
  };
}

/**
 * 生成文章结构化数据（用于发表作品）
 */
export function generateArticleSchema(publication: {
  title: string;
  description: string;
  authors: string[];
  year: string;
  link?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    description: publication.description,
    author: publication.authors.map((author) => ({
      '@type': 'Person',
      name: author,
    })),
    datePublished: publication.year,
    url: publication.link,
  };
}






