import React, { useEffect, useState } from "react";
import { FlatList, Text, ActivityIndicator, Modal, Alert, View, Dimensions, StyleSheet, TouchableOpacity, Animated, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createComment } from '../../utils/comments/createComment'
import { FontAwesome } from "@expo/vector-icons";
import PostComponent from "../../components/Post/PostComponent";
import { useData } from "../../hooks/data";
import CommentComponent from "../../components/Comment/CommentComponent";
import { useAuth } from "../../hooks/auth";
import { Post } from "../../@types/posts";
import { Comment } from "../../@types/comments";
import theme from "../../theme";

export default function Home({navigation}: any) {
  const { posts, getPosts, loading, hasMorePosts, getPostComments } = useData();

  const [currentPosts, setCurrentPosts] = useState<Post[]>(posts);
  const [selectedPostId, setSelectedPostId] = useState<number>();
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentDescription, setCommentDescription] = useState("");
  const fadeAnimation = new Animated.Value(1);

  const {user} = useAuth();

  useEffect(() => {
    setCurrentPosts(posts)
  }, [posts])

  const getCommentsData = async (postId: number) => {
    const newComments = await getPostComments(postId)
    
    setPostComments(newComments.comments)
    setSelectedPostId(postId);
    handleComment();
  }

  const handleCreateComment = async () => {
    if (user?.id === undefined || selectedPostId === undefined) {
      return;
    }
  
    try {
      const { data } = await createComment(user?.id, selectedPostId, commentDescription);
      
      const updatedPosts = currentPosts.map((element) => {
        if (element.id === selectedPostId) {
          element.comment_count++;
        }
        return element;
      });
  
      setCurrentPosts(updatedPosts);
      setPostComments((prevComments) => [...prevComments, data]);
      setCommentDescription("");
    } catch (error) {
      console.error('Error creating comment:', error);
      // Handle the error according to your application's needs
    }
  };
  

  const handleComment = async () => {
    try {
        setModalVisible(!modalVisible);
        if (modalVisible) {
          setPostComments([])
          setCommentDescription("")
        }
    } catch (error) {
      console.error('Error handling comment:', error);
    }
  };

  const handleEndReached = () => {
    if (!loading) {
      getPosts(); 
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" /> : null;
  };

  return (
    <SafeAreaView style={{ justifyContent: "center", flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          handleComment();
        }}>
        <View
          style={[
            styles.centeredView,
          ]}
        >
          <TouchableOpacity activeOpacity={1} style={styles.touchableOpacity} onPress={handleComment} />
          <View style={{ height: 10, width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#fff' }}>
          </View>
          <View style={{ flex: postComments.length > 5 ? 2 : 1, alignItems: "flex-end" }}>
            <FlatList
              contentContainerStyle={{
                alignItems: "center",
                backgroundColor: "#F6F7F9",
                width: Dimensions.get("window").width,
                minHeight: '100%'
              }}
              data={postComments}
              renderItem={({ item, index }) => <CommentComponent comment={item} />}
              keyExtractor={(_, index) => index.toString()}
              ListFooterComponent={renderFooter}
            />
          </View>
          <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1 }}>
            <TextInput
              style={{ width: '90%', paddingLeft: 30, height: 50 }}
              placeholder="Adicione um comentário"
              value={commentDescription}
              onChangeText={(e) => setCommentDescription(e)}/>
            <TouchableOpacity
            onPress={handleCreateComment}>
              <FontAwesome style={{ width: 'auto' }} name="angle-double-right" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: "#F6F7F9",
        }}
        data={currentPosts}
        renderItem={({ item }) => <PostComponent navigation={navigation} handleComment={getCommentsData} post={item} />}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  touchableOpacity: {
    flex: 1,
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: theme.FONT_WEIGHT.BOLD,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});