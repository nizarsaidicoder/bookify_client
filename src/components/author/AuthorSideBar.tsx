import AuthorAddForm from "@components/author/AuthorAddForm";
import AuthorsFilter from "@components/author/AuthorsFilter";
import { Author, GetAuthorParams } from "@types";

interface AuthorsSideBarProps {
  onAddAuthor: (author: Author) => void;
  onFilterAuthors: (filter: GetAuthorParams) => Promise<void>;
}

function AuthorsSideBar({ onAddAuthor, onFilterAuthors }: AuthorsSideBarProps) {
  return (
    <div className="w-md h-[98vh] p-4  flex flex-col gap-4 custom-scroll overflow-x-hidden border-1 border-gray-200 rounded-md overflow-hidden">
      <AuthorAddForm onAddAuthor={onAddAuthor} />
      <AuthorsFilter loadAuthors={onFilterAuthors} />
    </div>
  );
}

export default AuthorsSideBar;
