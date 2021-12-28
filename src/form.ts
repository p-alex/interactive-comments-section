import { createCommentElement } from "./commentBox.js";
import { data, mainContainer } from "./main.js";

const formContainer = document.querySelector(
  ".form__container"
) as HTMLDivElement;

export const appendForm = (): void => {
  const form = document.createElement("div") as HTMLDivElement;

  form.classList.add("form");

  form.innerHTML = `
      <img src="./images/avatars/image-juliusomo.png" alt="" width="45" height="45" />
      <textarea class="form__text" aria-label="Write a comment" placeholder="Add a comment..." id="form-content"></textarea>
      <button class="form__submitBtn" type="submit">Send</button>
    `;

  const submitBtn = form.querySelector(".form__submitBtn") as HTMLButtonElement;

  const formContent = form.querySelector(
    "#form-content"
  ) as HTMLTextAreaElement;

  if (formContent !== null) {
    submitBtn.addEventListener("click", () => addNewComment(formContent.value));
  }

  formContainer.appendChild(form);
};

const addNewComment = (content: string): void => {
  if (content) {
    const comment = createCommentElement(
      0,
      data.currentUser.image.png,
      data.currentUser.username,
      new Date().toLocaleDateString(),
      content,
      [],
      data.currentUser
    );
    mainContainer.appendChild(comment);

    // Reset text area
    const formTextArea = formContainer.querySelector(
      ".form__text"
    ) as HTMLTextAreaElement;
    formTextArea.value = "";
  }
};
