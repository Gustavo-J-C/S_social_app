import { useState } from "react";
import { Comment } from "../../@types/comments";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { ActionsView, Container, DescriptionText, Header, Image, ItensArea, ProfileImage, TitleText, UserInfosView, UserName } from "./styles";
import theme from "../../theme";
import { useData } from "../../hooks/data";

export default function ViewPost({ navigation, route }: any) {

    const post = route.params?.post;

    const [liked, setLiked] = useState(post.user_liked ? true : false);
    const [likes, setLikes] = useState<number>(post.like_count);


    const { likePost, unlikePost } = useData();

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

    return (
        <ScrollView>
            <Header >
                <ProfileImage
                    source={{ uri: post.user?.users_image?.url || 'https://i.stack.imgur.com/YQu5k.png' }} />
                <UserInfosView style={{ flex: 1 }}>
                    <UserName>{post.user?.name}</UserName>
                    <Text>1 hour ago</Text>
                </UserInfosView>
            </Header>
            <FlatList
                data={post.post_images}
                horizontal={true}
                keyExtractor={(item) => String(item.id)}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 80
                }}
                renderItem={({ item }) =>
                    <Image
                        source={{ uri: item?.url }}
                        onError={(error) => console.error("Erro na imagem:", error.nativeEvent.error)} />
                }
            />
            <ActionsView >
                {/* <TouchableOpacity style={styles.actionItem}>
                    <Text>{post.comment_count}</Text>
                    <Feather name="eye" size={25} color={theme.COLORS.PRIMARY} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => navigation.push("Comments", {postId: post.id})}
                style={styles.actionItem}>
                    <Text>{post?.comment_count}</Text>
                    <FontAwesome name="commenting-o" size={25} color={theme.COLORS.PRIMARY} />
                </TouchableOpacity>
                <ItensArea onPress={handleToggleLike}>
                    <Text>{likes}</Text>
                    <FontAwesome name={liked ? "heart" : "heart-o"} size={25} color={liked ? "red" : theme.COLORS.PRIMARY} />
                </ItensArea>
            </ActionsView>
            <Container>
                <TitleText>{post?.title || ""}</TitleText>
                <DescriptionText>{post?.description}</DescriptionText>
            </Container>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    timestamp: {
        marginRight: 20,
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
        justifyContent: "space-evenly",
        marginRight: 20,
        marginTop: 10,
        gap: 25
    },
    actionItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        gap: 5,
    }
});