import { ScrollView, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import {
  Container,
  Form,
  FormTitle,
  PhotoText,
  Image
} from "./styles";

import { useAuth } from "../../../hooks/auth";
import { InputForm } from "../../../components/Form/Input";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import CustomModal from "../../add/modal";
import { useState } from "react";
import { useData } from "../../../hooks/data";

const signUpFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  userName: z.string(),
});

type signUpFormInputs = z.infer<typeof signUpFormSchema>;

export function EditProfile({ navigation }: any) {

  const { user } = useAuth();
  
  const { editProfile, updateProfileImage } = useData();

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string>();
  const [formDataChanged, setFormDataChanged] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
        setImage(result.assets[0].uri);
        setModalVisible(false);
      } else {
        const resizedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800, height: 800 } }],
          { format: ImageManipulator.SaveFormat.JPEG, compress: 0.8 }
        );

        setImage( resizedImage.uri);
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
      setImage(result.assets[0].uri);
    }
    setModalVisible(false); //
  }

  const handleFormSubmit = async (data: signUpFormInputs) => {
    try {
      if (!formDataChanged && !image) {
        return;
      }

      // Verificar se houve alterações nos campos name ou userName
      if (data.name !== user.name || data.userName !== user.nickName) {
        // Fazer a chamada para editar o perfil com os dados alterados
        await editProfile( data.name, data.userName);
      }

      // Verificar se uma nova imagem foi selecionada
      if (image) {
        // Fazer a chamada para fazer upload da nova imagem
        await updateProfileImage(image);
      }

      // Limpar o estado da imagem e indicar que nenhum dado foi modificado
      setImage(undefined);
      setFormDataChanged(false);
      navigation.pop();

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<signUpFormInputs>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: user.name || "",
      userName: user.nickName || "",
    },
  });

  return (
    <Container>
      <CustomModal
        visible={modalVisible}
        onClose={toggleModal}
        handleCamera={handleCamera}
        handleImageSelect={handleImageSelect}
      />
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
            <Image
              source={{ uri: image || user?.image?.url || 'https://i.stack.imgur.com/YQu5k.png' }}
            />
          <TouchableOpacity onPress={toggleModal}>
            <PhotoText>trocar foto</PhotoText>
          </TouchableOpacity>
        </View>
        <Form>
          <FormTitle>Nome:</FormTitle>
          <InputForm
            control={control}
            name="name"
            placeholder="seu nome"
            autoCapitalize="words"
            error={errors.name && errors.name.message}
            onChange={() => setFormDataChanged(true)}
          />
          <FormTitle>Apelido</FormTitle>
          <InputForm
            control={control}
            name="userName"
            placeholder="seu apelido"
            autoCapitalize="words"
            error={errors.userName && errors.userName.message}
            onChange={() => setFormDataChanged(true)}
          />
        </Form>
      </ScrollView>
      <ButtonPrimary
        style={{ width: '100%', marginBottom: 50 }}
        title="Salvar"
        isLoading={isSubmitting}
        onPress={handleSubmit(handleFormSubmit)}
      />
    </Container>
  );
}