export interface dataInterface {
  comments: commentsInterface[];
  currentUser: userInterface;
}

export interface commentsInterface {
  id: string;
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
  id: string;
  content: string;
  createdAt: string;
  replyingTo: string;
  score: number;
  user: userInterface;
}
