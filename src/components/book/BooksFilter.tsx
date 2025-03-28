import { GetBookParams, Tag } from "@types";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { MultiSelect } from "@components/ui/multiselect";
import { get_tags } from "@/api/tag";

interface BooksFilterProps {
  onFilter: (filter: GetBookParams) => void;
}

function BooksFilter({ onFilter }: BooksFilterProps) {
  const [filter, setFilter] = useState<GetBookParams>({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]); // ✅ Persist tags in state

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await get_tags();
        setTags(fetchedTags.map((tag: Tag) => tag.name)); // ✅ Update state correctly
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []); // ✅ Runs only once on mount
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFilter = (key: string, value: any) => {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
    onFilter(newFilter);
  };

  const handleTagChange = (selected: string[]) => {
    setSelectedTags(selected);
    updateFilter("tags", selected);
  };

  return (
    <div className="flex flex-col gap-8 border-1 rounded-sm p-4">
      <h2 className="text-xl font-semibold">Filter books</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 items-start">
          <Label>Filter by title</Label>
          <Input
            name="title"
            value={filter.title || ""}
            onChange={(e) => updateFilter("title", e.target.value)}
            placeholder="Moby Dick..."
          />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <Label>Filter by publication year</Label>
          <Input
            type="number"
            name="publicationYear"
            value={filter.publicationYear || ""}
            onChange={(e) =>
              updateFilter(
                "publicationYear",
                e.target.value ? Number(e.target.value) : null
              )
            }
            placeholder="1851..."
          />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <Label>Filter by author ID</Label>
          <Input
            type="number"
            name="authorId"
            value={filter.authorId || ""}
            onChange={(e) =>
              updateFilter(
                "authorId",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder="123..."
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <Label>Filter by tags</Label>
          <MultiSelect
            options={tags}
            selected={selectedTags}
            onChange={handleTagChange}
            placeholder="Select tags"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Sort books</h2>
        <Select
          defaultValue="title"
          onValueChange={(val) => updateFilter("sortBy", val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="publicationYear">Publication Year</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          defaultValue="asc"
          onValueChange={(val) => updateFilter("sortType", val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort type ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort type</SelectLabel>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default BooksFilter;
