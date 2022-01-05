import { dataInterface } from "../interfaces/index";
import { updateLocalStorage } from "./updateLocalStorage.js";

// -------------------EDIT COMMENT FROM LOCAL STORAGE-------------------
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
    const newComments = data.comments.map((comment) => {
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
    updateLocalStorage({
      comments: newComments,
      currentUser: data.currentUser,
    });
    console.log("Edited reply successfuly");
    return;
  }
  const newComments = data.comments.map((comment) => {
    if (comment.id === parentId) {
      comment.content = content;
      return comment;
    }
    return comment;
  });
  updateLocalStorage({ comments: newComments, currentUser: data.currentUser });
  console.log("Edited comment successfuly");
};
