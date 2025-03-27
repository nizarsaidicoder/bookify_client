import { Tag } from "@types";
import { apiBasename } from ".";

export function get_tags(): Promise<Tag[]> {
  return fetch(`${apiBasename}/tags`).then((res) => res.json());
}
