import { Loader2 } from "lucide-react";

export default function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  );
}
