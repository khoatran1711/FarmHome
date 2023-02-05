export const URL_GET_NEWS = 'admin/news/';

export interface NewsDetail {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  imageBanner: string;
  imageContent: string;
  category: string;
}
