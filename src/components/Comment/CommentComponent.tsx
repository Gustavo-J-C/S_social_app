import { useEffect, useState } from "react";
import { Dimensions, Text, TextStyle, View } from "react-native";
import { ViewStyle } from "react-native";
import theme from "../../theme";
import { useData } from "../../hooks/data";
import checkTimePassed from "../../utils/checkTimePassed";
import { Comment } from "../../@types/comments";
import { useNavigation } from "@react-navigation/native";
import { Header, ProfileImage, UserInfosView, UserName } from ".";

type PropType = {
    comment: Comment
}

type StylesType = {
    container: ViewStyle;
    description: TextStyle;
    actionsContainer: ViewStyle;
};

const styles: StylesType = {
    container: {
        width: Dimensions.get("window").width * 0.9,
        backgroundColor: "#F6F7F9",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    actionsContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        height: 30,
        marginBottom: 5
    },
    description: {
        color: theme.COLORS.BLACK,
        fontWeight: theme.FONT_WEIGHT.REGULAR,
        fontSize: theme.FONT_SIZE.MD
    },
};


export default function CommentComponent({ comment }: PropType) {
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    
    const timePassed = checkTimePassed(comment.created_at);
    const { getUserInfo } = useData();


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo(comment.user_id);
                setUsername(userInfo.name);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, [comment.user_id]);

    return (
        <View style={styles.container}>
            <Header onPress={() => navigation.push("ProfileOthers", { userName: username, userId: comment.user_id})}>
                <ProfileImage
                    source={{ uri: comment?.user?.users_image?.url || 'https://i.stack.imgur.com/YQu5k.png' }} />
                <UserInfosView style={{ flex: 1 }}>
                    <UserName>{comment?.user?.name}</UserName>
                    <Text>{timePassed}</Text>
                </UserInfosView>
            </Header>
            <View style={styles.actionsContainer}>
                <Text style={styles.description}>{comment.description}</Text>
            </View>
        </View>
    );
}

