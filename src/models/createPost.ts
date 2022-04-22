export interface ICreatePost {
    title: string;
    description: string;
    category: number;
    image: Blob | string | null;
}
