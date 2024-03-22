import { Feather, Octicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, View } from "react-native";
import theme from "../theme";
import { Add } from "../screens/add";
import { HomeRoutes } from "./homeRoutes";
import { ProfileRoutes } from "./profileRoutes";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Challenge from "../screens/challenge";

const Tab = createBottomTabNavigator();

export function TabRoutes() {

    return (
        <Tab.Navigator
            screenOptions={({ route }: any) => ({
                headerShown: false,
                tabBarActiveTintColor: theme.COLORS.PRIMARY,
                tabBarInactiveTintColor: theme.TEXT.TERTIARY,
                tabBarStyle: ((route) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                    const noTabRoutes = ["Comments", "ViewPost"]
                    let styleObj = {
                        paddingBottom: 6,
                        height: 58,
                        display: "auto",
                    }

                    if (noTabRoutes.includes(routeName)) {
                        styleObj.display = "none"
                    }
                    return styleObj
                })(route),
                tabBarShowLabel: Platform.OS === "ios",
                tabBarIcon: ({ focused, color, size }) => {
                    let iconComponent;

                    if (route.name === "Home") {
                        iconComponent = <Octicons name="home" size={focused ? size + 5 : size} color={color} />;
                    } else if (route.name === "Add") {
                        iconComponent = (
                            <View style={{ height: 60, width: 60, justifyContent: "center", alignItems: "center", borderRadius: 100, backgroundColor: theme.COLORS.PRIMARY, top: -20 }}>
                                <Feather name="plus" size={size} style={{ backgroundColor: "#fff", borderRadius: 5 }} color={theme.COLORS.PRIMARY} />
                            </View>
                        );
                    } else if (route.name === "Profile") {
                        iconComponent = <Octicons name="person" size={focused ? size + 5 : size} color={color} />;
                    } else if (route.name === "Challenge") {
                        iconComponent = <FontAwesome6 name="table-cells-large" size={focused ? size + 5 : size} color={color} />;
                    } else if (route.name === "activity") {
                        iconComponent = <Feather name="bell" size={focused ? size + 5 : size} color={color} />;
                    }

                    return iconComponent;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeRoutes}
            /><Tab.Screen
                name="Challenge"
                component={Challenge}
            />
            <Tab.Screen
                name="Add"
                component={Add}
            />
            <Tab.Screen
                name="activity"
                component={ProfileRoutes}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileRoutes}
            />
        </Tab.Navigator>
    );
}
