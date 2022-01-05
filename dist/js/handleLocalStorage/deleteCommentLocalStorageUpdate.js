import { updateLocalStorage } from "./updateLocalStorage.js";
// -------------------DELETE COMMENT FROM LOCAL STORAGE-------------------
export const deleteCommentLocalStorageUpdate = ({ parentId, isReply, replyId, }) => {
    const data = JSON.parse(localStorage.getItem("data"));
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
