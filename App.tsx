import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';
import theme from './src/theme';
import { DataProvider } from './src/hooks/data';

export default function App() {
  return (

    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DataProvider>
          <StatusBar
            backgroundColor={theme.COLORS.WHITE}
            translucent
          />
          <Routes />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
