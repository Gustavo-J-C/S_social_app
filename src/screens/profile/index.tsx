import { Dimensions, FlatList, Image, ImageBackground, Modal, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/auth";
import HeaderBG from '../../assets/imgs/profileHeaderBG.png';
import { Container, Header, ImageArea, TextLG, TextMD } from "./styles";
import { FontAwesome, } from "@expo/vector-icons";
import theme from "../../theme";
import { useData } from "../../hooks/data";
import { useEffect, useState } from "react";

export default function Profile({ navigation }: any) {

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { signOut, user } = useAuth()
    const { userPosts, userFollowing, userFollowers, fetchUserData } = useData()

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            setModalVisible(false);
        });

        return unsubscribeFocus;
    }, [navigation]);

    const [modalVisible, setModalVisible] = useState(false);

    const handleGearIconPress = () => {
        setModalVisible(true); // Mostrar o modal
    };

    return (
        <Container
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => fetchUserData().finally(() => setRefreshing(false))}
                />
            }
        >
            <StatusBar backgroundColor={"transparent"} barStyle={"light-content"} />
            <View style={styles.container}>
                <ImageBackground
                    source={HeaderBG}
                    style={styles.imageBackground}
                >
                    <View style={styles.content}>
                        <Text style={[styles.text, styles.textCenter]}>{user.nickName}</Text>
                        <TouchableOpacity onPress={handleGearIconPress}>
                            <FontAwesome size={25} color={'white'} name="gear" />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <ImageArea>
                    <Image
                        style={[styles.tinyLogo, { alignSelf: 'center' }]}
                        source={{ uri: user?.image?.url || 'https://i.stack.imgur.com/YQu5k.png' }}
                    />
                </ImageArea>
            </View>
            <FlatList
                data={userPosts?.filter(post => post.post_images && post.post_images.length > 0 && post.post_images[0] != null)}
                ListHeaderComponent={() => (
                    <>
                        <Header>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM, fontSize: theme.FONT_SIZE.XL }}>{user?.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', backgroundColor: '#F6F7F9', borderRadius: 10, justifyContent: 'space-evenly', width: '100%', height: 40, alignSelf: 'center' }}>
                                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>{userPosts.length}</Text>
                                    <Text>Publicações</Text>
                                </View> */}
                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                                    <TextLG>{userFollowers}</TextLG>
                                    <Text style={{ fontSize: theme.FONT_SIZE.LG, color: theme.TEXT.PLACEHOLDER }}>seguidores</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                                    <TextLG>{userFollowing}</TextLG>
                                    <Text style={{ fontSize: theme.FONT_SIZE.LG, color: theme.TEXT.PLACEHOLDER }}>Seguindo</Text>
                                </View>
                            </View>

                        </Header>
                        {/* <View style={{ paddingTop: 20, gap: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
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
                        </View> */}
                    </>
                )}
                renderItem={({ item, index }) => {

                    return (
                        <TouchableOpacity
                            style={
                                {
                                    borderRightWidth: index % 2 === 0 ? 15 : 0,
                                    borderBottomWidth: 15,
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
                ItemSeparatorComponent={
                    () => <View style={{ width: 100, backgroundColor: 'pink' }}></View>
                }
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                contentContainerStyle={styles.contentContainer}
                ListHeaderComponentStyle={{ width: "100%", alignItems: "center", marginBottom: 30, paddingHorizontal: 20 }}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ height: '100%', width: '100%', position: 'absolute' }}><Text>123</Text></TouchableOpacity>
                    <View style={{ backgroundColor: theme.COLORS.GRAY_200, marginBottom: 5, paddingVertical: 20, width: '98%', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: theme.COLORS.WHITE, width: '90%', borderRadius: 15, paddingHorizontal: 20, paddingVertical: 20 }}>
                            <TouchableOpacity
                                onPress={() => navigation.push("EditProfile")}
                                style={{ paddingVertical: 5, height: 40, borderRadius: 5 }}
                            >
                                <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM }}>Editar Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={signOut}
                                style={{ paddingVertical: 5, height: 40, borderRadius: 5, flexDirection: 'row',  }}>
                                <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM, }}>Mudar ordem de postagens</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={signOut}
                                style={{ paddingVertical: 5, height: 40, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM, color: 'red' }}>Logout</Text>
                                <FontAwesome size={25} color={'red'} name="sign-out" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Container>
    )
}


const styles = StyleSheet.create({
    tinyLogo: {
        width: 80,
        height: 80,
        borderRadius: 45,
        borderColor: "white",
        borderWidth: 3,
    },
    container: {
        flex: 1,
        width: '120%',
    },
    imageBackground: {
        width: '100%',
        height: 150,
        borderBottomLeftRadius: 120,
        borderBottomRightRadius: 120,
        overflow: 'hidden',
        // justifyContent: 'flex-end', // Alinha o conteúdo ao fundo
        // paddingBottom: 30, // Espaçamento inferior
    },
    content: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        width: '70%'
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
    },
    textCenter: {
        flex: 1,
        textAlign: 'center',
    },
    logo: {
        width: 66,
        height: 58,
    },
    image: {
        width: (Dimensions.get("window").width / 2.5),
        aspectRatio: 1,
        borderRadius: 15,
        resizeMode: "contain",
    },
    contentContainer: {
        alignItems: "center",
        width: Dimensions.get("window").width,
        // justifyContent: 'flex-start'
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end", // Alinhar o conteúdo na parte inferior da tela
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Cor de fundo semitransparente para o modal
    },
});