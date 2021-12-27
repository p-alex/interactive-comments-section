import { createCommentElement } from "./commentBox.js";
import {
  commentsInterface,
  dataInterface,
  userInterface,
} from "./interfaces/index";

const mainContainer = document.querySelector(".container") as any;

const getData = async () => {
  const response = await fetch("data.json");
  const json = await response.json();
  return json;
};

const main = async () => {
  const { comments, currentUser }: dataInterface = await getData();
  let stringg = "wow this is awesome @alex";
  // let regExp = /(@[a-z]+)/g;
  // stringg.replace(regExp, "<b>$1</b>");
  // console.log(stringg.replace(regExp, "<b>$1</b>"));
  let regExp: any = /(@[a-z]+)/g;
  appendComments(comments, currentUser);
  appendForm();
  appendFooter();
};

const appendComments = (
  comments: commentsInterface[],
  currentUser: userInterface
) => {
  comments.forEach((comment) => {
    const { score, createdAt, content, replies } = comment;
    const { username, image } = comment.user;
    mainContainer.appendChild(
      createCommentElement(
        score,
        image.png,
        username,
        createdAt,
        content,
        replies,
        currentUser
      )
    );
  });
};

const appendForm = () => {
  const form = document.createElement("form");
  form.classList.add("form");
  form.innerHTML = `
  <img
    src="./images/avatars/image-juliusomo.png"
    alt=""
    width="45"
    height="45"
  />
  <textarea
    class="form__text"
    aria-label="Write a comment"
    placeholder="Add a comment..."
  ></textarea>
  <button class="form__submitBtn" type="submit">Send</button>`;
  mainContainer.appendChild(form);
};

const appendFooter = () => {
  const footer = document.createElement("footer");
  footer.classList.add("footer");
  footer.innerHTML = `
    <p>
      Developed by <a href="https://github.com/p-alex" rel="noopener" target="_blank">Alex Daniel</a>.
    </p>
  `;
  document.body.appendChild(footer);
};

main();
