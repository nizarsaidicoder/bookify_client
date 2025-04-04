import {
  Book,
  BookBase,
  BookCreationData,
  BookUpdateData,
  GetBookParams,
  Tag,
} from "@types";
import { apiBasename } from ".";

export interface ErrorResponse {
  msg: string;
  code?: number;
}

export async function get_books(
  filter: GetBookParams
): Promise<{ books: BookBase[]; totalPages: number }> {
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filter)
        .filter(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => value !== undefined && value !== "" && value !== null
        )
        .map(([key, value]) => [key, String(value)])
    )
  ).toString();
  const url = query
    ? `${apiBasename}/books?${query}&take=9`
    : `${apiBasename}/books?take=9`;

  const res = await fetch(url);
  if (!res.ok) {
    const msg: ErrorResponse = await res.json();
    throw new Error(msg.msg);
  }

  const totalPages = parseInt(res.headers.get("X-Total-Pages") || "0", 10);
  const books: BookBase[] = await res.json();
  return { books, totalPages };
}

export async function get_book(id: number): Promise<Book> {
  const res = await fetch(`${apiBasename}/books/${id}`);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return await res.json();
}

export async function add_book(
  authorId: number,
  book: BookCreationData
): Promise<Book> {
  const cleanedBook = removeEmptyFields(book);

  const url = `${apiBasename}/authors/${authorId}/books`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cleanedBook),
  });

  if (!res.ok) {
    const msg: ErrorResponse = await res.json();
    throw new Error(msg.msg);
  }

  return await res.json();
}

export async function update_book(
  id: number,
  book: BookUpdateData
): Promise<Book> {
  const res = await fetch(`${apiBasename}/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return await res.json();
}

export async function delete_book(id: number): Promise<void> {
  const res = await fetch(`${apiBasename}/books/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
}

export async function get_similar_books(id: number): Promise<BookBase[]> {
  const res = await fetch(`${apiBasename}/books/${id}/similars`);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return await res.json();
}

function removeEmptyFields(
  book: Partial<Book> | BookCreationData
): Partial<Book> | BookCreationData {
  const cleanedBook = Object.fromEntries(
    Object.entries(book).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  if ("tags" in cleanedBook && typeof cleanedBook.tags === "string") {
    return {
      ...cleanedBook,
      tags: cleanedBook.tags
        .split(",")
        .map((tag) => ({ name: tag.trim() } as Tag)),
    };
  }

  return cleanedBook;
}
