import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import {
  ArticleBylineWithLinks,
  hasBylineData,
} from "@times-components-native/article-byline";
import Context from "@times-components-native/context";
import DatePublication from "@times-components-native/date-publication";
import { colours } from "@times-components-native/styleguide";

import metaPropTypes from "./article-meta-prop-types";
import styles from "../styles";

const Separator = () => <View style={styles.separator} />;

const ArticleMeta = ({
  articleId,
  bylines,
  isArticleTablet,
  onAuthorPress,
  publicationName,
  publishedTime,
}) => (
  <View
    style={[
      styles.metaContainer,
      isArticleTablet && styles.metaContainerTablet,
    ]}
  >
    {hasBylineData(bylines) && (
      <View style={[styles.meta, isArticleTablet && styles.metaTablet]}>
        <Context.Consumer>
          {({ theme: { sectionColour } }) => (
            <ArticleBylineWithLinks
              articleId={articleId}
              ast={bylines}
              color={sectionColour || colours.section.default}
              onAuthorPress={onAuthorPress}
            />
          )}
        </Context.Consumer>
      </View>
    )}
    {isArticleTablet ? <Separator /> : null}
    <View style={[styles.meta, isArticleTablet && styles.metaTablet]}>
      <DatePublication
        style={[
          styles.datePublication,
          isArticleTablet && styles.datePublicationTablet,
        ]}
        date={publishedTime}
        publication={publicationName}
      />
    </View>
  </View>
);

ArticleMeta.propTypes = {
  ...metaPropTypes,
  onAuthorPress: PropTypes.func.isRequired,
};

export default ArticleMeta;
