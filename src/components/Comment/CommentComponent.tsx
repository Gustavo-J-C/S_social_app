import React, { useEffect, useState } from "react";
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
    timestamp: ViewStyle;
    image: ImageStyle;
    actionsContainer: ViewStyle;
    description: ViewStyle;
    actionsGroup: ViewStyle;
    actionItem: ViewStyle;
};

const styles: StylesType = {
    container: {
        width: Dimensions.get("window").width * 0.9,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 20,
    },
    header: {
        height: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    username: {
        marginLeft: 20,
        fontSize: 11
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
        marginLeft: 20,

    },
    actionsGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 5,
        gap: 20,
    },
    actionItem: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 5,
    },
};


export default function CommentComponent({ comment }: PropType) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState<number>(0);

    // const timePassed = checkTimePassed(comment.created_at);
    const { likePost, unlikePost, getUserInfo, getPostLikes } = useData();

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

    useEffect(() => {
        const fetchPostLikes = async () => {
            try {
                const likes = await getPostLikes(String(comment.id));

                // Atualiza o estado de liked e a quantidade de likes
                setLiked(likes.likedPost);
                setLikes(likes.likes.length);
            } catch (error) {
                console.error("Error fetching comment likes:", error);
            }
        };

        fetchPostLikes();
    }, [comment.id, getPostLikes]);

    const handleToggleLike = async () => {
        try {
            if (liked) {
                // Se já curtiu, então descurte
                await unlikePost(String(comment.id));
                setLiked(false);
                setLikes(likes - 1);
            } else {
                // Se não curtiu, então curte
                await likePost(String(comment.id));
                setLiked(true);
                setLikes(likes + 1);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.username}>{username}</Text>
            </View>
            <View style={styles.actionsContainer}>
                <View style={styles.description}>
                    <Text>{comment.description}</Text>
                </View>
                <View style={styles.actionsGroup}>
                    <TouchableOpacity onPress={handleToggleLike} style={styles.actionItem}>
                        <Text>{likes}</Text>
                        <FontAwesome name={liked ? "heart" : "heart-o"} size={20} color={liked ? "red" : theme.COLORS.PRIMARY} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

