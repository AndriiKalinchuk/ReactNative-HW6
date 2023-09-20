import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import PostsItem from "../../components/PostsItem/PostsItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAvatar,
  selectEmail,
  selectLogin,
} from "../../redux/auth/authSelectors";

const DefaultPostsScreen = ({ route }) => {
  const dispatch = useDispatch();

  const avatar = useSelector(selectAvatar);
  const login = useSelector(selectLogin);
  const email = useSelector(selectEmail);

  const [posts, setPosts] = useState([
    {
      id: "123hjklkk3hnjjh",
      postImg:
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FReactNativeHW-10dca6b2-42e9-43e7-a725-651b81c299f4/Camera/94b5e5c1-d57a-4650-a771-8c651edfef00.jpg",
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
          <Text style={styles.avatarName}>{login}</Text>
          <Text style={styles.avatarEmail}>{email}</Text>
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
