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
  post_images: PostImage[];
  content: string;
};

export type PostImage = {
  post_id: string;
  image_url: string;
  sort_order: number;
};
