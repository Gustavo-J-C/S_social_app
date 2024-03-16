import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
}))``;

export const ImageArea = styled.TouchableOpacity`
  display: flex;
  text-align: center;
  alignItems: center; 
`

export const TextMD = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MEDIUM},
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const TextSM = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.LIGHT},
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
 font-weight: 600,
  margin-top: 10px;
  color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: 10px;
`;

export const StatusArea = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  border-radius: 5px;
  padding: 9px 35px;
  margin: 20px 0px 0px 0px
`;