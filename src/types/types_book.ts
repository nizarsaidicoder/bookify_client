import { Tag } from "@types";
import { Comment } from "./types_comment";

type Book = {
  id: number;
  title: string;
  publicationYear: number | null;
  cover: string | null;
  description: string | null;
  authorId: number;
  tags?: Tag[];
  comments?: Comment[];
  avgRating?: number | null;
};

type BookBase = Omit<Book, "tags" | "description" | "comments">;

type BookCreationData = {
  title: string;
  publicationYear: number;
  cover?: string;
  description?: string;
  tags?: string;
};

type GetBookParams = {
  title?: string;
  authorId?: number;
  publicationYear?: number;
  sortBy?: "title" | "publicationYear" | "rating";
  sortType?: "asc" | "desc";
  page?: number;
  genres?: string;
};

type BookUpdateData = Partial<BookCreationData>;

export type { Book, BookBase, BookCreationData, GetBookParams, BookUpdateData };
