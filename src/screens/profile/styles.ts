import styled from "styled-components/native";

export const ImageArea = styled.TouchableOpacity`
  display: flex;
  text-align: center;
`

export const TextMD = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const TextSM = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.LIGHT};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  margin-top: 10px;
  color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: 30px;
`;