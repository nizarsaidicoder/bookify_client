import { BookBase } from "@types";

type Author = {
  id: number;
  firstname: string;
  lastname: string;
  bio?: string;
  birthYear?: number | null;
  deathYear?: number | null;
  image?: string | null;
  books?: BookBase[];
};
type AuthorBase = Omit<Author, "books" | "bio" | "birthYear" | "deathYear">;
type AuthorCreationData = Omit<Author, "id" | "books">;
type AuthorUpdateData = Partial<AuthorCreationData>;
type GetAuthorParams = {
  firstname?: string;
  lastname?: string;
  hasSome?: boolean;
  sortBy?: "firstname" | "lastname";
  sortType?: "asc" | "desc";
  page?: number;
};

export type {
  Author,
  AuthorBase,
  AuthorCreationData,
  GetAuthorParams,
  AuthorUpdateData,
};
