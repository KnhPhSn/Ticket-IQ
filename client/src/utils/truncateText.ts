/**
 * Truncates text to a specified maximum length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation (default: 100)
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
