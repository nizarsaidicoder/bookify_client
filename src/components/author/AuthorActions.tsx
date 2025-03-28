import { Button } from "@components/ui/button";
import AuthorUpdate from "@components/author/AuthorUpdate";
import { Author } from "@types";

interface AuthorActionsProps {
  author: Author;
  onAuthorUpdate: (author: Author) => void;
  onDelete: () => void;
}

export function AuthorActions({
  author,
  onAuthorUpdate,
  onDelete,
}: AuthorActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <AuthorUpdate
        author={author}
        onAuthorUpdate={onAuthorUpdate}
      />
      <Button
        onClick={onDelete}
        variant="destructive"
        className="mt-2">
        Delete
      </Button>
    </div>
  );
}
