import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";

const MySVGIcon = () => {
  return (
    <View style={styles.container}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Rect width={24} height={24} fill="white" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 3H10V10H3V3Z"
          stroke="#212121"
          strokeOpacity={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 3H21V10H14V3Z"
          stroke="#212121"
          strokeOpacity={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 14H21V21H14V14Z"
          stroke="#212121"
          strokeOpacity={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 14H10V21H3V14Z"
          stroke="#212121"
          strokeOpacity={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MySVGIcon;
