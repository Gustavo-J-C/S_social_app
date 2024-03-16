import { Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import { useAuth } from "../../hooks/auth";
import { Container, Header, ImageArea, StatusArea } from "./styles";
import theme from "../../theme";
import { useData } from "../../hooks/data";
import { useState } from "react";
import background from "../../assets/imgs/background.png";
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
            }>

            <Image
                style={styles.background}
                source={background}
            />


            <FlatList
                data={userPosts.filter(post => post.post_images && post.post_images.length > 0 && post.post_images[0] != null)}
                ListHeaderComponent={() => (
                    <>
                        <Header>
                            <Text style={{ color: theme.COLORS.WHITE, fontSize: theme.FONT_SIZE.LG, textAlign: 'center', }}>@{user?.name}</Text >

                            <ImageArea style={{ marginTop: (Dimensions.get("window").height * 0.04) }}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={{ uri: user?.image?.url || 'https://i.stack.imgur.com/YQu5k.png' }}
                                />
                            </ImageArea>

                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>{user?.nickName}</Text>
                            </View>

                            <StatusArea style={{ backgroundColor: theme.COLORS.GRAY_200 }}>

                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD, marginRight: 4 }}>{userPosts.length}</Text>
                                    <Text>Publicações</Text>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD, marginRight: 4 }}>{userFollowers}</Text>
                                    <Text>seguidores</Text>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD, marginRight: 4 }}>{userFollowing}</Text>
                                    <Text>Seguindo</Text>
                                </View>
                            </StatusArea>
                        </Header>

                        <View style={{ paddingTop: 20, gap: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity
                                onPress={() => navigation.push("EditProfile")}
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
        width: 110,
        height: 110,
        borderRadius: 100,
        borderColor: theme.COLORS.WHITE,
        borderWidth: 4.2,
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
    },
    background: {
        width: Dimensions.get("window").width * 2,
        height: Dimensions.get("window").height * 0.47,
        marginTop: -(Dimensions.get("window").height * 0.23),
        marginBottom: -(Dimensions.get("window").height * 0.15),
        borderBottomLeftRadius: Dimensions.get("window").width,
        borderBottomRightRadius: Dimensions.get("window").width,
    }
});