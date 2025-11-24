import { promises as fs } from 'fs';
import path from 'path';
import { cache } from 'react';
import { Publication } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');

const readJsonFile = cache(async <T>(fileName: string): Promise<T> => {
  const filePath = path.join(DATA_DIR, fileName);
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents) as T;
});

async function loadData<T>(fileName: string, fallback: T): Promise<T> {
  try {
    return await readJsonFile<T>(fileName);
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error);
    return fallback;
  }
}

/**
 * 获取发表作品数据
 * @returns 发表作品数据数组
 */
export async function getPublicationsData(): Promise<Publication[]> {
  return loadData<Publication[]>('publications.json', []);
}

/**
 * 根据作者筛选发表作品
 * @param author 作者名称
 * @returns 筛选后的发表作品数组
 */
export async function getPublicationsByAuthor(author: string): Promise<Publication[]> {
  const publications = await getPublicationsData();
  return filterByAuthor(publications, author);
}

/**
 * 根据年份筛选发表作品
 * @param year 年份
 * @returns 筛选后的发表作品数组
 */
export async function getPublicationsByYear(year: string): Promise<Publication[]> {
  const publications = await getPublicationsData();
  return filterByYear(publications, year);
}

/**
 * 获取所有年份和作者列表（用于筛选器）
 * @returns 年份数组（降序）与作者数组（字母顺序）
 */
export async function getPublicationFacets(): Promise<{
  years: string[];
  authors: string[];
}> {
  const publications = await getPublicationsData();
  return extractPublicationFacets(publications);
}

/**
 * 获取所有年份列表（用于筛选器）
 * @returns 年份数组（降序）
 */
export async function getYearsList(): Promise<string[]> {
  const { years } = await getPublicationFacets();
  return years;
}

/**
 * 获取所有作者列表（用于筛选器）
 * @returns 作者数组（字母顺序）
 */
export async function getAuthorsList(): Promise<string[]> {
  const { authors } = await getPublicationFacets();
  return authors;
}

export function extractPublicationFacets(publications: Publication[]) {
  const years = new Set<string>();
  const authors = new Set<string>();

  publications.forEach((pub) => {
    years.add(pub.year);
    pub.authors.forEach((author) => authors.add(author.trim()));
  });

  return {
    years: Array.from(years).sort((a, b) => b.localeCompare(a)),
    authors: Array.from(authors).sort(),
  };
}

function filterByAuthor(publications: Publication[], author: string) {
  const normalized = author.toLowerCase();
  return publications.filter((pub) =>
    pub.authors.some((a) => a.toLowerCase().includes(normalized))
  );
}

function filterByYear(publications: Publication[], year: string) {
  return publications.filter((pub) => pub.year === year);
}
