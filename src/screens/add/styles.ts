import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
`;

export const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;

  margin-top: 50px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Label = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
`;


export const StyledTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  right: 0;
  z-index: 1;
  background-color: 'rgba(237, 242, 247, 0.9)';
  padding: 8px;
  border-radius: 20px;
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const FotterButton = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};

  width: 100%;
  margin-bottom: 30px;
  padding-top: 15px;
  /* padding-left: 20px;
  padding-right: 20px; */

  /* align-items: center; */
  justify-content: center;
`;
