import {
  mockNativeModules,
  MockArticleSkeleton,
} from "@times-components-native/mocks";
// eslint-disable-next-line global-require
jest.mock("@times-components-native/ad", () => require("./ad-mock"));
jest.mock("@times-components-native/article-byline", () => ({
  ArticleBylineWithLinks: "ArticleBylineWithLinks",
  hasBylineData: () => true,
}));
jest.mock("@times-components-native/article-extras", () => "ArticleExtras");
jest.mock("@times-components-native/article-error", () => "ArticleError");
jest.mock("@times-components-native/article-flag", () => ({
  ArticleFlags: "ArticleFlags",
  getActiveArticleFlags: (flags) => flags,
}));
jest.mock("@times-components-native/article-image", () => "ArticleImage");
jest.mock("@times-components-native/article-label", () => "ArticleLabel");
jest.mock("@times-components-native/article-topics", () => "ArticleTopics");
jest.mock(
  "@times-components-native/article-skeleton",
  () => MockArticleSkeleton,
);
jest.mock("@times-components-native/button", () => "Button");
jest.mock("@times-components-native/caption", () => ({
  __esModule: true,
  CentredCaption: "CenteredCaption",
  Caption: "Caption",
}));
jest.mock("@times-components-native/image", () => ({
  __esModule: true,
  default: "Image",
  ModalImage: "ModalImage",
}));
jest.mock("@times-components-native/pull-quote", () => "PullQuote");
jest.mock("@times-components-native/related-articles", () => "RelatedArticles");
jest.mock("@times-components-native/watermark", () => "Watermark");
jest.mock("@times-components-native/video", () => "Video");
jest.mock("@times-components-native/video-label", () => "VideoLabel");

mockNativeModules();
