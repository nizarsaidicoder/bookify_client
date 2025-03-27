import {
  Author,
  AuthorBase,
  AuthorCreationData,
  GetAuthorParams,
  AuthorUpdateData,
} from "@types";
import { apiBasename } from ".";
interface ErrorResponse {
  msg: string;
  code: number;
}

export async function get_authors(
  filter: GetAuthorParams
): Promise<{ authors: AuthorBase[]; totalPages: number }> {
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filter)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== undefined && value !== "") // Remove undefined & empty values
        .map(([key, value]) => [key, String(value)]) // Convert values to strings
    )
  ).toString();
  const url = query
    ? `${apiBasename}/authors?${query}&take=9`
    : `${apiBasename}/authors?take=9`;

  const res = await fetch(url);
  if (!res.ok) {
    const msg: { msg: string } = await res.json();
    throw new Error(msg.msg);
  }

  const totalPages = parseInt(res.headers.get("X-Total-Pages") || "0", 10);
  const authors: AuthorBase[] = await res.json();
  return { authors, totalPages };
}

export async function add_author(author: AuthorCreationData) {
  // remove all empty fields
  for (const key in author) {
    if (
      !author[key as keyof AuthorCreationData] &&
      author[key as keyof AuthorCreationData] !== 0
    ) {
      delete author[key as keyof AuthorCreationData];
    }
  }
  const res: Response = await fetch(`${apiBasename}/authors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  });
  if (!res.ok) {
    const msg: ErrorResponse = await res.json();
    throw new Error(msg.msg);
  }
  const newAuthor: Author = await res.json();
  return newAuthor;
}

export async function delete_author(id: number) {
  const res: Response = await fetch(`${apiBasename}/authors/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return;
}

export async function update_author(
  id: number,
  author: AuthorUpdateData
): Promise<Omit<Author, "books">> {
  const res: Response = await fetch(`${apiBasename}/authors/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  const updatedAuthor: Author = await res.json();
  return updatedAuthor;
}

export async function get_author(id: number): Promise<Author> {
  const res: Response = await fetch(`${apiBasename}/authors/${id}`);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  const author: Author = await res.json();
  return author;
}
