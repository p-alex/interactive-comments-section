import {
  commentsInterface,
  dataInterface,
  replyInterface,
} from "../interfaces/index";
import { getDataFromLocalStorage } from "./getDataFromLocalStorage";
import { updateLocalStorage } from "./updateLocalStorage";

// -------------------ADD COMMENT TO LOCAL STORAGE-------------------
export const addCommentLocalStorageUpdate = ({
  commentData,
  isReply,
  index,
}: {
  commentData: commentsInterface | replyInterface;
  isReply: boolean;
  index: string;
}): void => {
  const data: dataInterface = getDataFromLocalStorage()!;

  if (isReply) {
    const newReplyData = <replyInterface>commentData;

    const newComments = data.comments.map((comment) => {
      if (comment.id === index) {
        comment.replies.push(newReplyData);
        return comment;
      }
      return comment;
    });

    updateLocalStorage({
      comments: newComments,
      currentUser: data.currentUser,
    });

    console.log("Added reply to local storage!");
    return;
  }

  const newCommentData = <commentsInterface>commentData;

  updateLocalStorage({
    comments: [...data.comments, newCommentData],
    currentUser: data.currentUser,
  });
  console.log("Added comment to local storage!");
};
