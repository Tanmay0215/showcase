export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}
