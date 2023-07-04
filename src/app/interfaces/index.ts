export interface INewsResponse {
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export interface IArticle {
    source: ISource;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content?: string;
}

export interface ISource {
    id?: string;
    name: string;
}

export interface ArticlesByCategoryAndPage{
    [key: string]: {
        page:number,
        articles: IArticle[]
    }
}