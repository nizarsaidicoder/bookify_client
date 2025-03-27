import { AuthorBase } from "@types";
import { NavLink } from "react-router";
import AuthorCard from "./AuthorCard";
interface AuthorsListProps {
  authors: AuthorBase[];
}

function AuthorsList({ authors }: AuthorsListProps) {
  if (!authors) return null;
  if (!authors.length)
    return <p className="text-center">Aucun auteur trouvé</p>;

  return (
    <>
      <div className="w-full h-[90vh] p-4 custom-scroll grid grid-cols-3 gap-4 border-1 border-gray-200 rounded-md">
        {authors.map((author) => (
          <NavLink
            to={`/authors/${author.id}`}
            key={author.id}>
            <AuthorCard
              firstname={author.firstname}
              lastname={author.lastname}
              image={author.image || undefined}
            />
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default AuthorsList;
