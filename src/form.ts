import { createCommentElement } from "./commentBox.js";
import { data, mainContainer, mainForm } from "./main.js";

export const appendForm = ({
  appendToElement,
}: {
  appendToElement: Element;
}): void => {
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

  submitBtn.addEventListener("click", () => addNewComment(formContent.value));

  appendToElement.appendChild(form);
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
    const formTextArea = mainForm.querySelector(
      ".form__text"
    ) as HTMLTextAreaElement;
    formTextArea.value = "";
  }
};
