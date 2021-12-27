import { replyInterface, userInterface } from "./interfaces/index";

export const createCommentElement = (
  likes: number,
  userImage: string,
  username: string,
  createdAt: string,
  content: string,
  replies: replyInterface[],
  currentUser: userInterface
): Element => {
  const container = document.createElement("div") as any;
  container.classList.add("commentBox__container");
  const template = `
    <div class="commentBox">
      <div class="commentBox__rate">
          <button class="commentBox__rateBtn" aria-label="Like comment">
          <img src="./images/icon-plus.svg" alt="" />
          </button>
          <p class="commentBox__likes">${likes}</p>
          <button class="commentBox__rateBtn" aria-label="Dislike comment">
          <img src="./images/icon-minus.svg" alt="" />
          </button>
      </div>
      
      <div class="commentBox__body">
          <!-- COMMENT BOX TOP BAR -->
          <div class="commentBox__topBar">
          <div class="commentBox__userDetails">
              <img
              class="commentBox__profilePicture"
              src="${userImage}"
              alt=""
              width="35"
              height="35"
              />
              <div class='commentBox__usernameAndDate'>
                <p class="commentBox__username">${username}</p>
                <p class="commentBox__commentDate">${createdAt}</p>
              </div>
              
          </div>
          <!-- COMMENT BOX BUTTONS CONTAINER -->
          <div class="commentBox__btns">
            ${
              currentUser.username === username
                ? `${deleteButton()}${editButton()}`
                : `${replyButton()}`
            }
          </div>
          </div>
          <!-- COMMENT BOX TEXT -->
          <div class="commentBox__text">
              <p id="comment-text"></p>
          </div>
      </div>
    </div>
    <div class="commentBox__replyContainer" ${
      replies.length === 0 ? 'style="margin:0"' : ""
    }>
    <div class="commentBox__helperLine"></div>
      <div class="commentBox__replyCommentsContainer">
        ${replies.length ? insertReplies(replies, currentUser) : ""}
      </div>
    </div>
    `;

  container.innerHTML = template;

  container.querySelector("#comment-text").textContent = content;

  return container;
};

const insertReplies = (
  replies: replyInterface[],
  currentUser: userInterface
): string => {
  let result: string = "";
  replies.forEach((reply) => {
    const { score, user, createdAt, content } = reply;
    result += `<div class="commentBox__container">${
      createCommentElement(
        score,
        user.image.png,
        user.username,
        createdAt,
        content,
        [],
        currentUser
      ).innerHTML
    }</div>`;
  });

  return result;
};

const deleteButton = (): string => {
  return `
          <button class="commentBox__btn delete-btn" title='Delete'>
              <img src="./images/icon-delete.svg" alt="" width="15" height="15" />
              <span>Delete</span>
          </button>
      `;
};

const editButton = (): string => {
  return `
          <button class="commentBox__btn" title='Edit'>
              <img src="./images/icon-edit.svg" alt="" width="15" height="15" />
              <span>Edit</span>
          </button>
      `;
};

const replyButton = (): string => {
  return `
          <button class="commentBox__btn" title='Reply'>
              <img src="./images/icon-reply.svg" alt="" width="15" height="15" />
              <span>Reply</span>
          </button>
      `;
};
