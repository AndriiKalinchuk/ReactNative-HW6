import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import PostsItem from "../../components/PostsItem/PostsItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAvatar,
  selectEmail,
  selectLogin,
} from "../../redux/auth/authSelections";

const DefaultPostsScreen = ({ route }) => {
  const dispatch = useDispatch();

  const avatar = useSelector(selectAvatar);
  const login = useSelector(selectLogin);
  const email = useSelector(selectEmail);

  const [posts, setPosts] = useState([
    {
      id: "123hjklkk3hnjjh",
      postImg: "../../../assets/img/picture.jpg",
      postName: "Picture",
      postAddress: "Лютіж",
      postLocation: { latitude: 50.6803954, longitude: 30.3832681 },
    },
  ]);

  useEffect(() => {
    if (!route.params) return;

    setPosts((prev) => [...prev, route.params]);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatarImg} source={avatar} />
        <View>
          <Text style={styles.avatarName}>Natali Romanova</Text>
          <Text style={styles.avatarEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        style={styles.postsWrapper}
        data={posts}
        renderItem={({ item }) => (
          <PostsItem
            postName={item.postName}
            postImg={item.postImg}
            postAddress={item.postAddress}
            postLocation={item.postLocation}
          />
        )}
        keyExtractor={(item, idx) => idx.toString()}
      />
      <View style={styles.navTabs}></View>
    </View>
  );
};

export default DefaultPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,
    paddingTop: 32,

    backgroundColor: "#fff",
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarImg: {
    width: 60,
    height: 60,

    marginRight: 8,

    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatarName: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,

    color: "#212121",
  },
  avatarEmail: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,

    color: "rgba(33, 33, 33, 0.8)",
  },
});
