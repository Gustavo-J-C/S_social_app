import { ActivityIndicator, Dimensions, FlatList, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import CommentComponent from "../../components/Comment/CommentComponent";
import { useData } from "../../hooks/data";
import { createComment } from "../../utils/comments/createComment";
import { useAuth } from "../../hooks/auth";

export default function Comments({ navigation, route }: any) {

  const postId = route.params.postId
  const { user } = useAuth();
  const { getPostComments } = useData();
  const [commentDescription, setCommentDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);

  const handleCreateComment = async () => {
    try {
      const { data } = await createComment(user?.id, postId, commentDescription);
      const newComment = { ...data.comment, user: data.user}
      setPostComments((prevComments) => [...prevComments, newComment]);
      setCommentDescription("");
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" /> : null;
  };

  useEffect(() => {
    const getCommentsData = async () => {
      const response = await getPostComments(postId)
      setPostComments(response.comments)
    }

    getCommentsData();
  }, []);
  return (
    <View>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          alignSelf: 'center',
          width: (Dimensions.get("window").width * 0.9),
          height: '90%'
        }}
        data={postComments}
        renderItem={({ item, index }) => <CommentComponent comment={item} />}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={renderFooter}
      />
      <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1 }}>
        <TextInput
          style={{ width: '90%', paddingLeft: 30, height: 50 }}
          placeholder="Adicione um comentário"
          value={commentDescription}
          onChangeText={(e) => setCommentDescription(e)} />
        <TouchableOpacity onPress={handleCreateComment}>
          <FontAwesome style={{ width: 'auto' }} name="angle-double-right" size={25} />
        </TouchableOpacity>
      </View>
    </View >
  )
} 