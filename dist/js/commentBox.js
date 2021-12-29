export const createCommentElement = (score, userImage, username, createdAt, content, replies, currentUser) => {
    const container = document.createElement("div");
    container.classList.add("commentBox__container");
    const template = `
    <div class="commentBox">
      <div class="commentBox__rate">
          <button class="commentBox__rateBtn" aria-label="Like comment">
            <img src="./images/icon-plus.svg" alt="" width='10' height='10'/>
          </button>
          <p class="commentBox__likes">${score}</p>
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
    <div class="commentBox__replyFormContainer"></div>
    <div class="commentBox__replyContainer" ${replies.length === 0 ? 'style="margin:0"' : ""}>
    <div class="commentBox__helperLine"></div>
      <div class="commentBox__replyCommentsContainer"></div>
    </div>
    `;
    container.innerHTML = template;
    // Adding Reply, Delete, and Edit buttons based on currentUser
    const commentBoxBtns = container.querySelector(".commentBox__btns");
    if (currentUser.username === username) {
        commentBoxBtns.appendChild(createButton({ text: "Delete", withIcon: true, btnStyle: "normal" }));
        commentBoxBtns.appendChild(createButton({ text: "Edit", withIcon: true, btnStyle: "normal" }));
    }
    else {
        commentBoxBtns.appendChild(createButton({ text: "Reply", withIcon: true, btnStyle: "normal" }));
    }
    // Adding comment text using textContent for security
    container.querySelector("#comment-text").textContent = content;
    // Adding replies if the comment has any
    if (replies.length) {
        const repliesContainer = container.querySelector(".commentBox__replyCommentsContainer");
        replies.forEach((reply) => {
            repliesContainer.appendChild(createCommentElement(reply.score, reply.user.image.png, reply.user.username, reply.createdAt, reply.content, [], currentUser));
        });
    }
    return container;
};
const deleteComment = (event) => {
    const element = event.target;
    const parent = (element.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".commentBox__container"));
    parent.remove();
};
const editComment = (event) => {
    const element = event.target;
    const commentContainer = element.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".commentBox__container");
    const commentTextContainer = commentContainer.querySelector(".commentBox__text");
    //Hide comment text
    const commentText = commentTextContainer.querySelector("#comment-text");
    commentText.style.display = "none";
    const isTextarea = commentContainer.querySelector(".commentBox__textarea");
    if (!isTextarea) {
        const textarea = document.createElement("textarea");
        textarea.classList.add("commentBox__textarea");
        textarea.placeholder = "Edit your comment...";
        textarea.value = commentText.textContent;
        commentTextContainer.appendChild(textarea);
    }
    const isEditModeBtns = commentContainer.querySelector(".commentBox__editModeBtnsContainer");
    if (!isEditModeBtns) {
        // Creating container for btns
        const editModeBtnsContainer = document.createElement("div");
        editModeBtnsContainer.classList.add("commentBox__editModeBtnsContainer");
        // Creating the buttons
        const updateBtn = createButton({
            text: "Update",
            withIcon: false,
            btnStyle: "fill",
        });
        const cancelBtn = createButton({
            text: "Cancel",
            withIcon: false,
            btnStyle: "normal",
        });
        // Adding event listeners to buttons
        updateBtn.addEventListener("click", updateComment);
        cancelBtn.addEventListener("click", cancelEditMode);
        editModeBtnsContainer.appendChild(updateBtn);
        editModeBtnsContainer.appendChild(cancelBtn);
        commentTextContainer.appendChild(editModeBtnsContainer);
    }
    const textarea = commentTextContainer.querySelector(".commentBox__textarea");
    const btnsContainer = commentContainer.querySelector(".commentBox__editModeBtnsContainer");
    function updateComment() {
        commentText.textContent = textarea.value;
        cancelEditMode();
    }
    function cancelEditMode() {
        textarea.remove();
        btnsContainer.remove();
        commentText.style.removeProperty("display");
    }
};
const replyToComment = (event) => {
    console.log("reply");
};
export const createButton = ({ text, withIcon, btnStyle, }) => {
    const button = document.createElement("button");
    button.classList.add("commentBox__btn");
    // Applying button style
    button.classList.add(btnStyle === "fill" ? "fill" : "normal");
    if (text === "Delete")
        button.classList.add("delete-btn");
    button.title = text;
    // Add icon if true
    if (withIcon) {
        button.innerHTML = `
    <img src="./images/icon-${text.toLowerCase()}.svg" alt="" width="15" height="15" />
    <span>${text}</span>
  `;
    }
    else {
        button.innerText = text;
    }
    // Buttons with text 'reply', 'delete' and 'edit' have functions
    // assigned by default
    if (text === "Reply")
        button.addEventListener("click", replyToComment);
    if (text === "Delete")
        button.addEventListener("click", deleteComment);
    if (text === "Edit")
        button.addEventListener("click", editComment);
    return button;
};
