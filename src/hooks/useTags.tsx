import { get_tags } from "@/api/tag";
import { Tag } from "@types";
import { useEffect, useState } from "react";

export const useTags = (initialTags: string[] = []) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await get_tags();
        setTags(fetchedTags.map((tag: Tag) => tag.name));
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []);

  return { tags, selectedTags, setSelectedTags };
};
