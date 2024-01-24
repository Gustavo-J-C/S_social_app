import React from "react";
import { Feather, Octicons, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home/index";
import { Platform, View } from "react-native";
import theme from "../theme";
import Profile from "../screens/profile";
import { Add } from "../screens/add";
import { HomeRoutes } from "./homeRoutes";
import { useAuth } from "../hooks/auth";

const Tab = createBottomTabNavigator();

export function TabRoutes() {

    const {user} = useAuth()
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: theme.COLORS.PRIMARY,
                tabBarInactiveTintColor: theme.TEXT.TERTIARY,
                tabBarStyle: {
                    paddingBottom: 6,
                    height: 58,
                },
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
                    }

                    return iconComponent;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeRoutes}
                // options={{
                //     tabBarBadge: 3,
                // }}
            />
            <Tab.Screen
                name="Add"
                component={Add}
            />
            <Tab.Screen
                name="Profile"
                options={({ navigation, route }) => ({
                    headerShown: true,
                    headerShadowVisible: false,
                    title: user?.name,
                })}
                component={Profile}
            />
        </Tab.Navigator>
    );
}
