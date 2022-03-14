import React from "react";
import { Text } from "react-native";
import { editionBreakpoints } from "@times-components-native/styleguide";
import stylefactory from "./styles";

const styles = stylefactory(editionBreakpoints.small);

export default {
  bold(key, attributes, renderedChildren) {
    return (
      <Text
        key={key}
        style={styles.bold}
        maxFontSizeMultiplier={2}
        minimumFontScale={0.7}
      >
        {renderedChildren}
      </Text>
    );
  },
};
