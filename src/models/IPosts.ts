export interface IPostInitial {
    posts: IPost[] | null;
}

export interface ICategory {
    id: number;
    name: string;
    slug: string;
}

export interface IAUthor {
    full_name: string;
    id: number;
}

export interface IPost {
    id: number;
    author: IAUthor;
    category: ICategory;
    description: string;
    image: string;
    title: string;
}

export interface IPostResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPost[];
}

export interface IPostResponseSingle {
    id: number;
    title: string;
    description: string;
    image: string;
    category: ICategory;
    author: IAUthor;
}

export interface ICategory {
    id: number;
    name: string;
    slug: string;
}
