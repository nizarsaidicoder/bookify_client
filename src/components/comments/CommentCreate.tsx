import { add_comment } from "@/api/comment";
import { CommentCreate } from "@/types/types_comment";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Comment } from "@/types/types_comment";

interface CommentCreateDialogProps {
  userID: number;
  bookID: number;
  onCommentCreate: (comment: Comment) => void;
}

function CommentCreateDialog({
  userID,
  bookID,
  onCommentCreate,
}: CommentCreateDialogProps) {
  const [content, setContent] = useState<string>("");

  const handleCommentCreate = async () => {
    const payload: CommentCreate = {
      content,
      userId: userID,
      bookId: bookID,
    };
    try {
      if (!content) {
        toast.error("Comment content cannot be empty");
        return;
      }
      // Assuming you have a function to create a comment
      const comment: Comment = await add_comment(payload);
      toast.success("Comment created successfully");
      onCommentCreate(comment); // Notify parent with the new comment
    } catch (error) {
      console.error("Error creating comment:", error);
      toast.error("Failed to create comment");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Comment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Comment</DialogTitle>
          <Label
            htmlFor="comment"
            className="text-sm font-medium">
            Comment
          </Label>
          <Input
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment here..."
          />
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleCommentCreate}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CommentCreateDialog;
