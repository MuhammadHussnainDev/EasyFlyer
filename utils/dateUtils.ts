/**
 * Utility functions for date handling and content filtering
 */

/**
 * Check if a date string is expired
 * @param dateString - Date string in format 'YYYY-MM-DD' or 'MM/DD/YYYY'
 * @returns boolean - true if expired, false if still valid
 */
export const isExpired = (dateString: string): boolean => {
    if (!dateString) return true;

    try {
        let date: Date;

        // Handle different date formats
        if (dateString.includes('-')) {
            // Format: YYYY-MM-DD
            date = new Date(dateString);
        } else if (dateString.includes('/')) {
            // Format: MM/DD/YYYY
            const parts = dateString.split('/');
            if (parts.length === 3) {
                date = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
            } else {
                return true;
            }
        } else {
            return true;
        }

        // Check if date is valid
        if (isNaN(date.getTime())) {
            return true;
        }

        // Compare with current date (end of day)
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        return date < today;
    } catch (error) {
        console.error('Error parsing date:', dateString, error);
        return true;
    }
};

/**
 * Filter out expired items from an array
 * @param items - Array of items with date fields
 * @param validToField - Field name that contains the expiration date
 * @returns Filtered array without expired items
 */
export const filterExpiredContent = <T extends Record<string, any>>(
    items: T[],
    validToField: string = 'validTo'
): T[] => {
    if (!Array.isArray(items)) return [];

    return items.filter(item => {
        const expirationDate = item[validToField];
        return !isExpired(expirationDate);
    });
};

/**
 * Parse date string to a more readable format
 * @param dateString - Date string
 * @returns Formatted date string or original if parsing fails
 */
export const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    try {
        let date: Date;

        if (dateString.includes('-')) {
            date = new Date(dateString);
        } else if (dateString.includes('/')) {
            const parts = dateString.split('/');
            if (parts.length === 3) {
                date = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
            } else {
                return dateString;
            }
        } else {
            return dateString;
        }

        if (isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', dateString, error);
        return dateString;
    }
};

/**
 * Check if content is expiring soon (within 3 days)
 * @param dateString - Date string
 * @returns boolean - true if expiring soon
 */
export const isExpiringSoon = (dateString: string): boolean => {
    if (!dateString) return false;

    try {
        let date: Date;

        if (dateString.includes('-')) {
            date = new Date(dateString);
        } else if (dateString.includes('/')) {
            const parts = dateString.split('/');
            if (parts.length === 3) {
                date = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
            } else {
                return false;
            }
        } else {
            return false;
        }

        if (isNaN(date.getTime())) {
            return false;
        }

        const today = new Date();
        const threeDaysFromNow = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));

        return date <= threeDaysFromNow && date >= today;
    } catch (error) {
        console.error('Error checking expiring soon:', dateString, error);
        return false;
    }
};
