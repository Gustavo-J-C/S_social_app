import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

type InputProps = {
  isError: boolean;
};

export const Container = styled.TouchableOpacity`
  flex: 1;
  margin: 5px 0;
`;

export const Input = styled(TextInput)<InputProps>`
  border-width: 1px;
  border-color: ${({ isError, theme }) =>
    isError ? theme.COLORS.ATTENTION : theme.COLORS.WHITE};

  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  padding: 16px;
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_800};
    background-color: ${theme.COLORS.GRAY_100};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.COLORS.ATTENTION};
  margin: 2px 5px;
`;
