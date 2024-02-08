import styled from "styled-components/native";
import theme from "../../../theme";

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 40px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MEDIUM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  margin-top: 26px;
  margin-bottom: 16px;
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  lineHeight: ${({ theme }) => theme.FONT_SIZE.XXL}px;
`;

export const Form = styled.View`
  width: 100%;
  flex: 1;
  margin-bottom: 16px;
`;

export const FormTitle = styled.Text`
  font-size: ${theme.FONT_SIZE.MD}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  margin-top: 10px;
`;

export const PhotoText = styled.Text`
  font-size: ${theme.FONT_SIZE.MD}px;
  font-weight: ${theme.FONT_WEIGHT.MEDIUM};
  color: ${theme.COLORS.PRIMARY};
  margin-top: 10px;
`;

export const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 45px;
`
