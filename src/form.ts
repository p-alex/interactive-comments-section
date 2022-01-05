import { createButton, createCommentElement } from "./comment/commentBox.js";
import {
  addCommentLocalStorageUpdate,
  getDataFromLocalStorage,
} from "./handleLocalStorage.js";
import { dataInterface } from "./interfaces/index.js";
import { mainContainer, mainFormContainer } from "./main.js";
import { randomIdGenerator } from "./randomIdGenerator.js";

const data: dataInterface | null = getDataFromLocalStorage()!;

export const createForm = ({
  textareaPlaceholder,
  btnText,
  submitFunc,
  withCancel,
}: {
  textareaPlaceholder: string;
  btnText: string;
  submitFunc: any;
  withCancel: boolean;
}): Element => {
  const form = document.createElement("div") as HTMLDivElement;
  form.classList.add("form");
  form.innerHTML = `
      <img src="./images/avatars/image-juliusomo.png" alt="" width="45" height="45" />
      <div class="form__topFocusTrap"></div>
      <textarea class="form__text" aria-label="${textareaPlaceholder}" placeholder="${textareaPlaceholder}" id="form-content"></textarea>
      <div class="form__btnsContainer">
        <button class="form__submitBtn">${btnText}</button>
      </div>
      <div class="form__bottomFocusTrap"></div>
    `;

  if (withCancel) {
    const btnsContainer = form.querySelector(
      ".form__btnsContainer"
    ) as HTMLDivElement;
    const cancelBtn = createButton({
      text: "Cancel",
      withIcon: false,
      btnStyle: "normal",
    });
    cancelBtn.addEventListener("click", () => form.remove());
    btnsContainer.appendChild(cancelBtn);

    const topFocusTrap = form.querySelector(
      ".form__topFocusTrap"
    ) as HTMLDivElement;
    topFocusTrap.tabIndex = 0;

    const bottomFocusTrap = form.querySelector(
      ".form__bottomFocusTrap"
    ) as HTMLDivElement;
    bottomFocusTrap.tabIndex = 0;
  }

  const formSubmitBtn = form.querySelector(
    ".form__submitBtn"
  ) as HTMLButtonElement;
  formSubmitBtn.addEventListener("click", submitFunc);
  return form;
};

export const appendForm = ({
  appendFormTo,
  formToAppend,
}: {
  appendFormTo: Element;
  formToAppend: Element;
}) => {
  appendFormTo.appendChild(formToAppend);
  applyFocusTrap(formToAppend);
};

export const addNewComment = (): void => {
  const formContent = mainFormContainer.querySelector(
    "#form-content"
  ) as HTMLTextAreaElement;
  if (formContent.value.trim()) {
    const randomId = randomIdGenerator();
    const comment = createCommentElement(
      randomId,
      0,
      data.currentUser.image.png,
      data.currentUser.username,
      new Date().toLocaleDateString(),
      formContent.value,
      [],
      data.currentUser,
      "normal"
    );
    mainContainer.appendChild(comment);

    // Reset text area
    const formTextArea = mainFormContainer.querySelector(
      ".form__text"
    ) as HTMLTextAreaElement;
    addCommentLocalStorageUpdate(
      {
        id: randomId,
        content: formContent.value,
        createdAt: new Date().toLocaleDateString(),
        user: data.currentUser,
        replies: [],
        score: 0,
      },
      false,
      ""
    );
    formTextArea.value = "";
  }
};

const applyFocusTrap = (form: Element) => {
  const topFocusTrap = form.querySelector(
    ".form__topFocusTrap"
  ) as HTMLDivElement;
  const bottomFocusTrap = form.querySelector(
    ".form__bottomFocusTrap"
  ) as HTMLDivElement;
  const firstFocusableElement = form.querySelector(
    ".form__text"
  ) as HTMLTextAreaElement;
  const lastFocusableElement = form.querySelector(
    ".normal"
  ) as HTMLButtonElement;

  topFocusTrap.addEventListener("focus", () => lastFocusableElement.focus());
  bottomFocusTrap.addEventListener("focus", () =>
    firstFocusableElement.focus()
  );
};
