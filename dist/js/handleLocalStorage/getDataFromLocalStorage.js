export const getDataFromLocalStorage = () => {
    if (JSON.parse(window.localStorage.getItem("data")) === null) {
        return null;
    }
    else {
        return JSON.parse(window.localStorage.getItem("data"));
    }
};
