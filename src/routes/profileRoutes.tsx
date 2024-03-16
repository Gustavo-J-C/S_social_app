import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/profile";
import { EditProfile } from "../screens/profile/editProfile";
import { useAuth } from "../hooks/auth";

const { Navigator, Screen } = createNativeStackNavigator();

export function ProfileRoutes() {
    const { user } = useAuth()

    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Index">
            <Screen name="Index" component={Profile}
                options={({ navigation, route }) => ({
                    headerShown: false,
                    headerShadowVisible: false,
                    title: `@${user?.name}`,
                    headerTitleAlign: 'center',
                })}
            />
            <Screen name="EditProfile" component={EditProfile}
                options={({ route }: any) => ({
                    contentStyle: {
                        backgroundColor: "#fff"
                    },
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    title: "editar perfil",
                })
                } />
        </Navigator>
    );
}
