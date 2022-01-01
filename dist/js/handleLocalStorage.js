export const getDataFromLocalStorage = () => {
    if (JSON.parse(window.localStorage.getItem("data")) === null) {
        return null;
    }
    else {
        return JSON.parse(window.localStorage.getItem("data"));
    }
};
const updateLocalStorage = (newData) => {
    window.localStorage.setItem("data", JSON.stringify(newData));
};
// -------------------ADD COMMENT TO LOCAL STORAGE-------------------
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
// -------------------EDIT COMMENT FROM LOCAL STORAGE-------------------
export const editCommentLocalStorageUpdate = ({ parentId, isReply, replyId, content, }) => {
    const data = JSON.parse(localStorage.getItem("data"));
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
