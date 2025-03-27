import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router";

interface BookCardProps {
  id: number;
  title: string;
  publicationYear: number | null;
  cover?: string | null;
}

function BookCard({ title, cover, publicationYear, id }: BookCardProps) {
  return (
    <NavLink to={`/books/${id}`}>
      <Card className="m-4 relative shadow-lg rounded-lg hover:shadow-xl transition-all hover:cursor-pointer hover:scale-105 hover:outline-1 ">
        <CardHeader className="text-center p-4 ">
          <div className="w-full h-32 mb-4 flex items-center justify-center relative overflow-hidden">
            <img
              className="w-[32] h-full absolute object-cover rounded-md"
              src={cover || "https://via.placeholder.com/200"}
              alt={title}
            />
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {publicationYear && (
            <CardDescription className="text-sm">
              {publicationYear}
            </CardDescription>
          )}
        </CardHeader>
      </Card>
    </NavLink>
  );
}

export default BookCard;
