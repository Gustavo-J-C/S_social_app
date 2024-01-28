import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
    Modal,
    View,
    FlatList,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import CommentComponent from "./CommentComponent";
import { Comment } from "../../@types/comments";
import { ActivityIndicator } from "react-native";

interface CommentModalProps {
    visible: boolean;
    onClose: () => void;
    comments: Comment[];
    onRefresh: () => void;
    loading: boolean;
    handleCreateComment: () => Promise<void>
    onEndReached: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
    visible,
    onClose,
    comments,
    onRefresh,
    handleCreateComment,
    loading,
    onEndReached,
}) => {

    const [commentDescription, setCommentDescription] = useState("");

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={[styles.centeredView]}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.touchableOpacity}
                    onPress={onClose}
                />
                <View style={{ height: 10, width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: "#fff" }}></View>
                <View style={{ flex: comments.length > 5 ? 2 : 1, alignItems: "flex-end" }}>
                    <FlatList
                        contentContainerStyle={{
                            alignItems: "center",
                            backgroundColor: "#F6F7F9",
                            width: Dimensions.get("window").width,
                            minHeight: "100%",
                        }}
                        data={comments}
                        renderItem={({ item, index }) => <CommentComponent comment={item} />}
                        keyExtractor={(_, index) => index.toString()}
                        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
                        onEndReached={onEndReached}
                    />
                </View>
                <View style={{ width: "100%", alignItems: "center", flexDirection: "row", backgroundColor: "#fff", borderTopWidth: 1 }}>
                    <TextInput
                        style={{ width: "90%", paddingLeft: 30, height: 50 }}
                        placeholder="Adicione um comentário"
                        onChangeText={(e) => setCommentDescription(e)}
                    />
                    <TouchableOpacity onPress={handleCreateComment}>
                        <FontAwesome style={{ width: "auto" }} name="angle-double-right" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0.8)",
    },
    touchableOpacity: {
        flex: 1,
        width: "100%",
    },
});

export default CommentModal;