import {
  Rating,
  RatingCreationData,
  RatingUpdateData,
} from "@/types/types_rating";
import { apiBasename } from ".";
interface ErrorResponse {
  msg: string;
  code?: number;
}

export async function getRatings(bookId: number): Promise<Rating[]> {
  try {
    const res = await fetch(`${apiBasename}/books/${bookId}/ratings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const msg: ErrorResponse = await res.json();
      throw new Error(msg.msg);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching ratings:", error);
    throw error;
  }
}

export const createRating = async (
  data: RatingCreationData
): Promise<Rating> => {
  try {
    if (typeof data.value !== "number" || data.value < 1 || data.value > 5) {
      throw new Error("Invalid data: 'value' must be a number between 1 and 5");
    }
    const value = {
      rating: data.value,
    };
    const url = `${apiBasename}/books/${data.bookId}/ratings`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(value),
    });

    if (!res.ok) {
      const msg: ErrorResponse = await res.json();
      throw new Error(msg.msg);
    }
    return res.json();
  } catch (error) {
    console.error("Error creating rating:", error);
    throw error;
  }
};

export const updateRating = async (data: RatingUpdateData) => {
  try {
    if (typeof data.value !== "number" || data.value < 1 || data.value > 5) {
      throw new Error("Invalid data: 'value' must be a number between 1 and 5");
    }
    const value = {
      rating: data.value,
    };
    const url = `${apiBasename}/ratings/${data.id}`;
    console.log(url);
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(value),
    });

    if (!res.ok) {
      const msg: ErrorResponse = await res.json();
      throw new Error(msg.msg);
    }
    return res.json();
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
};
