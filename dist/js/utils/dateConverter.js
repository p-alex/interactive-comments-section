export const dateConverter = (datePosted) => {
    const currentDate = Date.now();
    const diff = currentDate - datePosted;
    const msInADay = 1000 * 3600 * 24;
    const resultInDays = diff / msInADay;
    const resultInHours = resultInDays * 24;
    const resultInMinutes = resultInHours * 60;
    const resultInMonths = resultInDays / 30;
    const resultInYears = resultInDays / 365;
    if (resultInMinutes < 1) {
        return "Just now";
    }
    if (resultInMinutes >= 1 && resultInMinutes < 60) {
        const convertedDate = Math.floor(resultInMinutes);
        return `${convertedDate} ${convertedDate === 1 ? "minute" : "minutes"} ago`;
    }
    if (resultInHours >= 1 && resultInHours < 24) {
        const convertedDate = Math.floor(resultInHours);
        return `${convertedDate} ${convertedDate === 1 ? "hour" : "hours"} ago`;
    }
    if (resultInDays >= 1 && resultInDays < 30) {
        const convertedDate = Math.floor(resultInDays);
        return `${convertedDate} ${convertedDate === 1 ? "day" : "days"} ago`;
    }
    if (resultInMonths >= 1 && resultInMonths < 12) {
        const convertedDate = Math.floor(resultInMonths);
        return `${convertedDate} ${convertedDate === 1 ? "month" : "months"} ago`;
    }
    if (resultInYears >= 1) {
        const convertedDate = Math.floor(resultInYears);
        return `${convertedDate} ${convertedDate === 1 ? "year" : "years"} ago`;
    }
    return "";
};
