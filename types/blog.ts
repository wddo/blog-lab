export interface IComment {
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
