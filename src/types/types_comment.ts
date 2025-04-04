type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  bookId: number;
  userId: number;
};

type CommentBase = Omit<Comment, "id" | "createdAt" | "updatedAt">;

type CommentCreate = Omit<Comment, "id" | "createdAt" | "updatedAt">;

type CommentUpdate = {
  id: number;
  content: string;
  bookId: number;
  userId: number;
};

export type { Comment, CommentBase, CommentCreate, CommentUpdate };
