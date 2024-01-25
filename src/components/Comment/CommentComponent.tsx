import { useEffect, useState } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Dimensions, Image, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native";
import { ViewStyle } from "react-native";
import theme from "../../theme";
import { useData } from "../../hooks/data";
import checkTimePassed from "../../utils/checkTimePassed";
import { Comment } from "../../@types/comments";

type PropType = {
    comment: Comment
}

type StylesType = {
    container: ViewStyle;
    header: ViewStyle;
    username: TextStyle;
    timePassed: TextStyle;
    description: TextStyle;
    timestamp: ViewStyle;
    image: ImageStyle;
    actionsContainer: ViewStyle;
    actionsGroup: ViewStyle;
    actionItem: ViewStyle;
    actionItens: ViewStyle;
};

const styles: StylesType = {
    container: {
        width: Dimensions.get("window").width * 0.9,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    header: {
        height: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    username: {
        fontSize: theme.FONT_SIZE.MD,
        color: theme.TEXT.BLACK,
        fontWeight: theme.FONT_WEIGHT.BOLD
    },
    timestamp: {
        marginRight: 20,
    },
    image: {
        width: Dimensions.get("window").width * 0.9,
        aspectRatio: 1.2,
        resizeMode: "contain"
    },
    actionsContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        height: 30,
    },
    description: {
        color: theme.COLORS.BLACK,
        fontSize: theme.FONT_SIZE.SM
    },
    timePassed: {
        color: theme.TEXT.SECONDARY,
        fontSize: theme.FONT_SIZE.XS
    },
    actionsGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'baseline',
        marginRight: 5,
        gap: 20,
    },
    actionItem: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 5,
    },
    actionItens: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 5,
    }
};


export default function CommentComponent({ comment }: PropType) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState<number>(0);


    
    const timePassed = checkTimePassed(comment.created_at);
    const { likePost, unlikePost, getUserInfo } = useData();

    const [username, setUsername] = useState("");

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
            <View style={styles.header}>
                <Text style={styles.username}>{username}</Text>
            </View>
            <View style={styles.actionsContainer}>
                <Text style={styles.description}>{comment.description}</Text>
            </View>
            <View style={styles.actionsGroup}>
                <Text style={styles.timePassed}>{timePassed}</Text>
            </View>
        </View>
    );
}

