import { SelectList } from "react-native-dropdown-select-list";
import styled, { css } from "styled-components/native";

type SelectDropdownProps = {
  isError: boolean;
};

export const Container = styled.View`
  flex: 1;
  margin: 5px 0;
`;

export const SelectInput = styled(SelectList) <SelectDropdownProps>`
  /* border-width: 1px;
  border-color: ${({ isError, theme }) =>
    isError ? theme.COLORS.ATTENTION : theme.COLORS.WHITE};

  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  padding: 16px;
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_800};
    background-color: ${theme.COLORS.GRAY_100};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `}; */
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.COLORS.ATTENTION};
  margin: 2px 0px;
`;
