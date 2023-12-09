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

interface IUser {
    id: BigInt,
    name: string,
    email: string,
    image?: string
}

interface ISignInCredentials {
    email: string;
    password: string;
}

interface IAuthContextData {
    user: IUser;
    posts: Post[];
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
}

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [posts, setPosts] = useState<Post[]>([])

    async function signIn({
        email,
        password,
    }: ISignInCredentials) {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });
            const responseData = response?.data?.data
            
            if (responseData?.token) {
                
                api.defaults.headers.authorization = responseData?.token;

                const dataSave = {
                    id: responseData.user.id,
                    name: responseData.user.name,
                    email,
                }
                
                await AsyncStorage.setItem("USER", JSON.stringify(dataSave));
                await AsyncStorage.setItem(
                    "TOKEN",
                    responseData.token
                  );
                setUser(dataSave);
                Toast.show({
                    type: "error",
                    text1: "Opa",
                    text2: "Credenciais inválidas!",
                    position: "bottom",
                });

            } else {
                return;
            }
        } catch (error) {
            console.error(error);
            return
        }
    }

    async function loadStorageData() {
        const userStorage = await AsyncStorage.getItem("USER");
        const tokenStorage = await AsyncStorage.getItem("TOKEN");
    
        if (userStorage && tokenStorage) {
          const userLogged = JSON.parse(userStorage) as IUser;
          api.defaults.headers.authorization = tokenStorage;
    
          setUser({ ...userLogged });
        }
    }

    async function signOut() {
        try {
            setUser({} as IUser);
            await AsyncStorage.removeItem("USER");
            await AsyncStorage.removeItem("TOKEN");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadStorageData();
      }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                posts,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };