/* eslint-disable prefer-destructuring */
import React from "react";
import { Dimensions, NativeModules, Platform, Text, View } from "react-native";
import {
  getNarrowArticleBreakpoint,
  spacing,
  tabletRowPadding,
  tabletWidth,
} from "@times-components-native/styleguide";
import Ad from "@times-components-native/ad";
import InlineContent from "@times-components-native/inline-content";
import ArticleImage from "@times-components-native/article-image";
import {
  InteractiveWrapper,
  WebviewWrapper,
} from "@times-components-native/interactive-wrapper";
import KeyFacts from "@times-components-native/key-facts";
import PullQuote from "@times-components-native/pull-quote";
import Video from "@times-components-native/video";
import ArticleParagraphWrapper from "@times-components-native/article-paragraph";
import InsetCaption from "./inset-caption";
import styleFactory from "../styles/article-body";
import ArticleLink from "./article-link";
import ArticleEndTracking from "./article-end-tracking";
import InlineNewsletterPuff from "./inline-newsletter-puff";
import { useResponsiveContext } from "@times-components-native/responsive";
import ArticleUpdateHeader from "@times-components-native/article-update-header";
import get from "lodash.get";
import ArticleExtras from "@times-components-native/article-extras";

const { track } = NativeModules.ReactAnalytics;

