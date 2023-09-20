import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Keyboard, Platform } from "react-native";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import backgroundImg from "../../assets/img/background.jpg";
import SvgAddButton from "../../assets/svg/SvgAddButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { authStateChange } from "../../redux/auth/authSlice";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);
  const [currentFocused, setCurrentFocused] = useState("");

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Дозвольте доступ до галереї для завантаження фотографій.");
      }
    })();
  }, []);

  const onSubmitUserRegister = async () => {
    if (!login || !email || !password) {
      alert("Будь ласка, заповніть всі поля.");
      return;
    }

    try {
      const photo = avatar
        ? await uploadImageToServer(avatar, "avatars")
        : "https://firebasestorage.googleapis.com/v0/b/reactnativehw-399015.appspot.com/o/Default_pfp.svg.png?alt=media&token=4f64fea5-d586-44f7-8a72-2fde0e66dfd8";

      const imageUrl = await getPhotoUrlFromFirestore(photo);
      if (!imageUrl) {
        alert("Помилка отримання URL-адреси фотографії.");
        return;
      }

      const user = { photo: imageUrl, login, email, password };
      const data = await dispatch(authSignUpUser(user));

      if (data === undefined || !data.uid) {
        alert("Реєстрацію не виконано!");
        return;
      }

      console.log({ login, email, password, photo });

      dispatch(authStateChange({ stateChange: true }));
    } catch (error) {
      console.error("Помилка реєстрації користувача: ", error);
      alert("Помилка реєстрації користувача.");
    }
  };

  const onLoadAvatar = async () => {
    if (avatar && avatar.uri) {
      setAvatar(null);
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0]);
      }
    } catch (error) {
      console.error("Помилка завантаження фотографії: ", error);
      alert("Помилка завантаження фотографії.");
    }
  };

  const uploadImageToServer = async (imageUri, prefixFolder) => {
    const uniquePostId = Date.now().toString();

    if (imageUri) {
      try {
        const imagesCollection = collection(db, "images");
        const docRef = await addDoc(imagesCollection, {
          url: imageUri,
          prefixFolder: prefixFolder,
          timestamp: uniquePostId,
        });
        const imageId = docRef.id;
        return imageId;
      } catch (error) {
        console.error("Помилка додавання документа зображення: ", error);
        throw error;
      }
    }
  };

  const getPhotoUrlFromFirestore = async (photo) => {
    try {
      const photoDocRef = doc(db, "images", photo);
      const photoDocSnapshot = await getDoc(photoDocRef);

      if (photoDocSnapshot.exists()) {
        const photoData = photoDocSnapshot.data();
        const photoUrl = photoData.url;
        return photoUrl;
      } else {
        console.log("Документ з вказаним ID не існує.");
        return null;
      }
    } catch (error) {
      console.error("Помилка отримання фото URL з Firestore: ", error);
      throw error;
    }
  };

  const handleFocus = (currentFocusInput = "") => {
    setIsShowKeyboard(true);
    setCurrentFocused(currentFocusInput);
  };

  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    setCurrentFocused("");
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ImageBackground source={backgroundImg} style={styles.bgContainer}>
          <View style={styles.contentWrapper}>
            <View style={styles.avatarWrapper}>
              {avatar && avatar.uri && (
                <Image style={styles.avatar} source={{ uri: avatar.uri }} />
              )}
              <TouchableOpacity
                style={avatar ? styles.btnAddAvatarLoad : styles.btnAddAvatar}
                onPress={onLoadAvatar}
              >
                <SvgAddButton
                  style={
                    avatar ? styles.btnAddAvatarSvgLoad : styles.btnAddAvatarSvg
                  }
                />
              </TouchableOpacity>
            </View>
            <Text style={{ ...styles.title, marginTop: 92 }}>Реєстрація</Text>
            <TextInput
              style={{
                ...styles.input,
                backgroundColor:
                  currentFocused === "login" ? "#ffffff" : "#f6f6f6",
                borderColor: currentFocused === "login" ? "#ff6c00" : "#e8e8e8",
              }}
              placeholder="Логін"
              placeholderTextColor="#bdbdbd"
              autoComplete="username"
              autoCapitalize="none"
              value={login}
              onChangeText={setLogin}
              onFocus={() => handleFocus("login")}
            />
            <TextInput
              style={{
                ...styles.input,
                backgroundColor:
                  currentFocused === "email" ? "#ffffff" : "#f6f6f6",
                borderColor: currentFocused === "email" ? "#ff6c00" : "#e8e8e8",
              }}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#bdbdbd"
              autoComplete="email"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => handleFocus("email")}
            />
            <View
              style={{
                ...styles.passWrapper,
                marginBottom: isShowKeyboard ? 159 : 43,
              }}
            >
              <TextInput
                style={{
                  ...styles.input,
                  ...styles.inputLast,
                  backgroundColor:
                    currentFocused === "password" ? "#ffffff" : "#f6f6f6",
                  borderColor:
                    currentFocused === "password" ? "#ff6c00" : "#e8e8e8",
                }}
                placeholder="Пароль"
                placeholderTextColor="#bdbdbd"
                autoComplete="password"
                autoCapitalize="none"
                secureTextEntry={isSecureText}
                value={password}
                onChangeText={setPassword}
                onFocus={() => handleFocus("password")}
              />
              <TouchableOpacity
                style={styles.btnPassShow}
                onPress={() => setPassword((prev) => !prev)}
              >
                <Text style={styles.btnPassShowText}>
                  {isSecureText ? "Показати" : "Приховати"}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.btn}
                onPress={onSubmitUserRegister}
              >
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.linkText}>
                  Вже є акаунт?{" "}
                  <Text style={styles.linkTextUnderline}>Увійти</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

  bgContainer: {
    width: "100%",
    height: "100%",

    flexDirection: "row",
    alignItems: "flex-end",

    resizeMode: "cover",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  contentWrapper: {
    paddingHorizontal: 16,

    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",

    marginTop: 32,
    marginBottom: 32,
    color: "#212121",
  },
  input: {
    height: 50,
    fontSize: 16,
    padding: 16,
    marginBottom: 16,

    color: "#212121",
    backgroundColor: "#f6f6f6",

    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 8,
  },
  inputLast: {
    marginBottom: 0,
  },
  passWrapper: {
    marginBottom: 43,
  },
  btnPassShow: {
    position: "absolute",
    right: 0,
    top: 0,
    alignSelf: "center",

    padding: 16,

    backgroundColor: "transparent",
  },
  btnPassShowText: {
    color: "#1B4371",
  },

  btn: {
    alignItems: "center",
    padding: 16,

    backgroundColor: "#ff6c00",
    borderRadius: 100,
  },
  btnText: {
    color: "#ffffff",
  },

  link: {
    alignItems: "center",

    marginTop: 16,
  },
  linkText: {
    color: "#1B4371",
    marginBottom: 45,
  },
  linkTextUnderline: {
    textDecorationLine: "underline",
  },

  avatarWrapper: {
    position: "absolute",
    top: -60,
    alignSelf: "center",

    width: 120,
    height: 120,

    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btnAddAvatar: {
    position: "absolute",
    bottom: 14,
    right: -12.5,

    alignItems: "center",
    alignContent: "center",

    width: 25,
    height: 25,

    color: "#ff6c00",
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  btnAddAvatarLoad: {
    position: "absolute",
    bottom: 14,
    right: -12.5,

    alignItems: "center",
    alignContent: "center",

    width: 25,
    height: 25,

    color: "#ff6c00",
    backgroundColor: "#ffffff",
    borderRadius: 50,

    transform: [{ rotate: "45deg" }],
  },
  btnAddAvatarSvg: {
    fill: "#ff6c00",
    stroke: "#ff6c00",
    backgroundColor: "#ffffff",
  },
  btnAddAvatarSvgLoad: {
    fill: "#bdbdbd",
    stroke: "#e8e8e8",
    backgroundColor: "#ffffff",
  },
});
