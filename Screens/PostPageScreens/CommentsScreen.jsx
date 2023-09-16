import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import SvgArrowLeft from "../../assets/svg/SvgArrowLeft";
import CommentItem from "../../components/CommentItem/CommentItem";
import { useIsFocused } from "@react-navigation/native";

const CommentsScreen = ({ navigation, route: { params } }) => {
  const isFocused = useIsFocused();

  const [commentText, setCommentText] = useState("");
  const [comments, setComment] = useState([
    {
      authorAvatar: "",
      comment: "1st comment",
      date: "15 вересня, 2023 | 14:40",
    },
    {
      authorAvatar: "",
      comment: "2nd comment",
      date: "15 вересня, 2023 | 14:40",
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "none" },
        headerShown: false,
      });
    }
  }, []);

  const handleAddComment = () => {
    if (!commentText.trim())
      return console.warn("Будь ласка напишіть коментар");
    const data = {
      authorAvatar: "",
      comment: commentText,
      date: "15 вересня, 2023 | 14:40",
    };

    setComment((prev) => [...prev, data]);
    handleKeyboardHide();
    setCommentText("");
  };

  const handleKeyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <Image style={styles.postImg} source={{ uri: params.postImg }} />
        <FlatList
          style={styles.commentList}
          data={comments}
          renderItem={({ item }) => (
            <CommentItem
              comment={item.comment}
              date={item.date}
              authorAvatar={item.authorAvatar}
            />
          )}
          keyExtractor={(item, idx) => idx.toString()}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.inputCommentWrapper}>
            <TextInput
              style={styles.commentInput}
              placeholder="Коментувати..."
              placeholderTextColor="#bdbdbd"
              autoComplete="off"
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity
              style={styles.commentBtn}
              onPress={handleAddComment}
            >
              <SvgArrowLeft style={styles.svgArrow} stroke="#ffffff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  postImg: {
    height: 240,
    width: "100%",
    marginBottom: 28,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
  },
  commentList: {
    maxHeight: 312,
    marginBottom: 28,
  },
  inputCommentWrapper: {},
  commentInput: {
    position: "relative",
    width: "100%",
    height: 50,
    padding: 16,
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 100,
  },
  commentBtn: {
    position: "absolute",
    right: 8,
    top: 7,
    paddingHorizontal: 6,
    paddingVertical: 6,
    backgroundColor: "#ff600c",
    borderRadius: 100,
  },

  svgArrow: {
    height: 10,
    width: 10,
    transform: [{ rotate: "90deg" }],
  },
});
