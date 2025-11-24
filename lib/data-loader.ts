import { NewsYear, Publication } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * 获取新闻数据
 * @returns 新闻数据数组
 */
export async function getNewsData(): Promise<NewsYear[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'news.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents) as NewsYear[];
  } catch (error) {
    console.error('Error loading news data:', error);
    return [];
  }
}

/**
 * 获取发表作品数据
 * @returns 发表作品数据数组
 */
export async function getPublicationsData(): Promise<Publication[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'publications.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents) as Publication[];
  } catch (error) {
    console.error('Error loading publications data:', error);
    return [];
  }
}

/**
 * 根据作者筛选发表作品
 * @param author 作者名称
 * @returns 筛选后的发表作品数组
 */
export async function getPublicationsByAuthor(author: string): Promise<Publication[]> {
  const publications = await getPublicationsData();
  return publications.filter(pub => 
    pub.authors.some(a => a.toLowerCase().includes(author.toLowerCase()))
  );
}

/**
 * 根据年份筛选发表作品
 * @param year 年份
 * @returns 筛选后的发表作品数组
 */
export async function getPublicationsByYear(year: string): Promise<Publication[]> {
  const publications = await getPublicationsData();
  return publications.filter(pub => pub.year === year);
}

/**
 * 获取所有年份列表（用于筛选器）
 * @returns 年份数组（降序）
 */
export async function getYearsList(): Promise<string[]> {
  const publications = await getPublicationsData();
  const years = new Set(publications.map(pub => pub.year));
  return Array.from(years).sort((a, b) => b.localeCompare(a));
}

/**
 * 获取所有作者列表（用于筛选器）
 * @returns 作者数组（字母顺序）
 */
export async function getAuthorsList(): Promise<string[]> {
  const publications = await getPublicationsData();
  const authors = new Set<string>();
  publications.forEach(pub => {
    pub.authors.forEach(author => authors.add(author.trim()));
  });
  return Array.from(authors).sort();
}

