import { createCommentElement } from "./commentBox.js";
import {
  commentsInterface,
  dataInterface,
  userInterface,
} from "./interfaces/index";

const mainContainer = document.querySelector(".container") as any;

const formContainer = document.querySelector(
  ".form__container"
) as HTMLDivElement;

// Getting data from data.json
const getData = async () => {
  const response = await fetch("data.json");
  const json = await response.json();
  return json;
};

const main = async () => {
  const { comments, currentUser }: dataInterface = await getData();

  const appendComments = (
    comments: commentsInterface[],
    currentUser: userInterface
  ) => {
    comments.forEach((comment) => {
      mainContainer.appendChild(
        createCommentElement(
          comment.score,
          comment.user.image.png,
          comment.user.username,
          comment.createdAt,
          comment.content,
          comment.replies,
          currentUser
        )
      );
    });
  };

  const appendForm = () => {
    const form = document.createElement("div") as any;

    form.classList.add("form");

    form.innerHTML = `
      <img src="./images/avatars/image-juliusomo.png" alt="" width="45" height="45" />
      <textarea class="form__text" aria-label="Write a comment" placeholder="Add a comment..." id="form-content"></textarea>
      <button class="form__submitBtn" type="submit">Send</button>
    `;

    const submitBtn = form.querySelector(
      ".form__submitBtn"
    ) as HTMLButtonElement;

    const formContent = form.querySelector(
      "#form-content"
    ) as HTMLTextAreaElement;

    if (formContent !== null) {
      submitBtn.addEventListener("click", () =>
        addNewComment(formContent.value)
      );
    }

    formContainer.appendChild(form);
  };

  const appendFooter = () => {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    footer.innerHTML = `
      <p>Developed by <a href="https://github.com/p-alex" rel="noopener" target="_blank">Alex Daniel</a>.</p>
    `;
    document.body.appendChild(footer);
  };

  const addNewComment = (content: string) => {
    if (content) {
      const comment = createCommentElement(
        0,
        currentUser.image.png,
        currentUser.username,
        new Date().toLocaleDateString(),
        content,
        [],
        currentUser
      );
      mainContainer.appendChild(comment);

      // Reset text area
      const formTextArea = formContainer.querySelector(
        ".form__text"
      ) as HTMLTextAreaElement;
      formTextArea.value = "";
    }
  };

  appendComments(comments, currentUser);
  appendForm();
  appendFooter();
};

main();
