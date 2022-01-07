import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";
import { updateLocalStorage } from "./updateLocalStorage.js";
export const deleteCommentLocalStorageUpdate = ({ parentId, isReply, replyId, }) => {
    const data = getDataFromLocalStorage();
    if (isReply) {
        const newComments = data.comments.map((comment) => {
            if (comment.id === parentId) {
                const newCommentReplies = comment.replies.filter((reply) => reply.id !== replyId);
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
    const newComments = data.comments.filter((comment) => comment.id !== parentId);
    updateLocalStorage({ comments: newComments, currentUser: data.currentUser });
    console.log("Deleted comment from local storage!");
};
