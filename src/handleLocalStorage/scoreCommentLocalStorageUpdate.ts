import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";
import { updateLocalStorage } from "./updateLocalStorage.js";

// -------------------UPDATE COMMENT SCORE AND SAVE THE CHANGES TO LOCAL STORAGE-------------------
export const scoreCommentLocalStorageUpdate = ({
  scoreType,
  commentId,
  isReply,
}: {
  scoreType: "upvote" | "downvote";
  commentId: string;
  isReply: boolean;
}) => {
  const data = getDataFromLocalStorage()!;
  const { comments, currentUser } = data;

  const isCommentAlreadyScored = currentUser.scored.find(
    (item) => item.id === commentId
  );

  if (
    isCommentAlreadyScored &&
    isCommentAlreadyScored.scoreType === "downvote" &&
    scoreType === "upvote"
  ) {
    currentUser.scored.forEach((score) => {
      if (score.id === commentId && score.scoreType !== scoreType) {
        score.scoreType = scoreType;
      }
    });
    if (isReply) {
      const newComments = comments.map((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === commentId) {
            reply.score += 2;
            return;
          }
        });
        return comment;
      });
      updateLocalStorage({ comments: newComments, currentUser });
      return;
    }
    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.score += 2;
        return comment;
      }
      return comment;
    });
    updateLocalStorage({ comments: newComments, currentUser });
    return;
  }

  if (
    isCommentAlreadyScored &&
    isCommentAlreadyScored.scoreType === "upvote" &&
    scoreType === "upvote"
  ) {
    currentUser.scored = currentUser.scored.filter(
      (score) => score.id !== commentId
    );
    if (isReply) {
      const newComments = comments.map((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === commentId) {
            reply.score--;
            return;
          }
        });
        return comment;
      });
      updateLocalStorage({ comments: newComments, currentUser });
      return;
    }
    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.score--;
        return comment;
      }
      return comment;
    });
    updateLocalStorage({ comments: newComments, currentUser });
    return;
  }

  if (
    isCommentAlreadyScored &&
    isCommentAlreadyScored.scoreType === "upvote" &&
    scoreType === "downvote"
  ) {
    currentUser.scored.forEach((score) => {
      if (score.id === commentId) {
        score.scoreType = scoreType;
      }
    });
    if (isReply) {
      const newComments = comments.map((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === commentId) {
            console.log(reply.score);
            reply.score -= 2;
            console.log(reply.score);
            return;
          }
        });
        return comment;
      });
      updateLocalStorage({ comments: newComments, currentUser });
      return;
    }
    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.score -= 2;
        return comment;
      }
      return comment;
    });
    updateLocalStorage({ comments: newComments, currentUser });
    return;
  }

  if (
    isCommentAlreadyScored &&
    isCommentAlreadyScored.scoreType === "downvote" &&
    scoreType === "downvote"
  ) {
    currentUser.scored = currentUser.scored.filter(
      (score) => score.id !== commentId
    );
    if (isReply) {
      const newComments = comments.map((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === commentId) {
            reply.score++;
            return;
          }
        });
        return comment;
      });
      updateLocalStorage({ comments: newComments, currentUser });
      return;
    }
    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.score++;
        return comment;
      }
      return comment;
    });
    updateLocalStorage({ comments: newComments, currentUser });
    return;
  }

  if (!isCommentAlreadyScored && scoreType === "upvote") {
    currentUser.scored.push({ id: commentId, scoreType });
    if (isReply) {
      const newComments = comments.map((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === commentId) {
            reply.score++;
          }
        });
        return comment;
      });
      updateLocalStorage({ comments: newComments, currentUser });
      return;
    }
    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.score++;
        return comment;
      }
      return comment;
    });
    updateLocalStorage({ comments: newComments, currentUser });
    return;
  }

  if (!isCommentAlreadyScored && scoreType === "downvote") {
    currentUser.scored.push({ id: commentId, scoreType });
    if (isReply) {
      const newComments = comments.map((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === commentId) {
            reply.score--;
          }
        });
        return comment;
      });
      updateLocalStorage({ comments: newComments, currentUser });
      return;
    }
    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.score--;
        return comment;
      }
      return comment;
    });
    updateLocalStorage({ comments: newComments, currentUser });
    return;
  }
};
