/* eslint-disable consistent-return */
import React, { Component } from "react";
import ArticleError from "@times-components-native/article-error";
import ArticleSkeleton from "@times-components-native/article-skeleton";
import { ResponsiveContext } from "@times-components-native/responsive";
import { getHeadline } from "@times-components-native/utils";
import Context from "@times-components-native/context";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps,
} from "./article-prop-types/article-prop-types";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    const {
      article,
      onAuthorPress,
      onImagePress,
      onTooltipPresented,
      tooltips,
    } = this.props;
    const {
      bylines,
      expirableFlags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
    } = article;

    const authorImage =
      bylines &&
      bylines.length > 0 &&
      bylines[0].image &&
      Object.keys(bylines[0].image).length !== 0 &&
      bylines[0].image.crop
        ? bylines[0].image.crop.url
        : null;

    return (
      <ArticleHeader
        articleId={article.id}
        authorImage={authorImage}
        bylines={bylines}
        flags={expirableFlags}
        hasVideo={hasVideo}
        headline={getHeadline(headline, shortHeadline)}
        label={label}
        onAuthorPress={onAuthorPress}
        onImagePress={onImagePress}
        onTooltipPresented={onTooltipPresented}
        publicationName={publicationName}
        publishedTime={publishedTime}
        standfirst={standfirst}
        tooltips={tooltips}
      />
    );
  }

  render() {
    const { error, refetch, isLoading } = this.props;

    if (error) {
      return <ArticleError refetch={refetch} />;
    }

    if (isLoading) {
      return null;
    }

    const {
      adConfig,
      analyticsStream,
      article,
      interactiveConfig,
      onArticleRead,
      onAuthorPress,
      onCommentGuidelinesPress,
      onCommentsPress,
      onImagePress,
      onLinkPress,
      onRelatedArticlePress,
      onTooltipPresented,
      onTopicPress,
      onTwitterLinkPress,
      onVideoPress,
      onViewed,
      receiveChildList,
      tooltips,
    } = this.props;

    return (
      <ResponsiveContext.Consumer>
        {({ isArticleTablet }) => (
          <Context.Consumer>
            {({ theme: { scale, dropCapFont } }) => (
              <ArticleSkeleton
                adConfig={adConfig}
                analyticsStream={analyticsStream}
                data={article}
                dropCapFont={dropCapFont}
                Header={this.renderHeader}
                interactiveConfig={interactiveConfig}
                isArticleTablet={isArticleTablet}
                onArticleRead={onArticleRead}
                onAuthorPress={onAuthorPress}
                onCommentGuidelinesPress={onCommentGuidelinesPress}
                onCommentsPress={onCommentsPress}
                onImagePress={onImagePress}
                onLinkPress={onLinkPress}
                onRelatedArticlePress={onRelatedArticlePress}
                onTooltipPresented={onTooltipPresented}
                onTopicPress={onTopicPress}
                onTwitterLinkPress={onTwitterLinkPress}
                onVideoPress={onVideoPress}
                onViewableItemsChanged={
                  onViewed ? this.onViewableItemsChanged : null
                }
                receiveChildList={receiveChildList}
                scale={scale}
                tooltips={tooltips}
              />
            )}
          </Context.Consumer>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
