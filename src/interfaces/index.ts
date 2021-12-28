export interface dataInterface {
  comments: commentsInterface[];
  currentUser: userInterface;
}

export interface commentsInterface {
  id: number;
  content: string;
  createdAt: string;
  replies: replyInterface[];
  score: number;
  user: userInterface;
}

export interface userInterface {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

export interface replyInterface {
  content: string;
  createdAt: string;
  id: number;
  replyingTo: string;
  score: number;
  user: userInterface;
}
