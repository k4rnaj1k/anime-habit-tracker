'use client'

const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export const getISODate = (date?: Date | string) => {
    if (date instanceof Date) {
        return formatDate(date);
    }
    return formatDate(date && new Date(date) || new Date());
};