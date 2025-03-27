import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BookCardProps {
  title: string;
  publicationYear: number | null;
  cover?: string | null;
}

function BookCard({ title, cover, publicationYear }: BookCardProps) {
  return (
    <Card className="relative shadow-lg rounded-lg hover:shadow-xl transition-all hover:cursor-pointer hover:scale-105 hover:outline-1 h-lg">
      <CardHeader className="text-center p-4">
        <div className="w-full h-40 mb-4">
          <img
            className="w-full h-full object-cover rounded-md"
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
  );
}

export default BookCard;
