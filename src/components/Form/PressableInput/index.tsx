import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Controller, Control } from "react-hook-form";
import { RefObject } from "react";
import { Container, Error, Input } from "./styles";
import theme from "../../../theme";

type Props = TextInputProps & {
  control: Control;
  inputRef?: RefObject<TextInput>;
  size?: string;
  pressAction?: any;
  error: string;
  name: string;
};

export function PressableInput({ inputRef, name, control, size, error, ...rest }: Props) {
  const { COLORS } = useTheme();


  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={COLORS.GRAY_500}
            style={size ? {fontSize: theme.FONT_SIZE[size]} : false}
            isError={!!error}
            ref={inputRef}
            {...rest}
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
