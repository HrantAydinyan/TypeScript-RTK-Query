export interface IAuthUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    image: string;
    is_active: boolean;
}

export interface IAuth {
    user: IAuthUser | null;
    isLogedIn: boolean;
}
