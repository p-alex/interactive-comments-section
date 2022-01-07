import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";
import { updateLocalStorage } from "./updateLocalStorage.js";
export const addCommentLocalStorageUpdate = ({ commentData, isReply, index, }) => {
    const data = getDataFromLocalStorage();
    if (isReply) {
        const newReplyData = commentData;
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
    const newCommentData = commentData;
    updateLocalStorage({
        comments: [...data.comments, newCommentData],
        currentUser: data.currentUser,
    });
    console.log("Added comment to local storage!");
};
