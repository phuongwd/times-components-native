import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colours, fonts } from "@times-components-native/styleguide";
import styles from "./styles";

const localStyles = StyleSheet.create({
  container: {
    paddingRight: 8,
    paddingLeft: 10,
    paddingVertical: 4,
  },
  diamondBullet: {
    transform: [{ rotate: "45deg" }],
    height: 4.5,
    width: 4.5,
    backgroundColor: "white",
  },
  title: {
    color: "white",
    paddingTop: 2,
    fontFamily: fonts.supporting,
    fontWeight: "500",
  },
});

interface DiamondArticleFlagType {
  title: string;
  color: string;
}

const DiamondArticleFlag = ({
  title,
  color = colours.functional.darkRed,
}: DiamondArticleFlagType) => (
  <View
    style={[styles.view, localStyles.container, { backgroundColor: color }]}
  >
    <View style={[localStyles.diamondBullet]} />
    <Text
      accessibilityLabel={`${title} Flag`}
      style={[styles.title, localStyles.title]}
      testID={`flag-${title}`}
    >
      {title}
    </Text>
  </View>
);

export default DiamondArticleFlag;
