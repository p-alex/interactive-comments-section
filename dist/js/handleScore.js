import { getDataFromLocalStorage } from "./handleLocalStorage.js";
export const handleScore = ({ elementToChange, score, scoreType, commentId, }) => {
    const data = getDataFromLocalStorage();
    const { comments, currentUser } = data;
    let currentScore = 0;
    comments.forEach((comment) => {
        if (comment.id === commentId) {
            currentScore = comment.score;
        }
    });
    console.log(currentScore);
    const isCommentAlreadyScored = currentUser.scored.find((item) => item.id === commentId);
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType !== "upvote" &&
        scoreType === "upvote") {
        elementToChange.textContent = `${(currentScore += 2)}`;
    }
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType === "upvote" &&
        scoreType === "upvote") {
        elementToChange.textContent = `${currentScore--}`;
    }
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType !== "downvote" &&
        scoreType === "downvote") {
        elementToChange.textContent = `${(currentScore -= 2)}`;
    }
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType === "downvote" &&
        scoreType === "downvote") {
        elementToChange.textContent = `${currentScore++}`;
    }
    if (!isCommentAlreadyScored && scoreType === "upvote") {
        elementToChange.textContent = `${currentScore++}`;
    }
    if (!isCommentAlreadyScored && scoreType === "downvote") {
        elementToChange.textContent = `${currentScore--}`;
    }
};
