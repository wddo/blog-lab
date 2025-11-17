export type Comment = {
  post_id: string;
  id: string;
  author: string;
  content: string;
  created_at?: string;
};

export type BlogPostItem = {
  id: string;
  title: string;
  imageUrl?: string[];
  content: string;
};
