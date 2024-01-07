import React, { useEffect, useState } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Dimensions, Image, ImageStyle, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Post } from '../../@types/posts'
import { ViewStyle, FlexAlignType } from "react-native";
import theme from "../../theme";
import { useData } from "../../hooks/data";
import checkTimePassed from "../../utils/checkTimePassed";
import { string } from "zod";

const baseUri = "http://192.168.0.106:3000";

type PropType = {
    post: Post
    handleComment: (postId: string) => void,
}

type StylesType = {
    container: ViewStyle;
    header: ViewStyle;
    username: ViewStyle;
    timestamp: ViewStyle;
    image: ImageStyle;
    actionsContainer: ViewStyle;
    plusIcon: ViewStyle;
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
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    username: {
        marginLeft: 20,
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
        height: 50,
    },
    plusIcon: {
        marginLeft: 20,
    },
    actionsGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 20,
        gap: 20,
    },
    actionItem: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 5,
    },
};


export default function PostComponent({ post, handleComment }: PropType) {
    const images = post.post_images;
    
    const [liked, setLiked] = useState(post.user_liked ? true : false);
    const [likes, setLikes] = useState<number>(post.like_count);

    const timePassed = checkTimePassed(post.created_at);
    const { likePost, unlikePost, getUserInfo, getPostLikes } = useData();

    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo(post.users_id);
                setUsername(userInfo.name);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleToggleLike = async () => {
        try {
            if (liked) {
                await unlikePost(String(post.id));
                setLiked(false);
                setLikes(likes - 1);
            } else {
                await likePost(String(post.id));
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
                <Text style={styles.timestamp}>{timePassed}</Text>
            </View>
            {images && images.length > 0 && <Image
                style={styles.image}
                source={{ uri: images[0]?.url?.replace("http://localhost:3000", baseUri) }}
                onError={(error) => console.error("Erro na imagem:", error.nativeEvent.error)} />}
            <View style={styles.actionsContainer}>
                <View style={styles.plusIcon}>
                    <Feather name="plus-circle" size={25} color={theme.COLORS.PRIMARY} />
                </View>
                <View style={styles.actionsGroup}>
                    <View style={styles.actionItem}>
                        <Text>{post.comment_count}</Text>
                        <FontAwesome name="commenting-o" onPress={() => handleComment(String(post.id))} size={25} color={theme.COLORS.PRIMARY} />
                    </View>
                    <TouchableOpacity onPress={handleToggleLike} style={styles.actionItem}>
                        <Text>{likes}</Text>
                        <FontAwesome name={liked ? "heart" : "heart-o"} size={25} color={liked ? "red" : theme.COLORS.PRIMARY} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

