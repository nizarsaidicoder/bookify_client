import { Tag } from "@/types/types_tag";
import { apiBasename } from ".";
import { TagCreationData, TagUpdateData } from "@/types/types_tag";
import { ErrorResponse } from "./book";

export async function get_tags(): Promise<Tag[]> {
  return fetch(`${apiBasename}/tags`).then((res) => res.json());
}

export async function add_tag(tag: TagCreationData): Promise<Tag> {
  const filteredTag: TagCreationData = Object.fromEntries(
    Object.entries(tag).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== "" && value !== null
    )
  ) as TagCreationData;

  const res = await fetch(`${apiBasename}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filteredTag),
  });
  if (!res.ok) {
    const msg: ErrorResponse = await res.json();
    throw new Error(msg.msg);
  }
  return res.json();
}

export async function delete_tag(id: number): Promise<void> {
  return fetch(`${apiBasename}/tags/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to delete tag");
    }
  });
}

export async function update_tag(id: number, tag: TagUpdateData): Promise<Tag> {
  try {
    const res: Response = await fetch(`${apiBasename}/tags/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    const updatedTag: Tag = await res.json();
    return updatedTag;
  } catch (error) {
    console.error("Error updating tag:", error);
    throw new Error("Failed to update tag");
  }
}
