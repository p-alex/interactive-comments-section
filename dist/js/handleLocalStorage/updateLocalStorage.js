export const updateLocalStorage = (newData) => {
    window.localStorage.setItem("data", JSON.stringify(newData));
};
