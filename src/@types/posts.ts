export type PostImage = {
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

// Definindo o tipo para um post
export type Post = {
    like_count: number;
    comment_count: number;
    user_liked: number
    id: number;
    users_id: number;
    title: string;
    description: string;
    created_at: string;
    deleted_at: string | null;
    post_images: PostImage[];
};