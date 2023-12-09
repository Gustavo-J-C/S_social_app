import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

type ButtonProps = {
  login?: boolean;
};


export const Container = styled(TouchableOpacity)<ButtonProps>`
  flex: 1;
  min-height: 46px;
  max-height: 46px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, login }) => !login ? theme.COLORS.PRIMARY : "#fff"};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``;
