import React from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {
    Container,
    Label,
    Form,
    FotterButton,
    Header,
    HeaderTitle,
    StyledTouchableOpacity,
}
    from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

import camPlusImage from "../../assets/imgs/cam-plus.png";
import CustomModal from "./modal";
import { SelectInputForm } from "../../components/Form/SelectInput";
import { InputForm } from "../../components/Form/Input";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import theme from "../../theme";
import { useState } from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useData } from "../../hooks/data";

const newLandmarkFormSchema = z.object({
    description: z.string().min(1, "Descrição é obrigatória")
});

type newLandmarkFormInputs = z.infer<typeof newLandmarkFormSchema>;

export function Add({ navigation }: any) {
    const { user } = useAuth();
    const [images, setImages] = useState<string[]>([]);
    const [publicLandmark, setPublicLandmark] = useState("0");
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);

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

    async function handleCreate(data: newLandmarkFormInputs) {
        try {
            const formData = new FormData();
            formData.append("user_id", user.id.toString());

            if (images.length > 0) {
                const imageObjects = images.map((image, index) => {
                    return {
                        name: `image_${index}.jpg`,
                        uri:
                            Platform.OS === "android" ? image : image.replace("file://", ""),
                        type: mime.getType(image),
                    };
                });

                formData.append("images[]", JSON.stringify(imageObjects));
            }


            const response = await api.post("/landmark", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Toast.show({
                type: "success",
                text1: "Ponto turístico cadastrado com sucesso",
                position: "bottom",
            });
            setValue("description", "");
            setImages([]);

            setTimeout(() => {
                navigation.navigate("Início");
            }, 200);
        } catch (error: any) {
            console.error("Erro: ", error);
            if (error.response) {
                console.error("message: ", error.response.data.message);
                console.error(error.response.status);
            } else if (error.request) {
                console.error("Request: ", error.request);
            }
            console.error("Error", error.message);
            console.error(error.config);
            console.error("Data: ", error.config.data.validateStatus);
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

        if (result?.assets[0]?.uri) {
            setImages([...images, result.assets[0].uri]);
        }
        setModalVisible(false);
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
            quality: 1,
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
                        {images.length > 0 &&
                            images.map((uri, index) => (
                                <View>
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
                            ))}
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
                    onPress={handleSubmit(handleCreate)}
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
        fontWeight: "bold",
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
