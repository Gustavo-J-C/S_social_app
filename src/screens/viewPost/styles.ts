import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const Header = styled.View`
    flexDirection: row;
    width: 90%;
    alignSelf: center;
    alignItems: center;
    marginBottom: 20px;
`;

export const ItensArea = styled.TouchableOpacity`
    flexDirection: row;
    alignItems: center;
    padding: 5px;
    gap: 5px;
`

export const Container = styled.View`
    width: 90%;
    alignSelf: center;
`;

export const UserInfosView = styled.View`
    justifyContent: space-between;
    alignItems: center;
    flexDirection: row;
`

export const ActionsView = styled.View`
    flexDirection: row;
    justifyContent: space-evenly;
    marginRight: 20px;
    marginVertical: 15px;
    gap: 25px;
`

export const TitleText = styled.Text`
    fontSize: ${({theme}) => theme.FONT_SIZE.XL}px;
    fontWeight: ${({theme}) => theme.FONT_WEIGHT.MEDIUM};
    color: ${({theme}) => theme.TEXT.BLACK};
`;

export const DescriptionText = styled.Text`
    fontSize: ${({theme}) => theme.FONT_SIZE.MD}px;
    fontWeight: ${({theme}) => theme.FONT_WEIGHT.REGULAR};
    color: ${({theme}) => theme.TEXT.SECONDARY};
`

export const UserName = styled.Text`
    fontWeight: ${({theme}) => theme.FONT_WEIGHT.REGULAR};
    marginLeft: 15px;
    color: ${({theme}) => theme.TEXT.BLACK};
    fontSize: ${({theme}) => theme.FONT_SIZE.XL}px;
`;

export const ProfileImage = styled.Image`
    width: 40px;
    borderRadius: 50px;
    aspectRatio: 1;
    resizeMode: contain;
`;

export const Image = styled.Image`
    width: ${Dimensions.get("window").width}px;
    aspectRatio: 1;
    resizeMode: contain;
`;