import { useEffect, useState } from "react";
import { get_author } from "@/api/author";
import { Author } from "@types";

export function useAuthor(authorId?: number) {
  const [author, setAuthor] = useState<Author>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        if (!authorId) return;
        const fetchedAuthor = await get_author(authorId);
        setAuthor(fetchedAuthor);
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthor();
  }, [authorId]);

  return { author, setAuthor, loading };
}
