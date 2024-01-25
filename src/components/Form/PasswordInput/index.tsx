import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { TextInputProps, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";

import { Container, Input, Error, IconEye, ContainerInput } from "./styles";

interface IProps extends TextInputProps {
  control: Control;
  name: string;
  size?: string;
  error: string;
}

export function PasswordInputForm({ control, name, size, error, ...rest }: IProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <>
      <Container>
        <ContainerInput isError={error}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={size ? { fontSize: theme.FONT_SIZE[size]}: false}
                  secureTextEntry={isPasswordVisible}
                  placeholderTextColor={theme.COLORS.GRAY_500}
                  {...rest}
                />
                <TouchableOpacity onPress={handlePasswordVisibilityChange}>
                  <IconEye>
                    <Ionicons
                      name={isPasswordVisible ? "eye" : "eye-off"}
                      size={24}
                      color={theme.COLORS.GRAY_500}
                    />
                  </IconEye>
                </TouchableOpacity>
              </>
            )}
            name={name}
          />
        </ContainerInput>
        {error && <Error>{error}</Error>}
      </Container>
    </>
  );
}
