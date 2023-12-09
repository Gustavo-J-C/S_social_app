import { BackHandler, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';
import WelcomeImage from '../../assets/imgs/welcomeImage.png';
import React, { useState } from "react";

import {
  Container,
  Image,
  Form,
  Text,
  TextInput,
  ButtonContainer,
  ButtonLabel,
  ForgotPasswordLabel,
  TextInputContainer,
  IconArea,
} from "./styles";
import { useAuth } from "../../hooks/auth";


export function SignUp({ navigation }: any) {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn({
        email: emailInput,
        password: passwordInput,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Image
        source={WelcomeImage}
      />
      <Form>
        <TextInputContainer>
          <TextInput
            placeholder="Digite seu e-mail"
            onChangeText={(e) => setEmailInput(e)}
            placeholderTextColor={"#BDBDBD"}
            autoCapitalize="none"
          />
        </TextInputContainer>
        <TextInputContainer>
          <TextInput
            onChangeText={(e) => setPasswordInput(e)}
            secureTextEntry={!viewPassword}
            placeholderTextColor={"#BDBDBD"}
            placeholder="Digite sua senha"
            autoCapitalize="none"
          />
          <IconArea>
            <Feather name={viewPassword ? 'eye-off' : "eye"} size={20} onPress={() => setViewPassword(!viewPassword)} />
          </IconArea>
        </TextInputContainer>
        <TextInputContainer>
          <TextInput
            onChangeText={(e) => setPasswordInput(e)}
            secureTextEntry={!viewPassword}
            placeholderTextColor={"#BDBDBD"}
            placeholder="Confirmar senha"
            autoCapitalize="none"
          />
          <IconArea>
            <Feather name={viewPassword ? 'eye-off' : "eye"} size={20} onPress={() => setViewPassword(!viewPassword)} />
          </IconArea>
        </TextInputContainer>
        <ButtonContainer
          onPress={handleSignIn}
        >
          <ButtonLabel>Registrar</ButtonLabel>
        </ButtonContainer>
        <Text>Já possui uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <ForgotPasswordLabel>Login</ForgotPasswordLabel>
        </TouchableOpacity>
      </Form>

    </Container>
  );
}
