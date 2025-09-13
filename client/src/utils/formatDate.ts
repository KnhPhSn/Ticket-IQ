/**
 * Formats an ISO date string to a readable format
 * @param isoDate - ISO date string from the server
 * @returns Formatted date string in "MM/DD/YYYY, HH:MM:SS (GMT+0)" format
 */
export const formatCreatedAt = (isoDate: string): string => {
  const date = new Date(isoDate);

  // Format: "5/29/2025, 11:53:47 (GMT+0)"
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
  };

  const formatted = date.toLocaleString('en-US', options);
  return `${formatted} (GMT+0)`;
};
