export type FontsKeys =
  | "body"
  | "bodyRegular"
  | "bodyBold"
  | "bodyRegularSmallCaps"
  | "cultureMagazine"
  | "dropCap"
  | "frontByline"
  | "headline"
  | "headlineRegular"
  | "stMagazine"
  | "styleMagazine"
  | "supporting";

const fonts: Record<FontsKeys, string> = {
  body: "TimesDigitalW04",
  bodyRegular: "TimesDigitalW04-Regular",
  bodyBold: "TimesDigitalW04-Bold",
  bodyRegularSmallCaps: "TimesDigitalW04-RegularSC",
  cultureMagazine: "Flama-Bold",
  dropCap: "TimesModern-Regular",
  frontByline: "GillSansMTStd-Bold",
  headline: "TimesModern-Bold",
  headlineRegular: "TimesModern-Regular",
  stMagazine: "Tiempos-Headline-Bold",
  styleMagazine: "CenturyGothic-Bold",
  supporting: "GillSansMTStd-Medium",
};

export default fonts;
