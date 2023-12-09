import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons"
import { useAuth } from "../../hooks/auth";
import { useState } from "react";
import { Container } from "../SignIn/styles";
import camPlusImage from '../../assets/imgs/welcomeImage.png';
import { Header, HeaderTitle, ImageArea } from "./styles";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import theme from "../../theme";

export default function Profile({ navigation }: any) {

    const { signOut, user } = useAuth()
    const [imagePressed, setImagePressed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageSelected, setImageSelected] = useState('');

    return (
        <Container style={styles.container}>
            <Header style={{ flexDirection: 'row', width: '90%' }}>
                <ImageArea
                    onBlur={() => setImagePressed(false)}>
                    <Image
                        style={styles.tinyLogo}
                        source={{ uri: 'https://i.stack.imgur.com/YQu5k.png' } }
                    />
                </ImageArea>
                {imageSelected ?
                    <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', flex: 1 }}>
                        <TouchableOpacity
                            style={{ alignItems: 'center' }}>
                            <Feather name="save" size={25} color={theme.COLORS.BRAND} />
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }}
                        >
                            <Feather name="x-square" size={25} color={theme.COLORS.ATTENTION} />
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ paddingLeft: 12, paddingRight: 12, justifyContent: 'center' }}>
                        <Text>{user.name}</Text>
                        <Text>{user.email}</Text>
                    </View>
                }
            </Header>
            <View style={{ paddingTop: 20, width: '90%' }}>
                <TouchableOpacity
                    // onPress={() => navigation.navigate('EditProfileFirst')}
                    style={{
                        height: 50, justifyContent: 'space-between', alignItems: "center", flexDirection: 'row', borderBottomColor: theme.COLORS.GRAY_400, borderBottomWidth: 1
                    }}
                >
                    <Text>Editar Perfil</Text>
                    <Feather
                        size={20}
                        color={theme.COLORS.GRAY_500}
                        name="chevron-right" />
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={() => navigation.navigate('ChangePassword')}
                    style={{ height: 50, justifyContent: 'space-between', alignItems: "center", flexDirection: 'row', borderBottomColor: theme.COLORS.GRAY_400, borderBottomWidth: 1 }}>
                    <Text>Mudar senha</Text>
                    <Feather
                        size={20}
                        color={theme.COLORS.GRAY_500}
                        name="chevron-right" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginBottom: 30, justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                <ButtonPrimary
                    style={{ marginBottom: 20, width: '90%' }}
                    onPress={signOut}
                    title="Logout"
                />
            </View>
        </Container>
    )
}


const styles = StyleSheet.create({
    container: {
    },
    tinyLogo: {
        width: 90,
        height: 90,
        borderRadius: 45
    },
    logo: {
        width: 66,
        height: 58,
    },
});