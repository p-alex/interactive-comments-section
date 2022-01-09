import { createButton, createCommentElement } from "./comment/commentBox";
import { addCommentLocalStorageUpdate } from "./handleLocalStorage/addCommentLocalStorageUpdate";
import { getDataFromLocalStorage } from "./handleLocalStorage/getDataFromLocalStorage";
import { dataInterface } from "./interfaces/index";
import { mainContainer, mainFormContainer } from "./main";
import { randomIdGenerator } from "./randomIdGenerator";

const data: dataInterface | null = getDataFromLocalStorage()!;

export const createForm = ({
  textareaPlaceholder,
  btnText,
  submitFunc,
  cancelFunc,
  withCancel,
}: {
  textareaPlaceholder: string;
  btnText: string;
  submitFunc: any;
  cancelFunc: any;
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
    cancelBtn.addEventListener("click", () =>
      cancelFunc({ formToRemove: form })
    );
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

    const comment = createCommentElement({
      id: randomId,
      score: 0,
      userImage: data.currentUser.image.png,
      username: data.currentUser.username,
      createdAt: Date.now(),
      content: formContent.value,
      replies: [],
      currentUser: data.currentUser,
      typeOfComment: "normal",
    });
    mainContainer.appendChild(comment);

    // Reset text area
    const formTextArea = mainFormContainer.querySelector(
      ".form__text"
    ) as HTMLTextAreaElement;

    const newCommentData = {
      id: randomId,
      content: formContent.value,
      createdAt: Date.now(),
      user: data.currentUser,
      replies: [],
      score: 0,
    };

    addCommentLocalStorageUpdate({
      commentData: newCommentData,
      isReply: false,
      index: "",
    });

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
