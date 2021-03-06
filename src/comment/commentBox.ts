import { scoreCommentLocalStorageUpdate } from "../handleLocalStorage/scoreCommentLocalStorageUpdate";
import { handleScoreChange } from "../handleScoreChange";
import {
  replyInterface,
  scoreInterface,
  userInterface,
} from "../interfaces/index";
import { dateConverter } from "../utils/dateConverter";
import { activateConfirmDeleteModal } from "./deleteComment";
import { editComment } from "./editComment";
import { replyToComment } from "./replyToComment";

export const createCommentElement = ({
  id,
  score,
  userImage,
  username,
  createdAt,
  content,
  replies,
  currentUser,
  typeOfComment,
  replyingTo,
}: {
  id: string;
  score: number;
  userImage: string;
  username: string;
  createdAt: number;
  content: string;
  replies: replyInterface[];
  currentUser: userInterface;
  typeOfComment: "normal" | "reply";
  replyingTo: string;
}): HTMLDivElement => {
  const container = document.createElement("div") as HTMLDivElement;
  container.classList.add("commentBox__container");
  container.id = id;
  if (typeOfComment === "reply") container.classList.add("reply-comment");
  const template = `
    <div class="commentBox">
      <div class="commentBox__rate">
          <button class="commentBox__rateBtn upvote-btn" aria-label="Upvote comment">
            <img src="./images/icon-plus.svg" alt="" width='10' height='10' alt=''/>
          </button>
          <p class="commentBox__likes">${score}</p>
          <button class="commentBox__rateBtn downvote-btn" aria-label="Downvote comment">
            <img src="./images/icon-minus.svg" alt="" width='10' height='3' alt=''/>
          </button>
      </div>
      <div class="commentBox__body">
          <div class="commentBox__topBar">
            <div class="commentBox__userDetails">
                <img class="commentBox__profilePicture" src="${userImage}" alt="${username}" width="35" height="35"/>
                <div class='commentBox__usernameAndDate'>
                  <p class="commentBox__usernameAndBadge"><span class='commentBox__username'>${username}</span> 
                    ${
                      username === currentUser.username
                        ? "<span class='commentBox__badge'>you</span>"
                        : ""
                    }
                  </p>
                  <p class="commentBox__commentDate">${dateConverter(
                    createdAt
                  )}</p>
                </div>
            </div>
            <div class="commentBox__btns"></div>
          </div>
          <p class="commentBox__text">
            ${
              typeOfComment === "reply"
                ? `<span class="commentBox__replyToUser">@${replyingTo} </span>`
                : ""
            }<span id="comment-text"></span>
          </p>
      </div>
    </div>
    <div class="commentBox__replyFormContainer"></div>
    <div class="commentBox__replyContainer">
    <div class="commentBox__helperLine"></div>
      <div class="commentBox__replyCommentsContainer"></div>
    </div>
    `;

  container.innerHTML = template;

  const rateContainer = container.querySelector(
    ".commentBox__rate"
  ) as HTMLDivElement;

  const upvoteBtn = rateContainer?.querySelector(
    `.upvote-btn`
  ) as HTMLButtonElement;

  const downvoteBtn = rateContainer.querySelector(
    `.downvote-btn`
  ) as HTMLButtonElement;

  const scoreParagraph = rateContainer.querySelector(
    ".commentBox__likes"
  ) as HTMLParagraphElement;

  const commentUsername = container.querySelector(".commentBox__username")
    ?.textContent!;

  currentUser.scored.forEach((score: scoreInterface): void => {
    if (score.id === id) {
      if (score.scoreType === "upvote") {
        upvoteBtn.classList.add("btn-active");
        return;
      }
      downvoteBtn.classList.add("btn-active");
    }
  });

  if (commentUsername === currentUser.username) {
    upvoteBtn.disabled = true;
    downvoteBtn.disabled = true;
  } else {
    upvoteBtn.addEventListener("click", (): void => {
      handleScoreChange({
        elementToChange: scoreParagraph,
        commentId: container.id,
        scoreType: "upvote",
        commentType: typeOfComment,
        upvoteBtn,
        downvoteBtn,
      });
      scoreCommentLocalStorageUpdate({
        scoreType: "upvote",
        commentId: container.id,
        isReply: typeOfComment === "reply",
      });
    });

    downvoteBtn.addEventListener("click", (): void => {
      handleScoreChange({
        elementToChange: scoreParagraph,
        commentId: container.id,
        scoreType: "downvote",
        commentType: typeOfComment,
        upvoteBtn,
        downvoteBtn,
      });
      scoreCommentLocalStorageUpdate({
        scoreType: "downvote",
        commentId: container.id,
        isReply: typeOfComment === "reply",
      });
    });
  }

  // Adding Reply, Delete, and Edit buttons based on currentUser
  const commentBoxBtns = container.querySelector(
    ".commentBox__btns"
  ) as HTMLDivElement;

  if (currentUser.username === username) {
    commentBoxBtns!.appendChild(
      createButton({ text: "Delete", withIcon: true, btnStyle: "normal" })
    );
    commentBoxBtns!.appendChild(
      createButton({ text: "Edit", withIcon: true, btnStyle: "normal" })
    );
  } else {
    commentBoxBtns!.appendChild(
      createButton({ text: "Reply", withIcon: true, btnStyle: "normal" })
    );
  }

  // Adding comment text using textContent for security
  container.querySelector("#comment-text")!.textContent += content;

  // Adding replies if the comment has any
  if (replies.length) {
    const repliesContainer = container.querySelector(
      ".commentBox__replyCommentsContainer"
    ) as HTMLDivElement;
    replies.forEach((reply: replyInterface): void => {
      repliesContainer.appendChild(
        createCommentElement({
          id: reply.id,
          score: reply.score,
          userImage: reply.user.image.png,
          username: reply.user.username,
          createdAt: reply.createdAt,
          content: reply.content,
          replies: [],
          currentUser,
          typeOfComment: "reply",
          replyingTo: reply.replyingTo,
        })
      );
    });
  }

  return container;
};

interface createButtonInterface {
  text: string;
  withIcon: boolean;
  btnStyle: "fill" | "normal";
}
export const createButton = ({
  text,
  withIcon,
  btnStyle,
}: createButtonInterface): HTMLButtonElement => {
  const button = document.createElement("button") as HTMLButtonElement;
  button.classList.add("commentBox__btn");

  button.classList.add(`${text.toLowerCase()}-btn`);

  // Applying button style
  button.classList.add(btnStyle === "fill" ? "fill" : "normal");

  button.title = text;

  // Add icon if true
  if (withIcon) {
    button.innerHTML = `
    <img src="./images/icon-${text.toLowerCase()}.svg" alt="" width="15" height="15" />
    <span>${text}</span>
  `;
  } else {
    button.innerText = text;
  }

  // Buttons with text 'reply', 'delete' and 'edit' have functions
  // assigned by default
  if (text === "Reply") button.addEventListener("click", replyToComment);
  if (text === "Delete")
    button.addEventListener("click", activateConfirmDeleteModal);
  if (text === "Edit") button.addEventListener("click", editComment);

  return button;
};
