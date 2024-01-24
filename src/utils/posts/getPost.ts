import { api } from "../../services/api"

export const getPost = async ( postId: number) => {
    try {
        const { data: {data: {post}}} = await api.get(`feed/post/${postId}`)
        return post
    } catch (error) {
        console.error(error);  
    }
}