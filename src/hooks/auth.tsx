import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useState,
    useContext,
    ReactNode
} from "react";
import { api } from "../services/api";

interface IUser {
    id: BigInt,
    name: string,
    email: string
}

interface ISignInCredentials {
    email: string;
    password: string;
}

interface IAuthContextData {
    user: IUser;
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
}

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<IUser>({} as IUser);

    async function signIn({
        email,
        password,
    }: ISignInCredentials) {
        try {
            const response = await api.post("/login", {
                email,
                password,
            });
            if (response.data?.token) {
                api.defaults.headers.authorization = response.data?.token;

                const dataSave = {
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email,
                }

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
            return
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

    return (
        <AuthContext.Provider
            value={{
                user,
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