import 'server-only';

import type { Course, Notice } from './db-service';
import { getCourseById, getCourses, getNotices } from './db-service';

export async function getPublicCourses(): Promise<Course[]> {
  return getCourses();
}

export async function getPublicCourseById(id: string): Promise<Course | null> {
  return getCourseById(id);
}

export async function getPublicNotices(): Promise<Notice[]> {
  return getNotices();
}
