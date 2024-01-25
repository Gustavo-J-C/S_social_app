import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/auth";
import { Container, Header, ImageArea } from "./styles";
import theme from "../../theme";
import { useData } from "../../hooks/data";
import { Post } from "../../@types/posts";
import { api } from "../../services/api";

export default function ProfileOthers({ navigation, route }: any) {

    const { signOut, user } = useAuth()
    const { getProfileData } = useData()
    const [profilePosts, setProfilePosts] = useState<Post[]>([])
    const [profileFollowers, setProfileFollowers] = useState<{ count: number, data: [] }>({} as { count: number, data: [] })
    const [profileFollowing, setProfileFollowing] = useState<{ count: number, data: [] }>({} as { count: number, data: [] })

    const userId = route.params.userId
    useEffect(() => {
        (async () => {
            const profileData: any = await getProfileData(userId)

            setProfilePosts(profileData.posts)
            setProfileFollowing(profileData.following)
            setProfileFollowers(profileData.followers)
        })();
    }, [route])

    const handleFollow = async () => {
        try {
            await api.post(`profile/follow`, {
                targetUserId: userId,
            })
        } catch (error) {
            
        }
    }

    return (
        <Container >
            <Header style={{ width: '90%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ImageArea>
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: 'https://i.stack.imgur.com/YQu5k.png' }}
                        />
                    </ImageArea>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>{profilePosts.length}</Text>
                        <Text>Publicações</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>{profileFollowers.count}</Text>
                        <Text>seguidores</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>{profileFollowing.count}</Text>
                        <Text>Seguindo</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM, fontSize: theme.FONT_SIZE.MD }}>{route.params.userName}</Text>
                </View>

            </Header>
            <View style={{ paddingTop: 20, width: '90%', gap: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                onPress={userId == user?.id ? false : handleFollow}
                    style={{ paddingVertical: 5, flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: "center", backgroundColor: theme.TEXT.GRAY }}
                >
                    {userId == user?.id ?
                        <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM }}>Editar Perfil</Text>
                        :
                        <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM }}>Seguir</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={signOut}
                    style={{ paddingVertical: 5, flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: "center", backgroundColor: theme.COLORS.PRIMARY }}>
                    <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM, color: 'white' }}>Logout</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={profilePosts?.filter(post => post.post_images && post.post_images.length > 0 && post.post_images[0] != null)}
                renderItem={({ item }) => {

                    return (
                        <TouchableOpacity style={styles.imageArea}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.post_images[0].url }}
                                onError={(error) => console.error("Erro na imagem:", error.nativeEvent.error)} />
                        </TouchableOpacity>
                    );
                }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                numColumns={3}
                contentContainerStyle={styles.contentContainer}
            />
        </Container>
    )
}


const styles = StyleSheet.create({
    tinyLogo: {
        width: 70,
        height: 70,
        borderRadius: 45
    },
    logo: {
        width: 66,
        height: 58,
    },
    image: {
        width: (Dimensions.get("window").width / 3),
        aspectRatio: 1,
        resizeMode: "contain",
    },
    contentContainer: {
        alignItems: "flex-start",
        width: Dimensions.get("window").width,
        marginTop: 30,
        justifyContent: 'flex-start'
    },
    imageArea: {
        borderColor: theme.COLORS.WHITE,
        borderWidth: 1,
    }
});