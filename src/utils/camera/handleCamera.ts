import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

export async function handleCameraPhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
    }

    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    });

    if (result.canceled) {
        return null;
    }

    try {
        const fileInfo: any = await FileSystem.getInfoAsync(result.assets[0].uri);
        
        const fileSize = fileInfo.size;

        if (fileSize && fileSize <= 2 * 1024 * 1024) {
            return result.assets[0].uri
        } else {
            // Realize a compressão da imagem antes de adicionar ao estado
            const resizedImage = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 800, height: 800 } }],
                { format: ImageManipulator.SaveFormat.JPEG, compress: 0.8 }
            );
            
            return resizedImage.uri
        }
    } catch (error) {
        console.error('Error getting file size:', error);
        return null;
    }
}