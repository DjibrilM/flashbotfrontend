


export const formatDate = (date: string): string => {
    const unformatedDate = new Date(date);
    const getDay = unformatedDate.toLocaleString('default', { weekday: 'long' });
    const getMonth = unformatedDate.toLocaleString('default', { month: 'long' });
    const getYearh = unformatedDate.getFullYear();

    return `${getDay}/ ${getMonth} /${getYearh}`;
}