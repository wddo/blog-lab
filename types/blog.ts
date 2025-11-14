export interface IComment {
  post_id: string;
  id: string;
  author: string;
  content: string;
  created_at?: string;
}

export interface IBlogPostItem {
  id: string;
  title: string;
  imageUrl?: string[];
  content: string;
}
