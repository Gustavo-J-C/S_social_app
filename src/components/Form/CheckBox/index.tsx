import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Container, CheckBoxContainer, CheckboxBase, Error } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface IProps extends TouchableOpacityProps {
  title: string;
  checked: boolean;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

export function CheckBoxForm({ checked, error, ...rest }: IProps) {
  return (
    <Container>
      <CheckBoxContainer>
        <CheckboxBase checked={checked} {...rest}>
          {checked && <Ionicons name="checkmark" size={15} color="white" />}
        </CheckboxBase>
      </CheckBoxContainer>
      {error && <Error>{error?.toString()}</Error>}
    </Container>
  );
}
