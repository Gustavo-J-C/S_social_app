import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Image } from 'react-native';
import { FontAwesome, } from "@expo/vector-icons";
import Profile from "../screens/profile";
import { EditProfile } from "../screens/profile/editProfile";
import { useAuth } from "../hooks/auth";

// const Drawer = createDrawerNavigator();
const { Navigator, Screen } = createNativeStackNavigator();


export function ProfileRoutes() {

    const { user } = useAuth()

    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Index">
            <Screen name="Index" component={Profile}
                options={({ navigation, route }: any) => ({
                    headerShown: false,
                    headerRight: () => (
                        <View style={{ marginRight: 10 }}>
                            <FontAwesome size={25} color={'white'} name="gear" />
                        </View>
                    ),
                    headerTitleAlign: "center",
                    headerTitleStyle: { color: 'white' },
                    headerShadowVisible: false,
                    title: `@${user?.name}`,
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
