import * as ROUTES from './route_types';
import { SignIn, SignUp, Home, CreatePost } from '../../pages';

export const PUBLIC_ROUTES = [
    {
        title: 'Sign In',
        path: ROUTES.SIGN_IN,
        component: SignIn,
    },
    {
        title: 'Sign Up',
        path: ROUTES.SIGN_UP,
        component: SignUp,
    },
];
export const PROTECTED_ROUTES = [
    {
        title: 'Home',
        path: ROUTES.HOME,
        component: Home,
    },
    {
        title: 'Create Post',
        path: ROUTES.CREATE_POST,
        component: CreatePost,
    },
    {
        title: 'Edit Post',
        path: ROUTES.EDIT_POST,
        component: CreatePost,
    },
];
