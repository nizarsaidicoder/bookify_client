import { Book } from "@types";
import { useState } from "react";

export const useBookForm = (initialBook: Book) => {
  const [formData, setFormData] = useState({
    title: initialBook.title || "",
    publicationYear: initialBook.publicationYear || new Date().getFullYear(),
    description: initialBook.description || "",
    cover: initialBook.cover || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      title: initialBook.title || "",
      publicationYear: initialBook.publicationYear || new Date().getFullYear(),
      description: initialBook.description || "",
      cover: initialBook.cover || "",
    });
  };

  return { formData, handleChange, handleTextareaChange, resetForm };
};
