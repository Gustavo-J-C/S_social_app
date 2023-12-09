import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect
} from "react";
import { api } from "../services/api";
import Toast from "react-native-toast-message";
import { Post } from "../@types/posts";
import { useAuth } from "./auth";
import { createPost } from "../utils/posts/createPost";

interface IDataContextData {
    posts: Post[];
    loading: boolean;
    hasMorePosts: boolean;
    getPosts: (page?: string, pageSize?: string) => Promise<unknown>;
    likePost: (postId: string) => Promise<void>;
    unlikePost: (postId: string) => Promise<void>;
    getUserInfo: (userId: number) => Promise<any>;
    addPost: (postData: { description: string; }) => Promise<void>;
    getPostLikes: (postId: string, userId?: number | undefined) => Promise<any>;
}

interface IDataProviderProps {
    children: ReactNode;
}

const DataContext = createContext<IDataContextData>({} as IDataContextData);

function DataProvider({ children }: IDataProviderProps) {
    const { user } = useAuth()
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Inicializa a página como 1
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const userCacheKey = "@MyApp:userCache";

    const userCache: Record<number, any> = {};

    async function getInitialPosts() {
        try {
            setLoading(true);

            const response = await api.get(`/feed/posts?page=1`);

            setPosts(response.data.posts);
            setPage(2); // Incrementa a página para a próxima chamada

            setLoading(false);

            return { success: true };
        } catch (error) {
            console.error(error);
            setLoading(false);
            return error;
        }
    }

    async function addPost(postData: {description: string}) {
        await createPost('/feed/post' ,postData)
    }

    async function loadMorePosts() {
        try {
            setLoading(true);

            const response = await api.get(`/feed/posts?page=${page}`);            

            if (response.data.posts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMorePosts(false);
            }

            setLoading(false);

            return { success: true };
        } catch (error) {
            console.error(error);
            setLoading(false);
            return error;
        }
    }

    async function likePost(postId: string) {
        try {
            const response = api.post(`/feed/post/${postId}/like`)
        } catch (error) {
            console.error(error);
        }
    }

    async function getPostLikes(postId: string) {
        try {
            const response = await api.get(`/feed/post/${postId}/likes?userId=${user.id || ''}`);

            return response.data;
        } catch (error) {
            console.error(`Error fetching likes for post ${postId}:`, error);
            throw error;
        }
    }

    async function unlikePost(postId: string) {
        try {
            await api.delete(`/feed/post/${postId}/like`);
            // Atualiza o estado local para refletir a remoção do like
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    String(post.id) === postId ? { ...post, likedPost: false } : post
                )
            );
        } catch (error) {
            console.error(error);
        }
    }

    const getUserInfo = async (userId: number) => {
        const cachedUser = userCache[userId];
      
        if (cachedUser) { 
          return cachedUser;
        }
      
        try {
          const response = await api.get(`/profile/${userId}`);
          const userInfo = response.data;
      
          // Armazena as informações do usuário em cache
          userCache[userId] = userInfo;
          await AsyncStorage.setItem(userCacheKey, JSON.stringify(userCache));
      
          return userInfo;
        } catch (error) {
          console.error(`Error fetching user info for userId ${userId}:`, error);
          throw error;
        }
    };

    useEffect(() => {
        // Carrega o cache de usuários ao inicializar
        const loadUserCache = async () => {
            try {
                const cachedUsers = await AsyncStorage.getItem(userCacheKey);

                if (cachedUsers) {
                    const parsedCache = JSON.parse(cachedUsers);
                    Object.assign(userCache, parsedCache);
                }
            } catch (error) {
                console.error("Error loading user cache:", error);
            }
        };

        loadUserCache();
    }, []);

    useEffect(() => {
        user && getInitialPosts();
    }, [user]);

    return (
        <DataContext.Provider
            value={{
                posts,
                loading,
                hasMorePosts,
                getPosts: loadMorePosts, // Renomeando para refletir a funcionalidade de carregar mais posts
                likePost,
                unlikePost,
                getPostLikes,
                getUserInfo,
                addPost
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

function useData(): IDataContextData {
    const context = useContext(DataContext);

    return context;
}

export { DataProvider, useData };