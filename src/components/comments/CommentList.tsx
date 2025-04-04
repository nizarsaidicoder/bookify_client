import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Comment } from "@/types/types_comment";
import { Pen, Check, X } from "lucide-react";

interface CommentListProps {
  comments: Comment[];
  userID: number;
  handleDelete: (commentId: number) => void;
  handleUpdate: (commentId: number, content: string) => void;
}

function CommentList({
  comments,
  userID,
  handleDelete,
  handleUpdate,
}: CommentListProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  const saveEdit = (commentId: number) => {
    handleUpdate(commentId, editedContent);
    setEditedContent("");
    setEditingCommentId(null);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold">Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 border-b border-gray-200 flex justify-between">
            <div>
              {editingCommentId === comment.id ? (
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="border p-1 rounded text-sm w-full"
                />
              ) : (
                <p className="text-sm">{comment.content}</p>
              )}
              <p className="text-xs text-violet-400">
                {new Date(comment.updatedAt).toLocaleDateString()}
              </p>
            </div>

            {userID === comment.userId && (
              <div className="flex items-center gap-2">
                {editingCommentId === comment.id ? (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => saveEdit(comment.id)}>
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={cancelEditing}>
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Pen
                      className="text-violet-400 cursor-pointer hover:-translate-y-1 transition-all"
                      onClick={() => startEditing(comment)}
                    />
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(comment.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

export default CommentList;
