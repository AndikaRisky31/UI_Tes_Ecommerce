export const formatCurrency = (
    amount,
    currency = import.meta.env.VITE_CURRENCY || 'USD',
    locale = import.meta.env.VITE_LOCALE || 'en-US'
) => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(amount);
};
