import styled from "styled-components/native";

export const Header = styled.TouchableOpacity`
    flexDirection: row;
    alignSelf: center;
    alignItems: center;
    marginBottom: 10px;
`;

export const ProfileImage = styled.Image`
    width: 30px;
    borderRadius: 50px;
    aspectRatio: 1;
    resizeMode: contain;
`;

export const UserInfosView = styled.View`
    justifyContent: space-between;
    alignItems: center;
    flexDirection: row;
`

export const UserName = styled.Text`
    fontWeight: ${({theme}) => theme.FONT_WEIGHT.REGULAR};
    marginLeft: 15px;
    color: ${({theme}) => theme.TEXT.BLACK};
    fontSize: ${({theme}) => theme.FONT_SIZE.LG}px;
`;