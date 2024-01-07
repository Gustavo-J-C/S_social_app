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

interface IUser {
    id: number,
    name: string,
    email: string,
    image?: string
}

interface ISignUpCredentials {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ISignInCredentials {
    email: string;
    password: string;
}

interface IAuthContextData {
    user: IUser | undefined;
    loadingUser : boolean;
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signUp: (credentials: ISignUpCredentials) => Promise<void>;
    signOut: () => Promise<void>;
}

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<IUser>();
    const [loadingUser, setLoadingUser] = useState(true);

    async function signIn({
        email,
        password,
    }: ISignInCredentials) {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });
            const responseData = response?.data?.data;

            if (responseData?.token) {
                api.defaults.headers.authorization = responseData?.token;

                const dataSave = {
                    id: responseData.user.id,
                    name: responseData.user.name,
                    email,
                };

                await AsyncStorage.setItem("USER", JSON.stringify(dataSave));
                await AsyncStorage.setItem("TOKEN", responseData.token);

                setUser(dataSave);
                Toast.show({
                    type: "success",
                    text1: "Sucesso",
                    text2: "Login realizado com sucesso!",
                    position: "bottom",
                });
            } else {
                throw new Error("Token not received");
            }
        } catch (error) {
            console.error(error);
            throw error; // Lançar a exceção para ser capturada no componente SignIn
        }
    }

    async function signUp({
        name,
        email,
        password,
        confirmPassword
    }: ISignUpCredentials) {
        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
                confirmPassword
            });

            const responseData = response?.data?.data;

            if (responseData?.token) {
                api.defaults.headers.authorization = responseData?.token;

                const dataSave = {
                    id: responseData.user.id,
                    name: responseData.user.name,
                    email,
                };

                setUser(dataSave);
                await AsyncStorage.setItem("USER", JSON.stringify(dataSave));
                await AsyncStorage.setItem("TOKEN", responseData.token);

            } else {
                throw new Error("Token not received");
            }
        } catch (error) {
            console.error(error);
            throw error; // Lançar a exceção para ser capturada no componente SignUp
        }
    }

    async function loadStorageData() {
        const userStorage = await AsyncStorage.getItem("USER");
        const tokenStorage = await AsyncStorage.getItem("TOKEN");

        if (userStorage && tokenStorage) {
            const userLogged = JSON.parse(userStorage) as IUser;
            api.defaults.headers.authorization = tokenStorage;

            setUser({ ...userLogged });
            setLoadingUser(false);
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
                loadingUser,
                signIn,
                signUp,
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