export const weekdays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
export const months = [
    'January',
    'Febraury',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const minDate = new Date(2018, 1, 1); // Min date
export const maxDate = new Date(2050, 6, 3); // Max date

export const TH = 'th-TH';
export const EN = 'en-US';

export const now = new Date();
export const year = now.getFullYear();
export const month = now.getMonth();
export const day = now.getDate();
export const maxSelect = new Date(year, month, day) // + 1 YEAR
export const minSelect = new Date(year - 80, month, day) // - 80 YEAR