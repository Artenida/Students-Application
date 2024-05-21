/**
 * Formats the date part of an ISO 8601 timestamp.
 * @param {string} isoTimestamp - The ISO 8601 timestamp.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (isoTimestamp: string): string => {
    const date = new Date(isoTimestamp);
    return new Intl.DateTimeFormat('en-US').format(date);
  };
  