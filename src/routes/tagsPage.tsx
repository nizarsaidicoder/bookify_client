import { get_tags } from "@/api/tag";
import TagAdd from "@components/tags/TagAdd";
import TagDialog from "@components/tags/TagDialog";

import { Tag } from "@types";
import { useEffect, useState } from "react";

function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await get_tags();
        setTags(fetchedTags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleTagAdd = (newTag: Tag) => {
    setTags((prevTags) => [...prevTags, newTag]);
  };
  const handleTagUpdate = (tag: Tag) => {
    setTags((prevTags) => prevTags.map((t) => (t.id === tag.id ? tag : t)));
  };

  return (
    <div className="w-full h-full flex gap-8">
      <div className="w-md h-[98vh] p-4  flex flex-col gap-4 custom-scroll overflow-x-hidden border-1 border-gray-200 rounded-md overflow-hidden">
        <TagAdd onAddTag={handleTagAdd} />
      </div>
      <div className="h-[98vh] w-full flex flex-col items-center justify-center border rounded-sm border-gray-200 p-8">
        <h1 className="text-2xl font-semibold mb-4">Tags</h1>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <TagDialog
              tag={tag}
              key={index}
              onTagUpdate={handleTagUpdate}
              onTagDelete={() => {
                setTags((prevTags) => prevTags.filter((t) => t.id !== tag.id));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagsPage;
