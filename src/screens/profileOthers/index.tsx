import { useEffect, useState } from "react";
import { Dimensions, FlatList, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/auth";
import { FontAwesome } from "@expo/vector-icons";
import HeaderBG from '../../assets/imgs/profileHeaderBG.png';
import { Container } from "./styles";
import theme from "../../theme";
import { useData } from "../../hooks/data";
import { Post } from "../../@types/posts";
import { api } from "../../services/api";
import { ProfileData, User, UserImage } from "../../@types/user";
import { Header, HeaderBGImage, Image, ImageArea, MainContainer, StatusArea, TextWrapper, TinyLogo } from "../profile/styles";

export default function ProfileOthers({ navigation, route }: any) {

    const { signOut, user } = useAuth()
    const { getProfileData } = useData()
    const [profilePosts, setProfilePosts] = useState<Post[]>([])
    const [isFriend, setIsFriend] = useState<boolean>(false)
    const [profileFollowers, setProfileFollowers] = useState<number>(0)
    const [profileFollowing, setProfileFollowing] = useState<number>(0)
    const [profileImage, setProfileImage] = useState<UserImage>()
    const [refreshing, setRefreshing] = useState(true)

    const userId = route.params.userId

    console.log(route.params);


    const fetchData = async () => {
        try {
            const profileData: ProfileData = await getProfileData(userId);

            setProfileImage(profileData.userImage);
            setProfilePosts(profileData.posts);
            setIsFriend(profileData.isFriend);
            setProfileFollowing(profileData.following);
            setProfileFollowers(profileData.followers);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        } finally {
            setRefreshing(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, [getProfileData, userId]);

    const handleFollow = async () => {
        try {
            if (isFriend) {
                await api.post(`profile/unfollow`, {
                    targetUserId: userId,
                });
                setProfileFollowers((prevData) => prevData--);
            } else {
                await api.post(`profile/follow`, {
                    targetUserId: userId,
                });
                setProfileFollowers((prevData) => prevData++);
            }
            // Invertendo o valor de isFriend após a ação
            setIsFriend((prevIsFriend) => !prevIsFriend);
        } catch (error) {
            console.error('Error handling follow/unfollow:', error);
        }
    };

    return (
        <Container
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchData}
                />
            }>
            <StatusBar backgroundColor={"transparent"} barStyle={"light-content"} />
            <HeaderBGImage
                source={HeaderBG}
            />
            <FlatList
                data={profilePosts?.filter(post => post.post_images && post.post_images.length > 0 && post.post_images[0] != null)}
                ListHeaderComponent={() => (
                    <>
                        <MainContainer>
                            <Header>
                                <TouchableOpacity>
                                    <FontAwesome size={25} color={'white'} name="arrow-circle-left" />
                                </TouchableOpacity>
                                <TextWrapper>
                                    <Text style={{ color: theme.COLORS.WHITE, fontSize: theme.FONT_SIZE.LG, textAlign: 'center' }}>@{route.params.userName}</Text>
                                </TextWrapper>
                                <TouchableOpacity>
                                    <Text style={{ color: "#7D80EB", backgroundColor: "#fff", padding: 10, fontSize: 16, borderRadius: 20 }}>Follow</Text>
                                </TouchableOpacity>
                            </Header>
                            <ImageArea>
                                <TinyLogo
                                    source={{ uri: profileImage?.url || 'https://i.stack.imgur.com/YQu5k.png' }}
                                />
                            </ImageArea>

                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD, color: "#000" }}>{route.params.userName}</Text>
                            </View>

                            <StatusArea style={{ backgroundColor: theme.COLORS.GRAY_200 }}>

                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD, marginRight: 4 }}>{profilePosts.length}</Text>
                                    <Text>Publicações</Text>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD, marginRight: 4 }}>{profileFollowers}</Text>
                                    <Text>seguidores</Text>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: theme.FONT_WEIGHT.BOLD, fontSize: theme.FONT_SIZE.MD, marginRight: 4 }}>{profileFollowing}</Text>
                                    <Text>Seguindo</Text>
                                </View>
                            </StatusArea>

                        </MainContainer>
                    </>
                )}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={
                                {
                                    borderRightWidth: index % 2 === 0 ? 15 : 0,
                                    borderBottomWidth: 15,
                                    borderColor: "#fff"
                                }
                            }>
                            <Image
                                source={{ uri: item.post_images[0].url }}
                                onError={(error) => console.error("Erro na imagem:", error.nativeEvent.error)} />
                        </TouchableOpacity>
                    );
                }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                ItemSeparatorComponent={
                    () => <View style={{ width: 100, backgroundColor: 'pink' }}></View>
                }
                numColumns={2}
                contentContainerStyle={styles.contentContainer}
                ListHeaderComponentStyle={{ width: "100%", alignItems: "center", marginBottom: 30, paddingHorizontal: 20 }}
            />
        </Container>
    )
}


const styles = StyleSheet.create({
    contentContainer: {
        alignItems: "center",
        width: Dimensions.get("window").width,
    }
});