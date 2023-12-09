import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Loading, Title } from "./styles";
import theme from "../../theme";

type Props = TouchableOpacityProps & {
  title: string;
  size?: keyof typeof theme.FONT_SIZE;
  isLoading?: boolean;
  login?: boolean;
};

export function ButtonPrimary({ title, isLoading = false, size, ...rest }: Props) {
  return (
    <Container activeOpacity={0.7} disabled={isLoading} {...rest}>
      {isLoading ? <Loading /> : <Title style={size ? {fontSize: theme.FONT_SIZE[size]} : false}>{title}</Title>}
    </Container>
  );
}
