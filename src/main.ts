import { createCommentElement } from "./commentBox.js";
import { appendFooter } from "./footer.js";
import { addNewComment, appendForm, createForm } from "./form.js";
import {
  commentsInterface,
  dataInterface,
  replyInterface,
  userInterface,
} from "./interfaces/index";

export const mainContainer = document.querySelector(
  ".container"
) as HTMLDivElement;

export const mainFormContainer = document.querySelector(
  ".form__container"
) as HTMLDivElement;

export let data: dataInterface;

// Getting data from data.json
const getData = async (): Promise<void> => {
  try {
    const response = await fetch("data.json");
    const json: dataInterface = await response.json();
    if (localStorage.getItem("data") === null) {
      localStorage.setItem("data", JSON.stringify(json));
    }
  } catch (err) {
    console.error(err);
  }
};

interface IaddCommentLocalStorage {
  content: string;
  createdAt: string;
  user: userInterface;
  replies: replyInterface[];
  score: number;
}
export const addCommentLocalStorageUpdate = (
  commentData: commentsInterface
): void => {
  const { id, content, createdAt, user, replies, score } = commentData;
  const data: dataInterface = JSON.parse(localStorage.getItem("data")!);
  const newComment = {
    id,
    content,
    createdAt,
    user,
    replies,
    score,
  };
  data.comments.push(newComment);
  localStorage.setItem("data", JSON.stringify(data));
};

export const deleteCommentLocalStorageUpdate = ({
  parentId,
  isReply,
  replyId,
}: {
  parentId: string;
  isReply: boolean;
  replyId: string;
}): void => {
  const data: dataInterface = JSON.parse(localStorage.getItem("data")!);
  if (isReply) {
    console.log(data.comments);
    const comments = data.comments.map((comment) => {
      console.log(comment.id + " | " + parentId);
      if (comment.id === parentId) {
        const newCommentReplies = comment.replies.filter(
          (reply) => reply.id !== replyId
        );
        comment.replies = newCommentReplies;
        return comment;
      }
      return comment;
    });
    console.log(comments);
    data.comments = comments;
    console.log(data.comments);
    localStorage.setItem("data", JSON.stringify(data));
    refreshLocalStorageData();
    return;
  }
  const comments = data.comments.filter((comment) => comment.id !== parentId);
  data.comments = comments;
  localStorage.setItem("data", JSON.stringify(data));
  refreshLocalStorageData();
};

export const editCommentLocalStorageUpdate = ({
  parentId,
  isReply,
  replyId,
  content,
}: {
  parentId: string;
  isReply: boolean;
  replyId: string;
  content: string;
}): void => {
  const data: dataInterface = JSON.parse(localStorage.getItem("data")!);
  if (isReply) {
    const comments = data.comments.map((comment) => {
      console.log(comment.id + " | " + parentId);
      if (comment.id === parentId) {
        const newCommentReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            reply.content = content;
            return reply;
          }
          return reply;
        });
        comment.replies = newCommentReplies;
        return comment;
      }
      return comment;
    });
    data.comments = comments;
    localStorage.setItem("data", JSON.stringify(data));

    refreshLocalStorageData();
    return;
  }
  const comments = data.comments.map((comment) => {
    if (comment.id === parentId) {
      comment.content = content;
      return comment;
    }
    return comment;
  });
  data.comments = comments;
  localStorage.setItem("data", JSON.stringify(data));

  refreshLocalStorageData();
};

export const randomIdGenerator = (): string => {
  const string =
    "aA1bB2cC3dD4eE5fF6gG7hH8iI9jJ1kK2lL3mM4nN5oO6pP7qQ8rR9sS1tT2uU3vV4wW5xX6yY7zZ8";
  let id = "";
  for (let i = 0; i <= 20; i++) {
    id += string[Math.floor(Math.random() * string.length)];
  }
  return id;
};

randomIdGenerator();

const main = (): void => {
  if (data?.currentUser?.username) {
    appendComments(data.comments, data.currentUser);
    appendForm({
      appendFormTo: mainFormContainer,
      formToAppend: createForm({
        textareaPlaceholder: "Write a comment...",
        btnText: "Send",
        submitFunc: addNewComment,
        withCancel: false,
      }),
    });
    appendFooter();
  } else {
    appendErrorMessage({ message: "Something went wrong..." });
  }
};

const appendComments = (
  comments: commentsInterface[],
  currentUser: userInterface
) => {
  comments.forEach((comment: commentsInterface): void => {
    mainContainer.appendChild(
      createCommentElement(
        comment.id,
        comment.score,
        comment.user.image.png,
        comment.user.username,
        comment.createdAt,
        comment.content,
        comment.replies,
        currentUser,
        "normal"
      )
    );
  });
};

const appendErrorMessage = ({ message }: { message: string }): void => {
  const error = document.createElement("p") as HTMLParagraphElement;
  error.innerText = message;
  mainContainer.appendChild(error);
};

export const refreshLocalStorageData = () => {
  data = JSON.parse(localStorage.getItem("data")!);
};

(async (): Promise<void> => {
  await getData();
  data = JSON.parse(localStorage.getItem("data")!);
  main();
})();
