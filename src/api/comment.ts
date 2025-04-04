import { apiBasename } from ".";
import { Comment } from "@/types/types_comment";

import { CommentCreate, CommentUpdate } from "@/types/types_comment";

export async function get_comments(book_id: number): Promise<Comment[]> {
  const res: Response = await fetch(`${apiBasename}/books/${book_id}/comments`);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  const comments: Comment[] = await res.json();
  return comments;
}

export async function add_comment(comment: CommentCreate): Promise<Comment> {
  const filteredComment = {
    content: comment.content,
  };
  const res: Response = await fetch(
    `${apiBasename}/books/${comment.bookId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(filteredComment),
    }
  );
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  const newComment: Comment = await res.json();
  return newComment;
}

export async function update_comment(comment: CommentUpdate): Promise<Comment> {
  const res: Response = await fetch(`${apiBasename}/comments/${comment.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ content: comment.content }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  const updatedComment: Comment = await res.json();
  return updatedComment;
}

export async function delete_comment(id: number): Promise<void> {
  const res: Response = await fetch(`${apiBasename}/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return;
}
