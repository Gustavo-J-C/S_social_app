type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;

const FONT_WEIGHT: {
  BOLD: FontWeight;
  LIGHT: FontWeight;
  MEDIUM: FontWeight;
  REGULAR: FontWeight;
} = {
  BOLD: 'bold',
  LIGHT: "300",
  REGULAR: "400",
  MEDIUM: "600"
};


export default {
  COLORS: {
    WHITE: "#FFFFFF",
    BLACK: "#212121",
    BRAND: "#004358",
    PRIMARY: "#5455C9",
    RED: "#E95050",
    SECONDARY: '#FF7541',
    DARK: '#242424',
    ERROR: '#FA6650',

    ATTENTION: "#EF4444",

    GRAY_50: "#F7FAFC",
    GRAY_100: "#EDF2F7",
    GRAY_200: "#E2E8F0",
    GRAY_300: "#CBD5E0",
    GRAY_400: "#A0AEC0",
    GRAY_500: "#718096",
    GRAY_600: "#4A5568",
    GRAY_700: "#2D3748",
    GRAY_800: "#1A202C",
    GRAY_900: "#171923",
  },
  // FONT_FAMILY: {
  //   ROBOTO_REGULAR: "Roboto_400Regular",
  //   ROBOTO_BOLD: "Roboto_700Bold",
  //   LIGHT: "Raleway_300Light",
  //   REGULAR: "Raleway_400Regular",
  //   MEDIUM: "Raleway_500Medium",
  //   SEMIBOLD: "Raleway_600SemiBold",
  //   BOLD: "Raleway_700Bold",
  // },
  FONT_WEIGHT,
  TEXT: {
    BLACK: "#212121",
    PRIMARY: "#242424",
    SECONDARY: "#828282",
    PLACEHOLDER: "#BDBDBD",
    TERTIARY: "#BDBDBD",
    GRAY: "#E7E8EA"
  },
  FONT_SIZE: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    XXXL: 32,
  },
};