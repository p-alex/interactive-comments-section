export interface dataInterface {
  comments: commentsInterface[];
  currentUser: userInterface;
}

export interface commentsInterface {
  id: string;
  content: string;
  createdAt: number;
  replies: replyInterface[];
  score: number;
  user: userInterface;
}

export interface replyInterface {
  id: string;
  content: string;
  createdAt: number;
  replyingTo: string;
  score: number;
  user: userInterface;
}

export interface userInterface {
  image: {
    png: string;
    webp: string;
  };
  username: string;
  scored: scoreInterface[];
}

export interface scoreInterface {
  id: string;
  scoreType: "upvote" | "downvote";
}
