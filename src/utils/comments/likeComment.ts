import { api } from "../../services/api";

export const likeComment = async (commentId: number) => {

    try {
        const response = api.post(`/feed/comments/${commentId}/like`)
    } catch (error) {
        console.error(error);
    }
}