import { Modal, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Certifique-se de ter instalado o pacote "@expo/vector-icons" no seu projeto
import theme from '../../theme';
export default function CustomModal({ visible, onClose, handleCamera, handleImageSelect }: any) {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <TouchableOpacity
                style={styles.touchableAreaStyle}
                onPress={onClose}
            >
            </TouchableOpacity>
            <View style={styles.centerAreaStyle}>
                {/* Botão da câmera */}
                <TouchableOpacity onPress={handleCamera}>
                    <Feather name="camera" size={54} color={theme.COLORS.BRAND} />
                    <Text>Tirar foto</Text>
                </TouchableOpacity>

                {/* Botão de seleção de imagem */}

                <TouchableOpacity style={{alignItems: 'center'}} onPress={handleImageSelect}>
                    <Feather name="folder" size={54} color={theme.COLORS.BRAND} />
                    <Text>Carregar Foto</Text>
                </TouchableOpacity>
            </View>
            {/* Botão para fechar o modal */}
            <TouchableOpacity
                style={styles.touchableAreaStyle}
                onPress={onClose}
            ></TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    touchableAreaStyle: {
        flex: 1,
        backgroundColor: 'rgba(1, 1, 1, 0.3)'
    },
    centerAreaStyle: { 
        flex: 1,
        flexDirection: 'row',
        gap: 60,
        backgroundColor: '#fff',
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});