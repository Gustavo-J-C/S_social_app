import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import ProfileOthers from "../screens/profileOthers";

const { Navigator, Screen } = createNativeStackNavigator();

export function HomeRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Index">
            <Screen name="Index" component={Home} />
            <Screen name="ProfileOthers" component={ProfileOthers}
                options={({ route }: any) => ({
                    contentStyle: {
                        backgroundColor: "#fff"
                    },
                    headerShown: true,
                    headerShadowVisible: false,
                    title: route.params?.userName,
                })
                } />
        </Navigator>
    );
}
