export type Rating = {
  id: number;
  value: number;
  bookId: number;
  userId: number;
};

export type RatingCreationData = {
  bookId: number;
  userId: number;
  value: number;
};

export type RatingUpdateData = Omit<Rating, "bookId" | "userId">;
