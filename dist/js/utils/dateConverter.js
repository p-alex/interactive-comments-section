export const dateConverter = (datePosted) => {
    const currentDate = Date.now();
    const diff = currentDate - datePosted;
    const msInADay = 1000 * 3600 * 24;
    const result = Math.floor(diff / msInADay);
    if (result >= 0 && result < 1) {
        return "Today";
    }
    if (result >= 1 && result < 30) {
        const convertedDate = Math.floor(result);
        return `${convertedDate} ${convertedDate === 1 ? "day" : "days"} ago`;
    }
    if (result >= 30 && result < 365) {
        const convertedDate = Math.floor(result / 30);
        return `${convertedDate} ${convertedDate === 1 ? "month" : "months"} ago`;
    }
    if (result >= 365) {
        const convertedDate = Math.floor(result / 365);
        return `${convertedDate} ${convertedDate === 1 ? "year" : "years"} ago`;
    }
    return "";
};
