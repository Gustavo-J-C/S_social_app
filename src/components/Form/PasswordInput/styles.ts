import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

type InputProps = {
  [key: string]: any;
  isError: boolean;
};

export const Container = styled.View`
  flex: 1;
  margin: 5px 0;
`;

export const ContainerInput = styled.View<InputProps>`
  width: 100%;
  min-height: 56px;
  max-height: 56px;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_100};
  `};

  border-width: 1px;
  border-color: ${({ isError, theme }) =>
    isError ? theme.COLORS.ATTENTION : theme.COLORS.WHITE};
  border-radius: 6px;

  flex-direction: row;
`;

export const Input = styled(TextInput)<InputProps>`
  flex: 1;

  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_800};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};

  padding: 16px;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.COLORS.ATTENTION};
  margin: 2px 0px;
`;

export const IconEye = styled.View`
  height: 53px;
  width: 56px;
  justify-content: center;
  align-items: center;

  border-radius: 4px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`;
