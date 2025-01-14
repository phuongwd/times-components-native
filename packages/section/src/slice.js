import { getSlice } from "@times-components-native/edition-slices";
import React from "react";
import PropTypes from "prop-types";
import withSliceTrackingContext from "./slice-tracking-context";

const Slice = ({
  slice,
  onPress,
  onLinkPress,
  isInSupplement,
  inTodaysEditionSlice,
  adConfig,
  sectionTitle,
  orientation,
  isTablet,
  puzzleMetaData,
}) => {
  const Component = getSlice(
    isInSupplement,
    slice.name,
    sectionTitle,
    orientation,
    isTablet,
  );
  return Component ? (
    <Component
      onPress={onPress}
      onLinkPress={onLinkPress}
      slice={slice}
      inTodaysEditionSlice={inTodaysEditionSlice}
      adConfig={adConfig}
      puzzleMetaData={puzzleMetaData}
    />
  ) : null;
};

Slice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({}).isRequired,
};

export default withSliceTrackingContext(Slice);
