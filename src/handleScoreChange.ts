import { getDataFromLocalStorage } from "./handleLocalStorage.js";

export const handleScoreChange = ({
  elementToChange,
  commentId,
  scoreType,
  commentType,
  upvoteBtn,
  downvoteBtn,
}: {
  elementToChange: HTMLParagraphElement;
  commentId: string;
  scoreType: "upvote" | "downvote";
  commentType: "normal" | "reply";
  upvoteBtn: HTMLButtonElement;
  downvoteBtn: HTMLButtonElement;
}) => {
  const data = getDataFromLocalStorage()!;
  const { comments, currentUser } = data;

  let currentScore = 0;

  if (commentType === "normal") {
    comments.forEach((comment) => {
      if (comment.id === commentId) {
        currentScore = comment.score;
      }
    });
  }

  if (commentType === "reply") {
    comments.forEach((comment) => {
      comment.replies.forEach((reply) => {
        if (reply.id === commentId) {
          currentScore = reply.score;
        }
      });
    });
  }

  const isCommentAlreadyScored = currentUser.scored.find(
    (item) => item.id === commentId
  );

  if (
    isCommentAlreadyScored &&
    isCommentAlreadyScored.scoreType === "downvote" &&
    scoreType === "upvote"
  ) {
    upvoteBtn.classList.add("btn-active");
    downvoteBtn.classList.remove("btn-active");
    elementToChange.textContent = `${currentScore + 2}`;
    return;
  }

  if (
    isCommentAlreadyScored &&
    isCommentAlreadyScored.scoreType === "upvote" &&
    scoreType === "upvote"
  ) {
    upvoteBtn.classList.remove("btn-active");
    downvoteBtn.classList.remove("btn-active");
    elementToChange.textContent = `${currentScore - 1}`;
    return;
  }

  if (
    isCommentAlreadyScored &&
    isCommentAlreadyScored.scoreType === "upvote" &&
    scoreType === "downvote"
  ) {
    upvoteBtn.classList.remove("btn-active");
    downvoteBtn.classList.add("btn-active");
    elementToChange.textContent = `${currentScore - 2}`;
    return;
  }

  if (
    isCommentAlreadyScored &&
    isCommentAlreadyScored.scoreType === "downvote" &&
    scoreType === "downvote"
  ) {
    upvoteBtn.classList.remove("btn-active");
    downvoteBtn.classList.remove("btn-active");
    elementToChange.textContent = `${currentScore + 1}`;
    return;
  }

  if (!isCommentAlreadyScored && scoreType === "upvote") {
    upvoteBtn.classList.add("btn-active");
    downvoteBtn.classList.remove("btn-active");
    elementToChange.textContent = `${currentScore + 1}`;
    return;
  }

  if (!isCommentAlreadyScored && scoreType === "downvote") {
    upvoteBtn.classList.remove("btn-active");
    downvoteBtn.classList.add("btn-active");
    elementToChange.textContent = `${currentScore - 1}`;
    return;
  }
};
