import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/auth";
import { useState } from "react";
import { Container } from "../SignIn/styles";
import { Header, HeaderTitle, ImageArea } from "./styles";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import theme from "../../theme";
import { useData } from "../../hooks/data";


const baseUri = "http://192.168.0.106:3000";

export default function Profile({ navigation }: any) {

    const { signOut, user } = useAuth()
    const { userPosts } = useData()

    return (
        <Container style={styles.container}>
            <Header style={{ width: '90%' }}>
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
                        <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>0</Text>
                        <Text>seguidores</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>0</Text>
                        <Text>Seguindo</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM, fontSize: theme.FONT_SIZE.MD }}>{user?.name}</Text>
                </View>

            </Header>
            <View style={{ paddingTop: 20, width: '90%', gap: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                    style={{ paddingVertical: 5, flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: "center", backgroundColor: theme.TEXT.GRAY }}
                >
                    <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM }}>Editar Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={signOut}
                    style={{ paddingVertical: 5, flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: "center", backgroundColor: theme.COLORS.PRIMARY }}>
                    <Text style={{ fontWeight: theme.FONT_WEIGHT.MEDIUM, color: 'white'}}>Logout</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={userPosts.filter(post => post.post_images && post.post_images.length > 0 && post.post_images[0] != null)}
                renderItem={({ item }) => {

                    return (
                        <TouchableOpacity style={styles.imageArea}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.post_images[0].url.replace("http://localhost:3000", baseUri) }}
                                onError={(error) => console.error("Erro na imagem:", error.nativeEvent.error)} />
                        </TouchableOpacity>
                    );
                }}
                numColumns={3}
                contentContainerStyle={styles.contentContainer}
            />
        </Container>
    )
}


const styles = StyleSheet.create({
    container: {
    },
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
        width: (Dimensions.get("window").width / 3) * 0.9,
        aspectRatio: 1,
        resizeMode: "contain",
    },
    contentContainer: {
        marginTop: 30
    },
    imageArea: {
        borderColor: theme.COLORS.WHITE,
        borderWidth: 1,
    }
});