import { Text, View } from "react-native";
import { useAuth } from "../hooks/auth";

export function Home() {

  const { signOut } = useAuth();

  return (
    <View>
        <Text>Home</Text>
    </View>
  );
}