const ArticleBodyRow = ({
  data,
  interactiveConfig,
  onLinkPress,
  onTwitterLinkPress,
  onVideoPress,
  onImagePress,
  isArticleTablet,
  adConfig,
  images = [],
  scale,
  analyticsStream,
  narrowContent,
  onParagraphTextLayout,
  onCommentGuidelinesPress,
  onCommentsPress,
  onRelatedArticlePress,
  onTooltipPresented,
  tooltips,
  onTopicPress,
  scrollToRef,
}) => {
  const { fontScale } = Dimensions.get("window");
  const { narrowArticleBreakpoint } = useResponsiveContext();
  const styles = styleFactory({
    scale,
    narrowContent,
    fontScale,
    narrowArticleBreakpoint,
  });

  return {
    text(key, attributes) {
      return <Text>{attributes.value}</Text>;
    },
    heading2(key, attributes, children, index, tree) {
      return (
        <ArticleParagraphWrapper style={styles.headingContainer} ast={children}>
          <Text style={styles[tree.name]}>{children}</Text>
        </ArticleParagraphWrapper>
      );
    },
    heading3(key, attributes, children, index, tree) {
      return this.heading2(key, attributes, children, index, tree);
    },
    heading4(key, attributes, children, index, tree) {
      return this.heading2(key, attributes, children, index, tree);
    },
    heading5(key, attributes, children, index, tree) {
      return this.heading2(key, attributes, children, index, tree);
    },
    heading6(key, attributes, children, index, tree) {
      return this.heading2(key, attributes, children, index, tree);
    },
    bold(key, attributes, children) {
      return <Text style={styles.bold}>{children}</Text>;
    },
    emphasis(key, attributes, children) {
      return this.bold(key, attributes, children);
    },
    strong(key, attributes, children) {
      return this.bold(key, attributes, children);
    },
    italic(key, attributes, children) {
      return <Text style={styles.italic}>{children}</Text>;
    },
    link(key, { href, canonicalId, type }, children) {
      return (
        <ArticleLink
          testID={"hyperlink"}
          url={href}
          style={styles.articleLink}
          onPress={(e) =>
            onLinkPress(e, {
              canonicalId,
              type,
              url: href,
            })
          }
        >
          {children}
        </ArticleLink>
      );
    },
    subscript(key, attributes, children) {
      return (
        <View style={styles.subscriptContainer}>
          <Text style={styles.subscript}>{children}</Text>
        </View>
      );
    },
    superscript(key, attributes, children) {
      return (
        <View style={styles.superscriptContainer}>
          <Text style={styles.superscript}>{children}</Text>
        </View>
      );
    },
    paragraph(key, attributes, children) {
      return (
        <ArticleParagraphWrapper
          narrowContent={narrowContent}
          attributes={attributes}
          ast={children}
        >
          <Text
            testID={"paragraph"}
            onTextLayout={onParagraphTextLayout}
            selectable
            allowFontScaling={false}
            style={styles.defaultFont}
          >
            {children}
          </Text>
        </ArticleParagraphWrapper>
      );
    },
    ad(key, attributes) {
      return (
        <Ad
          key={key}
          adConfig={adConfig}
          narrowContent={narrowContent}
          slotName="native-inline-ad"
          {...attributes}
        />
      );
    },
    articleEndTracking() {
      return (
        <ArticleEndTracking
          onViewed={() => {
            track({
              object: "Article",
              action: "Viewed",
              component: "Page",
              attrs: {
                article_id: data.id,
                article_publish_timestamp: data.publishedTime,
                event_navigation_action: "article : view end",
                event_navigation_browsing_method: "scroll",
                headline: data.headline,
                page_name: `${data.slug}-${data.shortIdentifier}`,
                page_section: data.section,
                page_type: data.template,
                article_author: get(
                  data,
                  "bylines[0].byline[0].children[0].attributes.value",
                  "",
                ),
              },
            });
          }}
        />
      );
    },
    inlineContent(key, attributes, children) {
      return (
        <InlineContent
          key={key}
          adConfig={adConfig}
          defaultFont={styles.defaultFont}
          onImagePress={onImagePress}
          onTwitterLinkPress={onTwitterLinkPress}
          narrowContent={narrowContent}
          {...attributes}
        >
          {children}
        </InlineContent>
      );
    },
    image(
      key,
      {
        display,
        ratio,
        url,
        caption,
        credits,
        relativeWidth,
        relativeHeight,
        relativeHorizontalOffset,
        relativeVerticalOffset,
        imageIndex,
      },
    ) {
      return (
        <ArticleImage
          captionOptions={{
            caption,
            credits,
          }}
          onImagePress={onImagePress}
          images={images}
          key={key}
          imageOptions={{
            display:
              !isArticleTablet && caption && display === "inline"
                ? "secondary"
                : display,
            ratio,
            index: imageIndex,
            uri: url,
            relativeWidth,
            relativeHeight,
            relativeHorizontalOffset,
            relativeVerticalOffset,
            narrowContent,
          }}
        />
      );
    },
    interactive(key, { id, display, element }) {
      if (element.value === "article-header") {
        return (
          <View
            key={key}
            style={[
              styles.primaryContainer,
              isArticleTablet && styles.containerTablet,
              narrowContent && {
                alignSelf: "stretch",
                marginLeft: spacing(2),
              },
              {
                paddingHorizontal: 10,
              },
            ]}
          >
            <ArticleUpdateHeader
              breaking={element.attributes.breaking}
              headline={element.attributes.headline}
              updated={element.attributes.updated}
            />
          </View>
        );
      }
      if (
        Platform.OS === "ios" &&
        element &&
        element.value === "responsive-graphics"
      ) {
        const {
          attributes: { "deck-id": deckId },
        } = element;

        return (
          <View
            key={key}
            style={[
              styles.interactiveContainer,
              isArticleTablet && styles.interactiveContainerTablet,
              isArticleTablet &&
                display === "fullwidth" &&
                styles.interactiveContainerFullWidth,
            ]}
          >
            <InteractiveWrapper.ResponsiveImageInteractive
              deckId={deckId}
              key={key}
            />
          </View>
        );
      }
      if (element && element.value === "newsletter-puff") {
        const {
          attributes: { code, copy, headline, imageUri, label },
        } = element;
        return (
          <InlineNewsletterPuff
            analyticsStream={analyticsStream}
            key={key}
            code={code}
            copy={decodeURIComponent(copy)}
            headline={decodeURIComponent(headline)}
            imageUri={decodeURIComponent(imageUri)}
            label={decodeURIComponent(label)}
          />
        );
      }
      return (
        <View
          key={key}
          style={[
            styles.interactiveContainer,
            isArticleTablet && styles.interactiveContainerTablet,
            display === "fullwidth" && styles.interactiveContainerFullWidth,
          ]}
        >
          {Platform.OS === "android" ? (
            <InteractiveWrapper config={interactiveConfig} id={id} key={key} />
          ) : (
            <WebviewWrapper config={interactiveConfig} id={id} key={key} />
          )}
        </View>
      );
    },
    footer() {
      const { id, url, template } = data;

      return (
        <ArticleExtras
          analyticsStream={analyticsStream}
          articleId={id}
          articleUrl={url}
          onCommentGuidelinesPress={onCommentGuidelinesPress}
          onCommentsPress={onCommentsPress}
          onRelatedArticlePress={onRelatedArticlePress}
          onTooltipPresented={onTooltipPresented}
          onTopicPress={onTopicPress}
          narrowContent={narrowContent}
          template={template}
          tooltips={tooltips}
        />
      );
    },
    break() {
      return <Text>{`\n`}</Text>;
    },
    keyFacts(key, attributes, children, index, tree) {
      return (
        <View style={isArticleTablet && styles.containerTablet}>
          <KeyFacts
            ast={tree}
            key={key}
            onLinkPress={onLinkPress}
            scrollToRef={scrollToRef}
          />
        </View>
      );
    },
    unorderedList(key, attributes, children, index, tree) {
      return tree;
    },
    pullQuote(key, { caption: { name, text, twitter } }, children) {
      const content = children[0].string;
      return (
        <PullQuote
          caption={name}
          onTwitterLinkPress={onTwitterLinkPress}
          text={text}
          twitter={twitter}
        >
          {content}
        </PullQuote>
      );
    },
    video(
      key,
      {
        brightcovePolicyKey,
        brightcoveVideoId,
        brightcoveAccountId,
        posterImageUrl,
        caption,
      },
    ) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { windowWidth } = useResponsiveContext();
      const aspectRatio = 16 / 9;

      const getWideContentWidth = () => {
        const contentWidth = isArticleTablet ? tabletWidth : windowWidth;
        return contentWidth - (isArticleTablet && tabletRowPadding);
      };

      const contentWidth = narrowContent
        ? getNarrowArticleBreakpoint(windowWidth).content
        : getWideContentWidth();

      const height = contentWidth / aspectRatio;

      const captionStyle = {
        container: {
          paddingLeft: narrowContent ? 0 : spacing(2),
        },
      };

      return (
        <View
          key={key}
          style={[
            styles.primaryContainer,
            isArticleTablet && styles.containerTablet,
            narrowContent && {
              alignSelf: "stretch",
              marginLeft: spacing(2),
              width: contentWidth,
            },
          ]}
        >
          <Video
            testIDProp="inline-video"
            accountId={brightcoveAccountId}
            height={height}
            onVideoPress={onVideoPress}
            policyKey={brightcovePolicyKey}
            poster={{ uri: posterImageUrl }}
            videoId={brightcoveVideoId}
            width={contentWidth}
          />
          <InsetCaption caption={caption} style={captionStyle} />
        </View>
      );
    },
    unknown(key, attributes, children) {
      return children;
    },
  };
};

export default ArticleBodyRow;
