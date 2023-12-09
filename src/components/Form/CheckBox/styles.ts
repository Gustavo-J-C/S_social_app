import styled from "styled-components/native";

interface ICheckBoxProps {
  checked: boolean;
}

export const Container = styled.View`
  align-items: center;
  margin: 5px 0;
`;

export const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxBase = styled.TouchableOpacity<ICheckBoxProps>`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border-width: 2px;
  margin-right: 12px;

  justify-content: center;
  align-items: center;

  border-color: ${({ theme, checked }) => !checked ? "#fff" : theme.COLORS.SECONDARY}

  background-color: ${({ theme, checked }) =>
    checked ? theme.COLORS.SECONDARY : "transparent"};
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.COLORS.ATTENTION};
  margin: 2px 0px;
`;
