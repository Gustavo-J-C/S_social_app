import { api } from "../../services/api"

export const createComment = async (userId: number, postId: string, description: string) => {
    try {
        const response = await api.post('/comments/create', {
            userId,
            postId,
            description
        })
        console.log(response);
        
    } catch (error: any) {
        console.error(error);
    }
}