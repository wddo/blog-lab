export type Comment = {
  post_id: string;
  id: string;
  author: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};

export type BlogPostItem = {
  id: string;
  title: string;
  post_images: PostImage[];
  content: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

export type PostImage = {
  id: string;
  post_id: string;
  image_name: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};
