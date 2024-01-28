import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

import {
    Container,
    Label,
    Form,
    FotterButton,
    Header,
    StyledTouchableOpacity,
}
    from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";

import camPlusImage from "../../assets/imgs/cam-plus.png";
import CustomModal from "./modal";
import { InputForm } from "../../components/Form/Input";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import Toast from "react-native-toast-message";
import theme from "../../theme";
import { useState } from "react";
import { Image, Text } from "react-native";
import { View } from "react-native";
import { useData } from "../../hooks/data";

const newLandmarkFormSchema = z.object({
    description: z.string().min(1, "Descrição é obrigatória")
});

type newLandmarkFormInputs = z.infer<typeof newLandmarkFormSchema>;

export function Add({ navigation }: any) {
    const { addPost } = useData();
    const [images, setImages] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageErrorMessage, setImageErrorMessage] = useState<string>("");

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleDeleteImage = (index: number) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };
    const {
        handleSubmit,
        control,
        setValue,
        formState: { isSubmitting, errors },
    } = useForm<newLandmarkFormInputs>({
        resolver: zodResolver(newLandmarkFormSchema),
        defaultValues: {
            description: "",
        },
    });

    async function handleCreatePost(data: newLandmarkFormInputs) {
        try {

            if (images.length === 0) {
                setImageErrorMessage("Escolha pelo menos uma imagem.");
                return;
            }
            await addPost(data.description, images)

            setValue("description", "");
            setImages([]);

            Toast.show({
                type: "success",
                text1: "Ponto turístico cadastrado com sucesso",
                position: "bottom",
            });
        } catch (error: any) {
            console.error("Erro ao criar post:", error);

            Toast.show({
                type: "error",
                text1: "Opa",
                text2: "Não foi possível cadastrar",
                position: "bottom",
            });
        }
    }

    async function handleCamera() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera permissions to make this work!");
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        try {
            const fileInfo: any = await FileSystem.getInfoAsync(result.assets[0].uri);
            
            const fileSize = fileInfo.size;
    
            if (fileSize && fileSize <= 2 * 1024 * 1024) {
                setImages([...images, result.assets[0].uri]);
                setModalVisible(false);
            } else {
                const resizedImage = await ImageManipulator.manipulateAsync(
                    result.assets[0].uri,
                    [{ resize: { width: 800, height: 800 } }],
                    { format: ImageManipulator.SaveFormat.JPEG, compress: 0.8 }
                );
                
                setImages([...images, resizedImage.uri]);
            }
        } catch (error) {
            console.error('Error getting file size:', error);
            // Trate o erro conforme necessário
        } finally {
            setModalVisible(false);
        }
    }

    async function handleImageSelect() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.5,
        });

        if (result.canceled) {
            return;
        }

        if (result?.assets[0]?.uri) {
            setImages([...images, result.assets[0].uri]);
        }
        setModalVisible(false); //
    }

    return (
        <Container>
            <Header>
            </Header>
            <CustomModal
                visible={modalVisible}
                onClose={toggleModal}
                handleCamera={handleCamera}
                handleImageSelect={handleImageSelect}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Form>
                    <View
                        style={{
                            alignItems: "center",
                            flex: 1,
                            justifyContent: "center",
                            flexDirection: "row",
                        }}
                    >
                        <TouchableOpacity onPress={toggleModal}>
                            <Image
                                source={camPlusImage}
                                style={{ width: 100, height: 100, marginTop: -20 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: "center",                            
                            justifyContent: "center",
                            flexDirection: "row",
                            gap: 20,
                        }}
                        style={{
                            flex: 1,
                        }}
                    >
                         {images.length > 0 ? (
                            images.map((uri, index) => (
                                <View key={index}>
                                    <StyledTouchableOpacity
                                        onPress={() => handleDeleteImage(index)}
                                    >
                                        <Label>X</Label>
                                    </StyledTouchableOpacity>
                                    <Image
                                        source={{ uri: uri }}
                                        style={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 18,
                                            marginTop: 12,
                                            marginBottom: 12,
                                        }}
                                    />
                                </View>
                            ))
                        ) : (
                            imageErrorMessage && (
                                <Text style={{ color: 'red', marginTop: 12 }}>
                                   {imageErrorMessage}
                                </Text>
                            )
                        )}
                    </ScrollView>
                    <InputForm
                        control={control}
                        name="description"
                        placeholder="Descrição"
                        style={{ minHeight: 120, overflow: "scroll" }}
                        multiline={true}
                        autoCapitalize="sentences"
                        error={errors.description && errors.description.message}
                    />
                </Form>
                <FotterButton>
                    <ButtonPrimary
                        title="SALVAR"
                        isLoading={isSubmitting}
                        onPress={handleSubmit(handleCreatePost)}
                    />
                </FotterButton>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: theme.FONT_WEIGHT.BOLD,
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    label: {
        paddingLeft: 15,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 18,
    },
});
