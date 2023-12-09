import { useTheme } from "styled-components/native";
import { Controller, Control } from "react-hook-form";
import { Container, Error, SelectInput } from "./styles";
import { SelectList, SelectListProps } from "react-native-dropdown-select-list";

type Props = SelectListProps & {
  control: Control;
  selectInputRef?: React.RefObject<SelectList>;
  error: string;
  name: string;
  isNote?: boolean;
};

export function SelectInputForm({
  selectInputRef,
  name,
  control,
  error,
  ...rest
}: Props) {
  const { COLORS, FONT_SIZE, FONT_FAMILY } = useTheme();

  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectInput
            boxStyles={{
              borderWidth: 1,
              borderColor: COLORS.WHITE,
              borderRadius: 6,
              maxHeight: 56,
              minHeight: 56,
              backgroundColor: COLORS.GRAY_100,
            }}
            inputStyles={{
              color: COLORS.GRAY_800,
              fontSize: FONT_SIZE.MD,
              fontFamily: FONT_FAMILY.REGULAR,
            }}
            // {... (isNote &&  {dropdownItemStyles: { backgroundColor: COLORS.GRAY_100 } } )}
            isError={!!error}
            ref={selectInputRef}
            {...rest}
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
