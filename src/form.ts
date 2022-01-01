import { createButton, createCommentElement } from "./commentBox.js";
import {
  addCommentLocalStorageUpdate,
  data,
  mainContainer,
  mainFormContainer,
  randomIdGenerator,
} from "./main.js";

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
      <textarea class="form__text" aria-label="${textareaPlaceholder}" placeholder="${textareaPlaceholder}" id="form-content"></textarea>
      <div class="form__btnsContainer">
        <button class="form__submitBtn">${btnText}</button>
      </div>
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
};

export const addNewComment = (): void => {
  const formContent = mainFormContainer.querySelector(
    "#form-content"
  ) as HTMLTextAreaElement;
  if (formContent.value) {
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
