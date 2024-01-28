import { Post } from "./posts";

export type User = {
    id: number,
    name: string,
    email: string,
    image?: string
}

export interface ProfileData {
    posts: Post[];
    isFriend: boolean;
    following: {
        count: number;
        data: User[];
    };
    followers: {
        count: number;
        data: User[];
    };
}