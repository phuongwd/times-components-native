import scales from "../scales";
import sharedFontSizes from "./font-sizes-base";

const fontSizes = (scale) => {
  switch (scale) {
    case scales.medium:
      return {
        ...sharedFontSizes,
      };
    case scales.large:
      return {
        ...sharedFontSizes,
        bodyMobile: 21,
        button: 17,
        cardMetaMobile: 17,
        keyFactsTitle: 17,
        link: 14,
        secondary: 21,
      };
    case scales.xlarge:
      return {
        ...sharedFontSizes,
        bodyMobile: 23,
        button: 18,
        cardMetaMobile: 19,
        keyFactsTitle: 19,
        link: 15,
        secondary: 23,
      };
    default:
      return {
        ...sharedFontSizes,
        bodyMobile: 18,
        infoTitle: 20,
      };
  }
};

export default fontSizes;
