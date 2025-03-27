import { ReactNode } from "react";

interface BookSideBarProps {
  children?: ReactNode;
}

function BookSideBar({ children }: BookSideBarProps) {
  return (
    <div className="w-md h-[98vh] p-4 flex flex-col gap-4 custom-scroll overflow-x-hidden border-1 border-gray-200 rounded-md overflow-hidden">
      {children}
    </div>
  );
}

export default BookSideBar;
