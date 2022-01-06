import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";
import { updateLocalStorage } from "./updateLocalStorage.js";
export const addCommentLocalStorageUpdate = (commentData, isReply, index) => {
    const { id, content, createdAt, user, replies, score } = commentData;
    const data = getDataFromLocalStorage();
    const newComment = {
        id,
        content,
        createdAt,
        user,
        replies,
        score,
    };
    if (isReply) {
        const newReply = {
            id,
            content,
            createdAt,
            replyingTo: "",
            score,
            user,
        };
        const newComments = data.comments.map((comment) => {
            if (comment.id === index) {
                comment.replies.push(newReply);
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
    const newComments = [...data.comments];
    newComments.push(newComment);
    updateLocalStorage({ comments: newComments, currentUser: data.currentUser });
    console.log("Added comment to local storage!");
};
