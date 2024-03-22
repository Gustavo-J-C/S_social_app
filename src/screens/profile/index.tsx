import { Dimensions, FlatList, Modal, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/auth";
import HeaderBG from '../../assets/imgs/profileHeaderBG.png';
import { Container, MainContainer, ImageArea, StatusArea, TinyLogo, Header, TextWrapper, ModalContainer, HeaderBGImage, Image, StyledTouchableOpacity } from "./styles";
import { FontAwesome, } from "@expo/vector-icons";
import theme from "../../theme";
import { useData } from "../../hooks/data";
import { useEffect, useState } from "react";
import { TextInput } from "../SignIn/styles";
import { Post } from "../../@types/posts";

const PostComponent = ({ item, index, editingPostions, handlePositionChange }: any) => {
    const [inputValue, setInputValue] = useState(String(index + 1));

    return (
        <View
            style={
                {
                    borderRightWidth: index % 2 === 0 ? 15 : 0,
                    borderBottomWidth: 15,
                    borderColor: "#fff"
                }
            }>
            {editingPostions ?
                <StyledTouchableOpacity>
                    <TextInput
                        style={{ height: 20, minWidth: 30 }}
                        textAlign="center"
                        value={inputValue}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            setInputValue(text.replace(/[^0-9]/g, ''));
                        }
                        }
                        onEndEditing={() => {
                            if (inputValue != index + 1) {
                                handlePositionChange(Number(inputValue) - 1, index)
                                setInputValue(String(index + 1))
                            }
                        }
                        }
                    />
                </StyledTouchableOpacity>
                : false
            }
            <Image
                source={{ uri: item?.post_images[0].url }}
                onError={(error) => console.error("Erro na imagem:", error.nativeEvent.error)} />
        </View>
    )
}

export default function Profile({ navigation }: any) {

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { signOut, user } = useAuth()
    const [editingPostions, setEditingPositions] = useState<boolean>(false)
    const [postOrder, setPostOrder] = useState<Post[]>([]);
    const { userPosts, userFollowing, userFollowers, fetchUserData } = useData()

    useEffect(() => {
        setPostOrder(userPosts);
    }, [userPosts]);


    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            setModalVisible(false);
        });

        return unsubscribeFocus;
    }, [navigation]);

    const [modalVisible, setModalVisible] = useState(false);

    const cancelEditing = () => {
        setPostOrder(userPosts)
        handleEditPositions();
    }

    const onSave = () => {
        handleEditPositions()
    }

    const handleEditPositions = () => {
        setEditingPositions(!editingPostions)
    }

    const handleGearIconPress = () => {
        setModalVisible(true);
    };

    const handlePositionChange = (newIndex: number, oldIndex: number) => {
        const newOrder = [...postOrder];
        const movedPost = newOrder.splice(oldIndex, 1)[0];
        newOrder.splice(newIndex >= 0 ? newIndex : 0, 0, movedPost);
        setPostOrder(newOrder);
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
            <HeaderBGImage
                source={HeaderBG}
            />
            <FlatList
                data={postOrder?.filter(post => post.post_images && post.post_images?.length > 0 && post.post_images[0] != null)}
                ListHeaderComponent={() => (
                    <>
                        <MainContainer>
                            <Header>
                                <TextWrapper>
                                    <Text style={{ color: theme.COLORS.WHITE, fontSize: theme.FONT_SIZE.LG, textAlign: 'center' }}>@{user?.name}</Text>
                                </TextWrapper>
                                <TouchableOpacity onPress={handleGearIconPress}>
                                    <FontAwesome size={25} color={'white'} name="gear" />
                                </TouchableOpacity>
                            </Header>
                            <ImageArea>
                                <TinyLogo
                                    source={{ uri: user?.image?.url || 'https://i.stack.imgur.com/YQu5k.png' }}
                                />
                            </ImageArea>

                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD }}>{user?.nickName}</Text>
                            </View>

                            <StatusArea>

                                {!editingPostions ?
                                    <>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD, marginRight: 4 }}>{userPosts?.length}</Text>
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
                                    </>
                                    :
                                    <>
                                        <TouchableOpacity onPress={cancelEditing}>
                                            <Text>Cancelar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={onSave}>
                                            <Text>salvar</Text>
                                        </TouchableOpacity>
                                    </>
                                }
                            </StatusArea>

                        </MainContainer>
                    </>
                )}
                renderItem={({ item, index }) => <PostComponent item={item} index={index} handlePositionChange={handlePositionChange} editingPostions={editingPostions} />}
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
                <ModalContainer>
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
                                onPress={() => {handleEditPositions(), setModalVisible(false)}}
                                style={{ paddingVertical: 5, height: 40, borderRadius: 5, flexDirection: 'row', }}>
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
                </ModalContainer>
            </Modal>
        </Container>
    )
}


const styles = StyleSheet.create({
    contentContainer: {
        alignItems: "center",
        width: Dimensions.get("window").width,
    }
});