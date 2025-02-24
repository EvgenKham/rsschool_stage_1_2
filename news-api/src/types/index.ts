export type TSource = {
    name: string;
    id: string;
};
export interface INews {
    source: TSource;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
}
