import PropTypes from "prop-types";
import { colours } from "@times-components-native/styleguide";

const articleLabelPropTypes = {
  color: PropTypes.string,
  isVideo: PropTypes.bool,
  label: PropTypes.string,
};

const articleLabelDefaultProps = {
  color: colours.section.default,
  isVideo: false,
  label: null,
};

export { articleLabelPropTypes, articleLabelDefaultProps };
