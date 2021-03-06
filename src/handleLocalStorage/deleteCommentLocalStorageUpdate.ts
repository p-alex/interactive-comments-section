import { dataInterface } from "../interfaces/index";
import { getDataFromLocalStorage } from "./getDataFromLocalStorage";
import { updateLocalStorage } from "./updateLocalStorage";

// -------------------DELETE COMMENT FROM LOCAL STORAGE-------------------
export const deleteCommentLocalStorageUpdate = ({
  parentId,
  isReply,
  replyId,
}: {
  parentId: string;
  isReply: boolean;
  replyId: string;
}): void => {
  const data: dataInterface = getDataFromLocalStorage()!;
  if (isReply) {
    const newComments = data.comments.map((comment) => {
      if (comment.id === parentId) {
        const newCommentReplies = comment.replies.filter(
          (reply) => reply.id !== replyId
        );
        comment.replies = newCommentReplies;
        return comment;
      }
      return comment;
    });
    updateLocalStorage({
      comments: newComments,
      currentUser: data.currentUser,
    });
    console.log("Deleted reply from local storage!");
    return;
  }
  const newComments = data.comments.filter(
    (comment) => comment.id !== parentId
  );
  updateLocalStorage({ comments: newComments, currentUser: data.currentUser });
  console.log("Deleted comment from local storage!");
};
