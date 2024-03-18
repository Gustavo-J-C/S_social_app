import styled from "styled-components/native";
import { Dimensions } from "react-native";
import theme from "../../theme";

export const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
}))``;

export const Header = styled.View`
  flexDirection: row;
  alignSelf: center;
  alignItems: center;
  justifyContent: space-between;
  width: 90%;
`

export const TextWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

export const ImageArea = styled.TouchableOpacity`
  display: flex;
  marginTop: ${(Dimensions.get("window").height * 0.04)}px;
  align-items: center;
  text-align: center;
`

export const TinyLogo = styled.Image`
  width: 100px;
  height: 100px;
  borderRadius: 100px;
  border: 3px solid ${({theme}) => theme.COLORS.WHITE};
`

export const TextMD = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const TextLG = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const TextSM = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.LIGHT};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const MainContainerTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
 font-weight: 600,
  margin-top: 10px;
  color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const MainContainer = styled.View`
  width: 100%;
  margin-top: 10px;
`;

export const StatusArea = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  backgroundColor: ${theme.COLORS.GRAY_200};
  border-radius: 5px;
  padding: 9px 35px;
  margin: 20px 0px 0px 0px
`;

export const ModalContainer = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: flex-end;
  backgroundColor: rgba(0, 0, 0, 0.5); 
`

export const HeaderBGImage = styled.Image`
  width: ${Dimensions.get("window").width * 2}px;
  height: ${Dimensions.get("window").height * 0.47}px;
  marginTop: ${-(Dimensions.get("window").height * 0.26)}px;
  marginBottom: ${-(Dimensions.get("window").height * 0.15)}px;
  borderBottomLeftRadius: ${Dimensions.get("window").width}px;
  borderBottomRightRadius: ${Dimensions.get("window").width}px;
`

export const Image = styled.Image`
  width: ${(Dimensions.get("window").width / 2.5)}px;
  aspectRatio: 1;
  borderRadius: 15px;
  resizeMode: contain;
`