import * as React from "react";
import { X, ChevronUp } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

type MultiSelectProps = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
};

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [showAll, setShowAll] = React.useState(false); // Tracks whether to show all options
  const [showAllSelected, setShowAllSelected] = React.useState(false); // Tracks whether to show all selected items

  const handleUnselect = (option: string) => {
    onChange(selected.filter((s) => s !== option));
  };

  const selectables = options.filter((option) => !selected.includes(option));
  const displayCount = 4;
  const shouldShowMore = selectables.length > displayCount;
  const visibleOptions = showAll
    ? selectables
    : selectables.slice(0, displayCount);
  const remainingCount = selectables.length - displayCount;

  // For selected items
  const selectedDisplayCount = 4;
  const shouldShowMoreSelected = selected.length > selectedDisplayCount;
  const visibleSelected = showAllSelected
    ? selected
    : selected.slice(0, selectedDisplayCount);
  const remainingSelectedCount = selected.length - selectedDisplayCount;

  return (
    <Command className="overflow-visible bg-transparent h-fit">
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {visibleSelected.map((option) => (
            <Badge
              key={option}
              variant="secondary">
              {option}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(option);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option)}>
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}

          {/* "+X more..." button for selected items */}
          {shouldShowMoreSelected && !showAllSelected && (
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={() => setShowAllSelected(true)}>
              +{remainingSelectedCount} more...
            </Badge>
          )}

          {/* "Show less" button for selected items */}
          {showAllSelected && (
            <Badge
              variant="outline"
              className="cursor-pointer flex items-center gap-1"
              onClick={() => setShowAllSelected(false)}>
              <ChevronUp className="h-3 w-3" />
              Show less
            </Badge>
          )}

          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="h-full overflow-auto">
                {visibleOptions.map((option) => (
                  <CommandItem
                    key={option}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      onChange([...selected, option]);
                    }}
                    className="cursor-pointer"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onChange([...selected, option]);
                        setInputValue("");
                      }
                    }}>
                    {option}
                  </CommandItem>
                ))}

                {/* "+X more..." button for options */}
                {shouldShowMore && !showAll && (
                  <CommandItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setShowAll(true);
                    }}
                    className="cursor-pointer text-muted-foreground">
                    +{remainingCount} more...
                  </CommandItem>
                )}

                {/* "Show less" button for options */}
                {showAll && (
                  <CommandItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setShowAll(false);
                    }}
                    className="cursor-pointer text-muted-foreground flex items-center gap-1 ">
                    <ChevronUp className="h-3 w-3" />
                    Show less
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
