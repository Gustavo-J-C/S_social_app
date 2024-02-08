import { Post } from "./posts";

export type User = {
    id: number,
    name: string,
    email: string,
    nickName: string,
    image?: UserImage
}

export type UserImage = {
    id: number;
    post_id: number;
    originalname: string;
    type: string;
    path: string | null;
    url: string;
    filename: string;
    size: number;
    created_at: string;
    deleted_at: string | null;
};

export interface ProfileData {
    posts: Post[];
    isFriend: boolean;
    userImage?: UserImage
    following: number;
    followers: number;
}