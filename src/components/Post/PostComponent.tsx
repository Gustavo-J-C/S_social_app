import React, { useEffect, useState } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Dimensions, FlatList, Image, ImageStyle, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from "react-native";
import { Post } from '../../@types/posts'
import { ViewStyle } from "react-native";
import theme from "../../theme";
import { useData } from "../../hooks/data";
import checkTimePassed from "../../utils/checkTimePassed";

type PropType = {
    navigation: any
    post: Post
    handleComment: (postId: number) => void,
}

const windowWidth = Dimensions.get('window').width;

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
    emptyImage: ImageStyle;
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
    emptyImage: {
        height: windowWidth,
        width: 350,
    }
};

export default function PostComponent({navigation, post, handleComment }: PropType) {
    const images = post.post_images;

    const [liked, setLiked] = useState(post.user_liked ? true : false);
    const [likes, setLikes] = useState<number>(post.like_count);
    const [currentImage, setCurrentImage] = useState(1)


    const timePassed = checkTimePassed(post.created_at);
    const { likePost, unlikePost, getUserInfo } = useData();

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
                const response = await unlikePost(post.id);
                setLiked(false);
                setLikes((prev) => (likes - 1));
            } else {
                await likePost(String(post.id));
                setLiked(true);
                setLikes(likes + 1);
            }

        } catch (error: any) {
            console.error(error.response);
        }
    };

    const calculateCurrentImage = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const imageWidth = Dimensions.get("window").width * 0.9;
        const index = Math.floor(contentOffset / imageWidth) + 1;
        setCurrentImage(index);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.push("ProfileOthers", { userName: username, userId: post.users_id})} style={styles.header}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.timestamp}>{timePassed}</Text>
            </TouchableOpacity>
            {images?.length > 1 &&
                <View style={{ flexDirection: 'row', alignItems: 'baseline', position: 'absolute', top: 45, paddingVertical: 7, zIndex: 1, justifyContent: 'center', left: '80%',  paddingHorizontal: 8, borderRadius: 25, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <Text style={{ fontWeight: theme.FONT_WEIGHT.LIGHT, fontSize: 10, color: 'white' }}>{currentImage} / {images.length}</Text>
                </View>
            }
            <FlatList
                data={images}
                horizontal={true}
                keyExtractor={(item) => String(item.id)}
                // ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                onScroll={(event) => calculateCurrentImage(event)}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 80
                }}
                ListEmptyComponent={<View style={styles.emptyImage}></View>}
                renderItem={({ item }) =>
                    <Image
                        style={styles.image}
                        source={{ uri: item?.url }}
                        onError={(error) => console.error("Erro na imagem:", error.nativeEvent.error)} />
                }
            />
            <View style={styles.actionsContainer}>
                <View style={styles.plusIcon}>
                    <Feather name="plus-circle" size={25} color={theme.COLORS.PRIMARY} />
                </View>
                <View style={styles.actionsGroup}>
                    <TouchableOpacity style={styles.actionItem}>
                        <Text>{post.comment_count}</Text>
                        <FontAwesome name="commenting-o" onPress={() => { handleComment(post.id) }} size={25} color={theme.COLORS.PRIMARY} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleToggleLike} style={styles.actionItem}>
                        <Text>{likes}</Text>
                        <FontAwesome name={liked ? "heart" : "heart-o"} size={25} color={liked ? "red" : theme.COLORS.PRIMARY} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

