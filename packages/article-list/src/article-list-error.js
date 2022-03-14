import React, { Fragment } from "react";
import { Text } from "react-native";
import styles from "./styles";

const ArticleListError = () => (
  <Fragment>
    <Text
      style={styles.listErrorHeading}
      maxFontSizeMultiplier={2}
      minimumFontScale={0.7}
    >
      Something&apos;s gone wrong
    </Text>
    <Text
      style={styles.listErrorMessage}
      maxFontSizeMultiplier={2}
      minimumFontScale={0.7}
    >
      We can&apos;t load the page you have requested. Please check your network
      connection and retry to continue
    </Text>
  </Fragment>
);

export default ArticleListError;
