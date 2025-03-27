import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AuthorBioProps {
  bio: string | null;
}

export function AuthorBio({ bio }: AuthorBioProps) {
  const [showFullBio, setShowFullBio] = useState(false);
  const bioPreviewLength = 300;

  if (!bio) return <p>No bio available</p>;

  return (
    <div className="w-full p-4 rounded-sm">
      {showFullBio
        ? bio
        : `${bio.substring(0, bioPreviewLength)}${
            bio.length > bioPreviewLength ? "..." : ""
          }`}
      {bio.length > bioPreviewLength && (
        <button
          onClick={() => setShowFullBio(!showFullBio)}
          className="ml-2 text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1">
          {showFullBio ? (
            <div className="mt-2 flex items-center gap-1">
              <ChevronUp className="h-4 w-4" />
              <span>Show less</span>
            </div>
          ) : (
            <div className="mt-2 flex items-center gap-1">
              <ChevronDown className="h-4 w-4" />
              <span>Show more</span>
            </div>
          )}
        </button>
      )}
    </div>
  );
}
