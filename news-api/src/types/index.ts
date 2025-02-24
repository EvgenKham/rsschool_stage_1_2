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

export type TResponse = {
    cataegory: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

interface IResponse {
    status: string;
}
export interface IResponseNews extends IResponse {
    results: number;
    articles: Array<INews>;
}

export interface IResponceSources extends IResponse {
    sources: Array<TResponse>;
}
export abstract class Drawer<T> {
    abstract draw(data: Array<T>): void;
}

export type TCallback<T> = (data: T) => void;
