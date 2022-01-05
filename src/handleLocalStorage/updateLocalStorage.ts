import { dataInterface } from "../interfaces/index";

export const updateLocalStorage = (newData: dataInterface) => {
  window.localStorage.setItem("data", JSON.stringify(newData));
};
