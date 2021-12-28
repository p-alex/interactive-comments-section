import { replyInterface, userInterface } from "./interfaces/index";

export const createCommentElement = (
  likes: number,
  userImage: string,
  username: string,
  createdAt: string,
  content: string,
  replies: replyInterface[],
  currentUser: userInterface
): HTMLDivElement => {
  const container = document.createElement("div") as HTMLDivElement;
  container.classList.add("commentBox__container");
  const template = `
    <div class="commentBox">
      <div class="commentBox__rate">
          <button class="commentBox__rateBtn" aria-label="Like comment">
            <img src="./images/icon-plus.svg" alt="" width='10' height='10'/>
          </button>
          <p class="commentBox__likes">${likes}</p>
          <button class="commentBox__rateBtn" aria-label="Dislike comment">
            <img src="./images/icon-minus.svg" alt="" width='10' height='3' />
          </button>
      </div>
      
      <div class="commentBox__body">
          <div class="commentBox__topBar">
            <div class="commentBox__userDetails">
                <img class="commentBox__profilePicture" src="${userImage}" alt="" width="35" height="35"/>
                <div class='commentBox__usernameAndDate'>
                  <p class="commentBox__username">${username}</p>
                  <p class="commentBox__commentDate">${createdAt}</p>
                </div>
            </div>
            <div class="commentBox__btns"></div>
          </div>
          <div class="commentBox__text">
              <p id="comment-text"></p>
          </div>
      </div>
    </div>
    <div class="commentBox__replyContainer" ${
      replies.length === 0 ? 'style="margin:0"' : ""
    }>
    <div class="commentBox__helperLine"></div>
      <div class="commentBox__replyCommentsContainer"></div>
    </div>
    `;

  container.innerHTML = template;

  // Adding Reply, Delete, and Edit buttons based on currentUser
  const commentBoxBtns = container.querySelector(".commentBox__btns");
  if (currentUser.username === username) {
    commentBoxBtns!.appendChild(createButton("Delete"));
    commentBoxBtns!.appendChild(createButton("Edit"));
  } else {
    commentBoxBtns!.appendChild(createButton("Reply"));
  }

  // Adding comment text using textContent for security
  container.querySelector("#comment-text")!.textContent = content;

  // Adding replies if the comment has any
  if (replies.length) {
    const repliesContainer = container.querySelector(
      ".commentBox__replyCommentsContainer"
    ) as HTMLDivElement;
    replies.forEach((reply) => {
      repliesContainer.appendChild(
        createCommentElement(
          reply.score,
          reply.user.image.png,
          reply.user.username,
          reply.createdAt,
          reply.content,
          [],
          currentUser
        )
      );
    });
  }

  return container;
};

const deleteComment = (event: Event): void => {
  const element = <Element>event.target;
  const parent = <HTMLDivElement>(
    element.parentNode!.parentNode!.parentNode!.parentNode!.parentNode!
  );
  parent.remove();
};

const editComment = (): void => {
  console.log("edit");
};

const replyToComment = (): void => {
  console.log("reply");
};

const createButton = (text: "Reply" | "Delete" | "Edit"): Element => {
  const button = document.createElement("button") as HTMLButtonElement;
  button.classList.add("commentBox__btn");
  if (text === "Delete") button.classList.add("delete-btn");
  button.title = text;
  button.innerHTML = `
    <img src="./images/icon-${text.toLowerCase()}.svg" alt="" width="15" height="15" />
    <span>${text}</span>
  `;
  if (text === "Reply") button.addEventListener("click", replyToComment);
  if (text === "Delete") button.addEventListener("click", deleteComment);
  if (text === "Edit") button.addEventListener("click", editComment);
  return button;
};
