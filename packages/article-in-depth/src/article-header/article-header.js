import React from "react";
import { Text, View } from "react-native";
import { ArticleFlags } from "@times-components-native/article-flag";
import Context from "@times-components-native/context";
import { fontFactory } from "@times-components-native/styleguide";
import { gqlRgbaToStyle } from "@times-components-native/utils";

import Label from "../article-label/article-label";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps,
} from "./article-header-prop-types";
import styles from "../styles";

const ArticleHeader = ({
  backgroundColour: rgbBackgroundColour,
  flags,
  hasVideo,
  headline,
  isArticleTablet,
  label,
  standfirst,
  textColour: rgbTextColour,
}) => {
  const backgroundColour = gqlRgbaToStyle(rgbBackgroundColour);
  const textColour = gqlRgbaToStyle(rgbTextColour);

  return (
    <Context.Consumer>
      {({ theme: { headlineFont, headlineCase } }) => (
        <View
          style={[
            styles.container,
            { backgroundColor: backgroundColour, width: "100%" },
            isArticleTablet && styles.containerTablet,
          ]}
        >
          <View
            style={[
              styles.headerText,
              isArticleTablet && styles.headerTextTablet,
            ]}
          >
            <Label
              color={textColour}
              isVideo={hasVideo}
              isArticleTablet={isArticleTablet}
              label={label}
            />
            <Text
              style={[
                styles.articleHeadline,
                {
                  color: textColour,
                  ...fontFactory({
                    font: headlineFont || "headline",
                    fontSize: isArticleTablet ? "pageHeadline" : "headline",
                  }),
                },
                headlineCase ? { textTransform: headlineCase } : null,
              ]}
            >
              {headline}
            </Text>
            <ArticleFlags color={textColour} flags={flags} withContainer />
            <Standfirst color={textColour} standfirst={standfirst} />
          </View>
        </View>
      )}
    </Context.Consumer>
  );
};

ArticleHeader.propTypes = {
  ...articleHeaderPropTypes,
};

ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
