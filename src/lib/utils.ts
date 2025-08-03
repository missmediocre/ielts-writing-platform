import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getBandColor(band: number) {
  if (band >= 8.0) return 'text-emerald-600';
  if (band >= 7.0) return 'text-green-600';
  if (band >= 6.0) return 'text-blue-600';
  if (band >= 5.0) return 'text-yellow-600';
  return 'text-red-600';
}

export function getBandLevel(band: number) {
  if (band >= 8.0) return 'Excellent';
  if (band >= 7.0) return 'Good';
  if (band >= 6.0) return 'Competent';
  if (band >= 5.0) return 'Modest';
  return 'Limited';
}

export function calculateReadingTime(wordCount: number) {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}