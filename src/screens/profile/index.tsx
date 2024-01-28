import { Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/auth";
import { Container, Header, ImageArea } from "./styles";
import theme from "../../theme";
import { useData } from "../../hooks/data";
import { useState } from "react";

export default function Profile({ navigation }: any) {

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { signOut, user } = useAuth()
    const { userPosts, userFollowing, userFollowers, fetchUserData } = useData()

    return (
        <Container
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => fetchUserData().finally(() => setRefreshing(false))}
                />
            }
        >
            <FlatList
                data={userPosts.filter(post => post.post_images && post.post_images.length > 0 && post.post_images[0] != null)}
                ListHeaderComponent={() => (
                    <>
                        <Header>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <ImageArea>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={{ uri: 'https://i.stack.imgur.com/YQu5k.png' }}
                                    />
                                </ImageArea>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>{userPosts.length}</Text>
                                    <Text>Publicações</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>{userFollowers}</Text>
                                    <Text>seguidores</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>{userFollowing}</Text>
                                    <Text>Seguindo</Text>
                                </View>
                            </View>
                            <View style={{ paddingTop: 10, justifyContent: 'center' }}>
                                <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM, fontSize: theme.FONT_SIZE.MD }}>{user?.name}</Text>
                            </View>

                        </Header>
                        <View style={{ paddingTop: 20, gap: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity
                                style={{ paddingVertical: 5, flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: "center", backgroundColor: theme.TEXT.GRAY }}
                            >
                                <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM }}>Editar Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={signOut}
                                style={{ paddingVertical: 5, flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: "center", backgroundColor: theme.COLORS.PRIMARY }}>
                                <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM, color: 'white' }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                renderItem={({ item, index }) => {

                    return (
                        <TouchableOpacity
                            style={
                                {
                                    borderRightWidth: index % 3 === 2 ? 0 : 2,
                                    borderBottomWidth: 2,
                                    borderColor: "#fff" // Adiciona margem inferior, exceto para as imagens na última linha
                                }
                            }>
                            <Image
                                style={styles.image}
                                source={{ uri: item.post_images[0].url }}
                                onError={(error) => console.error("Erro na imagem:", error.nativeEvent.error)} />
                        </TouchableOpacity>
                    );
                }}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                contentContainerStyle={styles.contentContainer}
                ListHeaderComponentStyle={{ width: "100%", alignItems: "center", marginBottom: 30, paddingHorizontal: 20 }}
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
        justifyContent: 'flex-start'
    }
});