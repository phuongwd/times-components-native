import React from "react";
import PropTypes from "prop-types";
import {
  getTileImage,
  TileLink,
  TileSummary,
  TileImage,
  withTileTracking,
} from "../shared";
import styles from "./styles";

const TileA = ({ onPress, tile, bullets }) => {
  const crop = getTileImage(tile, "crop169");

  if (!crop) {
    return null;
  }

  const {
    article: { hasVideo },
  } = tile;

  return (
    <TileLink onPress={onPress} tile={tile}>
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        tile={tile}
        flagsStyle={styles.flags}
        bullets={bullets}
        onPress={onPress}
      />
      <TileImage
        aspectRatio={16 / 9}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        hasVideo={hasVideo}
      />
    </TileLink>
  );
};
TileA.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  bullets: PropTypes.array,
};

export default withTileTracking(TileA);
