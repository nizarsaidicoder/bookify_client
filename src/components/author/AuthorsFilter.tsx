import { GetAuthorParams } from "@types";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Switch } from "@components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface AuthorFilterProps {
  loadAuthors: (filter: GetAuthorParams) => Promise<void>;
}

function AuthorsFilter({ loadAuthors }: AuthorFilterProps) {
  const [filter, setFilter] = useState<GetAuthorParams>({});

  const updateFilter = (name: string, value: string | boolean) => {
    setFilter((prev) => {
      const newFilter = { ...prev, [name]: value };
      loadAuthors(newFilter);
      return newFilter;
    });
  };

  return (
    <div className="flex flex-col gap-8 border-1 rounded-sm p-4 ">
      <h2 className="text-xl font-semibold">Filter authors</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 items-start">
          <Label>Filter by lastname</Label>
          <Input
            name="lastname"
            value={filter.lastname || ""}
            onChange={(e) => updateFilter("lastname", e.target.value)}
            placeholder="Dickens..."
          />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <Label>Filter by firstname</Label>
          <Input
            name="firstname"
            value={filter.firstname || ""}
            onChange={(e) => updateFilter("firstname", e.target.value)}
            placeholder="Charles..."
          />
        </div>

        <div className="flex gap-2 justify-between items-center">
          <Label>Authors with books</Label>
          <Switch
            checked={filter.hasSome || false}
            onCheckedChange={(checked) => updateFilter("hasSome", checked)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Sort authors</h2>
        <Select
          defaultValue="firstname"
          onValueChange={(val) => updateFilter("sortBy", val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="firstname">First Name</SelectItem>
              <SelectItem value="lastname">Last Name</SelectItem>
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

export default AuthorsFilter;
