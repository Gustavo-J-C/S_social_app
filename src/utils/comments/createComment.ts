import { api } from "../../services/api"

export const createComment = async (userId: number, postId: number, description: string) => {
    try {
        const response = await api.post('/comments/create', {
            user_id: userId,
            postId,
            description
        })
        return response.data
        
    } catch (error: any) {
        console.error(error.response.data);
    }
}