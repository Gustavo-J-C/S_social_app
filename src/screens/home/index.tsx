import React, { useEffect, useState } from "react";
import { FlatList, Text, ActivityIndicator, Modal, Alert, View, Dimensions, StyleSheet, TouchableOpacity, Animated, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostComponent from "../../components/Post/PostComponent";
import { useData } from "../../hooks/data";
import CommentComponent from "../../components/Comment/CommentComponent";

export default function Home() {
  const { posts, getPosts, loading, hasMorePosts, likePost } = useData();
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnimation = new Animated.Value(1);

  useEffect(() => {
    // Carregar os posts iniciais
    getPosts();
  }, []);

  const handleComment = () => {

    Animated.timing(fadeAnimation, {
      toValue: modalVisible ? 0 : 1,
      duration: 300, // Adjust the duration as needed
      useNativeDriver: false, // Set to true if you are using Hermes engine
    }).start(() => setModalVisible(!modalVisible));
  };


  const handleEndReached = () => {
    if (hasMorePosts && !loading) {
      // Carregar mais posts quando o final da lista é alcançado
      getPosts(); // Agora a função getPosts faz a paginação
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" /> : null;
  };

  const mockData = [
    { id: 1, user_id: 1, post_id: 1, description: "Ele é muito louco", created_at: String(Date.now()), updated_at: String(Date.now()) },
    { id: 1, user_id: 1, post_id: 1, description: "Ele é muito louco", created_at: String(Date.now()), updated_at: String(Date.now()) },
    { id: 1, user_id: 1, post_id: 1, description: "Ele é muito louco", created_at: String(Date.now()), updated_at: String(Date.now()) },
    { id: 1, user_id: 1, post_id: 1, description: "Ele é muito louco", created_at: String(Date.now()), updated_at: String(Date.now()) }
  ]

  return (
    <SafeAreaView style={{ justifyContent: "center", flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          handleComment(); // Animate background opacity when closing the modal
        }}>
        <Animated.View
          style={[
            styles.centeredView,
            {
              backgroundColor: fadeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ["rgba(52, 52, 52, 0)", "rgba(52, 52, 52, 0.8)"],
              }),
            },
          ]}
        >
          <TouchableOpacity activeOpacity={1} style={styles.touchableOpacity} onPress={handleComment} />
          <View style={{ height: 30, width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#fff' }}>
          </View>
          <View style={{ flex: 4, alignItems: "flex-end" }}>
            {/* <CommentComponent comment={{ id: 1, user_id: 1, post_id: 1, description: "Ele é muito louco", created_at: String(Date.now()), updated_at: String(Date.now()) }} /> */}
            <FlatList
              contentContainerStyle={{
                alignItems: "center",
                backgroundColor: "#fff",
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height
              }}
              data={mockData}
              renderItem={({ item, index }) => <CommentComponent comment={item} />}
              keyExtractor={(_, index) => index.toString()}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
            />
          </View>
            <TextInput 
            style={{backgroundColor: '#fff', width: '100%', paddingLeft: 30, height: 50, borderTopWidth: 1}}
            placeholder="Adicione um comentário"/>
        </Animated.View>
      </Modal>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: "#F6F7F9",
        }}
        data={posts}
        renderItem={({ item }) => <PostComponent handleComment={handleComment} post={item} />}
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});