import PropTypes from "prop-types";

const articleHeaderPropTypes = {
  articleId: PropTypes.string.isRequired,
  authorImage: PropTypes.string.isRequired,
  bylines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flags: PropTypes.arrayOf(
    PropTypes.shape({
      expiryTime: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  publicationName: PropTypes.string.isRequired,
  publishedTime: PropTypes.string.isRequired,
  standfirst: PropTypes.string,
  tooltips: PropTypes.array.isRequired,
};

const articleHeaderDefaultProps = {
  flags: [],
  hasVideo: false,
  label: null,
  standfirst: null,
};

export { articleHeaderPropTypes, articleHeaderDefaultProps };
