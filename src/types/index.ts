type Author = {
  id: number;
  firstname: string;
  lastname: string;
  bio?: string;
  birthYear?: number | null;
  deathYear?: number | null;
  image?: string | null;
  books?: Book[];
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
  take?: number;
  skip?: number;
};

type Book = {
  id: number;
  title: string;
  publicationYear: number | null;
  authorId: number;
  tags?: Tag[];
};

type Tag = {
  id: number;
  name: string;
};

type BookCreationData = {
  title: string;
  publicationYear: number;
};

export type {
  Author,
  Book,
  Tag,
  AuthorCreationData,
  GetAuthorParams,
  BookCreationData,
  AuthorBase,
  AuthorUpdateData,
};
