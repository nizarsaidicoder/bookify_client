interface AuthorHeaderProps {
  firstname: string;
  lastname: string;
  birthYear: string;
  deathYear: string;
  image?: string;
}

export function AuthorHeader({
  firstname,
  lastname,
  birthYear,
  deathYear,
  image,
}: AuthorHeaderProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <img
        src={
          image ||
          `https://api.dicebear.com/7.x/lorelei/svg?seed=${firstname}${lastname}${Math.floor(
            Math.random() * 10000
          )}`
        }
        alt={`${firstname} ${lastname}`}
        className="object-cover rounded-md"
      />
      <h1 className="text-3xl font-bold text-center">
        {firstname} {lastname}
      </h1>
      <h2 className="text-xl font-semibold text-center">
        {birthYear} - {deathYear}
      </h2>
    </div>
  );
}
