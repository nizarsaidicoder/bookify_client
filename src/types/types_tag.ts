type Tag = {
  id: number;
  name: string;
  color?: string;
};

type TagCreationData = {
  name: string;
  color?: string;
};

type TagUpdateData = Partial<TagCreationData>;

export type { Tag, TagCreationData, TagUpdateData };
