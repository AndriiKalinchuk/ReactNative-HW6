import { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";

const MapScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const [location, setLocation] = useState({});

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "none" },
        headerShown: false,
      });
    } else {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: {
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        },
        headerShown: true,
      });
    }

    if (route.params) setLocation(route.params.postLocation);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && <Marker title="It`s here" coordinate={location} />}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
