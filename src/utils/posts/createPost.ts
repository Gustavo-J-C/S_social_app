import { api } from "../../services/api"

export const createPost = async (apiUrl: string, postData: {description: string}) => {
    try {
        const response = await api.post(apiUrl, postData)
    } catch (error) {
        console.log(error);
        
    }
}