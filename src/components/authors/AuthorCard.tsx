import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
interface AuthorCardProps {
  firstname: string;
  lastname: string;
  image?: string;
}

function AuthorCard({ firstname, lastname, image }: AuthorCardProps) {
  // Randomly select an avatar from the list
  const randomSeed = `${firstname}${lastname}${Math.floor(
    Math.random() * 10000
  )}`;

  return (
    <Card className=" relative shadow-lg rounded-lg hover:shadow-xl transition-all hover:cursor-pointer hover:scale-105 hover:outline-1">
      <CardHeader className="text-center p-4">
        <Avatar className="mx-auto w-24 h-24 mb-4">
          <img
            className="w-full h-full object-cover rounded-full"
            src={
              image ||
              `https://api.dicebear.com/7.x/lorelei/svg?seed=${randomSeed}`
            }
            alt={`${firstname} ${lastname}`}
          />
        </Avatar>
        <CardTitle className="text-xl font-semibold ">{`${firstname} ${lastname}`}</CardTitle>
        <CardDescription className="text-sm ">Author</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default AuthorCard;
