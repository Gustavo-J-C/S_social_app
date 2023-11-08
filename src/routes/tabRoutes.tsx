import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/home";

const Tab = createBottomTabNavigator();

export function TabRoutes() {

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={25} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}