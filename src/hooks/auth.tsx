import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
    Dispatch,
    SetStateAction
} from "react";
import { api } from "../services/api";
import Toast from "react-native-toast-message";
import { User } from "../@types/user";

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
    user: User;
    loadingUser: boolean;
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signUp: (credentials: ISignUpCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    setUser: Dispatch<SetStateAction<User>>;
}

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [loadingUser, setLoadingUser] = useState(true);

    async function signIn({
        email,
        password,
    }: ISignInCredentials) {
        try {
            const response = await api.post("auth/login",
                {
                    email,
                    password,
                },
            );

            const responseData = response.data.data
            if (responseData?.token) {
                api.defaults.headers.authorization = responseData.token;

                const userData = responseData.user
                const dataSave: User = {
                    id: userData.id,
                    name: userData.name,
                    nickName: userData.nickname,
                    email,
                };

                console.log(userData);

                await AsyncStorage.setItem("USER", JSON.stringify(dataSave));
                await AsyncStorage.setItem("TOKEN", responseData.token);
                await AsyncStorage.setItem("REFRESH_TOKEN", responseData?.refreshToken);

                setUser(dataSave);
            } else {
                throw new Error("Token not received");
            }
        } catch (error) {
            console.error(error);
            throw error;
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

                const userData = responseData.data.user

                const dataSave: User = {
                    id: userData.id,
                    name: userData.name,
                    nickName: userData.userName,
                    email,
                };

                setUser(dataSave);
                await AsyncStorage.setItem("USER", JSON.stringify(dataSave));
                await AsyncStorage.setItem("TOKEN", responseData.token);
                await AsyncStorage.setItem("REFRESH_TOKEN", responseData?.refreshToken);

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
        const refreshTokenStoraged = await AsyncStorage.getItem("REFRESH_TOKEN") || "";

        if (userStorage && tokenStorage) {
            const userLogged = JSON.parse(userStorage) as User;
            api.defaults.headers.authorization = tokenStorage;
            renewToken(refreshTokenStoraged);
            setUser({ ...userLogged });
            setLoadingUser(false);
        }
    }

    async function signOut() {
        try {
            setUser({} as User);
            await AsyncStorage.removeItem("USER");
            await AsyncStorage.removeItem("TOKEN");
            await AsyncStorage.removeItem("REFRESH_TOKEN");
            api.defaults.headers.authorization = null;
        } catch (error) {
            console.error(error);
        }
    }

    async function renewToken(oldRefreshToken: string) {
        try {
            const response = await api.post("/auth/refresh-token", null, { headers: { refresh_token: oldRefreshToken } });

            const { accessToken, refreshToken } = response?.data;

            if (accessToken) {
                api.defaults.headers.authorization = accessToken;

                await AsyncStorage.setItem("TOKEN", accessToken);
                await AsyncStorage.setItem("REFRESH_TOKEN", refreshToken);

                Toast.show({
                    type: "success",
                    text1: "Sucesso",
                    text2: "Token renovado com sucesso!",
                    position: "bottom",
                });
            } else {
                throw new Error("New accessToken not received");
            }
        } catch (error: any) {
            console.error("Error renewing token:", error.response.data);
            //   throw error;
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
                setUser,
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