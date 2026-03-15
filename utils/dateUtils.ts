/**
 * Utility functions for date handling and content filtering.
 * Uses dayjs for reliable, consistent date parsing and formatting.
 */

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/** Supported date input formats */
const DATE_FORMATS = ['YYYY-MM-DD', 'MM/DD/YYYY'];

/**
 * Parse a date string using the known supported formats.
 * Returns an invalid dayjs object if no format matches.
 */
const parseDate = (dateString: string): dayjs.Dayjs =>
    dayjs(dateString, DATE_FORMATS, /* strict= */ true);

/**
 * Check if a date string is expired (past end of today).
 * @param dateString - Date string in format 'YYYY-MM-DD' or 'MM/DD/YYYY'
 * @returns true if expired or unparseable, false if still valid
 */
export const isExpired = (dateString: string): boolean => {
    if (!dateString) {
        return true;
    }
    const date = parseDate(dateString);
    if (!date.isValid()) {
        return true;
    }
    // Expired only if the date is strictly before today (day granularity).
    // A flyer with validTo = today is still considered valid.
    return date.isBefore(dayjs(), 'day');
};

/**
 * Filter out expired items from an array.
 * @param items - Array of items with a date field
 * @param validToField - Name of the field that holds the expiration date
 * @returns Filtered array containing only non-expired items
 */
export const filterExpiredContent = <T extends Record<string, any>>(
    items: T[],
    validToField: string = 'validTo',
): T[] => {
    if (!Array.isArray(items)) {
        return [];
    }
    return items.filter(item => !isExpired(item[validToField]));
};

/**
 * Format a date string to a human-readable "MMM D, YYYY" representation
 * (e.g. "Jan 5, 2025"). Returns the original string if it cannot be parsed.
 * @param dateString - Date string in format 'YYYY-MM-DD' or 'MM/DD/YYYY'
 */
export const formatDate = (dateString: string): string => {
    if (!dateString) {
        return '';
    }
    const date = parseDate(dateString);
    return date.isValid() ? date.format('MMM D, YYYY') : dateString;
};

/**
 * Check whether content is expiring within the next 3 days.
 * @param dateString - Date string in format 'YYYY-MM-DD' or 'MM/DD/YYYY'
 * @returns true if the date falls within [today, today + 3 days]
 */
export const isExpiringSoon = (dateString: string): boolean => {
    if (!dateString) {
        return false;
    }
    const date = parseDate(dateString);
    if (!date.isValid()) {
        return false;
    }
    const today = dayjs();
    const threshold = today.add(3, 'day');
    return !date.isBefore(today, 'day') && !date.isAfter(threshold, 'day');
};
