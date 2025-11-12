import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind CSS classes.
 *
 * @param {...ClassValue[]} inputs - An array of class values to be combined and merged.
 * @returns {string} The combined and merged class names.
 */
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export { cn };
