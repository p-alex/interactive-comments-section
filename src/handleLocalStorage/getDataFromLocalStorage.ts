import { dataInterface } from "../interfaces/index";

export const getDataFromLocalStorage = (): dataInterface | null => {
  if (JSON.parse(window.localStorage.getItem("data")!) === null) {
    return null;
  } else {
    return JSON.parse(window.localStorage.getItem("data")!);
  }
};
