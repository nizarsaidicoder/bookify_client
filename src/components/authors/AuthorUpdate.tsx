import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Author, AuthorUpdateData } from "@types";
import { update_author } from "@/api/author";
import { toast } from "sonner";

interface AuthorUpdateProps {
  author: Author;
  onAuthorUpdate: (author: Author) => void;
}

function AuthorUpdate({ author, onAuthorUpdate }: AuthorUpdateProps) {
  const [formData, setFormData] = useState({
    lastname: author.lastname || "",
    firstname: author.firstname || "",
    birthYear: author.birthYear || null,
    deathYear: author.deathYear || null,
    bio: author.bio || "",
    image: author.image || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    const updatedAuthor: AuthorUpdateData = {
      lastname: formData.lastname,
      firstname: formData.firstname,
      birthYear: formData.birthYear,
      deathYear: formData.deathYear,
      bio: formData.bio,
      image: formData.image,
    };
    try {
      await update_author(author.id, updatedAuthor);
      onAuthorUpdate({ ...author, ...updatedAuthor });
      toast("Author updated successfully");
    } catch (error) {
      toast("Failed to update author " + error);
    }
  };

  const handleReset = () => {
    setFormData({
      lastname: author.lastname || "",
      firstname: author.firstname || "",
      birthYear: author.birthYear || null,
      deathYear: author.deathYear || null,
      bio: author.bio || "",
      image: author.image || "",
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, bio: e.target.value });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Author</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="lastname"
              className="text-right">
              Last name
            </Label>
            <Input
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="firstname"
              className="text-right">
              First name
            </Label>
            <Input
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="birthYear"
              className="text-right">
              Birth year
            </Label>
            <Input
              id="birthYear"
              type="number"
              value={formData.birthYear || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="deathYear"
              className="text-right">
              Death year
            </Label>
            <Input
              id="deathYear"
              type="number"
              value={formData.deathYear || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <Textarea
            className=" custom-scroll max-h-40"
            onChange={handleTextareaChange}
            id="bio"
            value={formData.bio}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}>
            Save changes
          </Button>

          <Button
            variant="outline"
            type="reset"
            onClick={handleReset}>
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AuthorUpdate;
