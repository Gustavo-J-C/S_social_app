import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import ProfileOthers from "../screens/profileOthers";
import ViewPost from "../screens/viewPost";
import Comments from "../screens/comments";

const { Navigator, Screen } = createNativeStackNavigator();

export function HomeRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Index">
            <Screen name="Index" component={Home} />
            <Screen name="ViewPost" component={ViewPost}
                options={() => ({
                    headerShown: true,
                    headerTitle: "",
                    headerShadowVisible: false,
                    tabBarVisible: false,
                    contentStyle: {
                        backgroundColor: "#fff"
                    }
                })}
            />
            <Screen name="Comments" component={Comments}
                options={() => ({
                    headerShown: true,
                    tabBarStyle: { display: "none" },
                    headerTitleAlign: "center",
                    headerTitle: "Comentários",
                    headerShadowVisible: false,
                    contentStyle: {
                        backgroundColor: "#fff"
                    }
                })}
            />
            <Screen name="ProfileOthers" component={ProfileOthers}
                options={({ route }: any) => ({
                    contentStyle: {
                        backgroundColor: "#fff"
                    },
                    headerShown: false,
                    headerShadowVisible: false,
                    title: route.params?.userName,
                })
                } />
        </Navigator>
    );
}
