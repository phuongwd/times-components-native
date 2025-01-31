/* eslint-disable react/require-default-props */
import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components-native/styleguide";
import {
  getTileImage,
  getTileSummary,
  TileLink,
  TileSummary,
  TileImage,
  withTileTracking,
} from "../shared";
import styleFactory from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileZ = ({
  onPress,
  tile,
  breakpoint = editionBreakpoints.wide,
  bullets = [],
}) => {
  const crop = getTileImage(tile, "crop32");
  const styles = styleFactory(breakpoint);

  if (!crop) {
    return null;
  }

  const {
    article: { hasVideo },
  } = tile;

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <View style={styles.summaryContainer}>
        <WithoutWhiteSpace
          render={(whiteSpaceHeight) => (
            <TileSummary
              headlineStyle={styles.headline}
              summary={getTileSummary(tile, 800)}
              summaryStyle={styles.summary}
              tile={tile}
              whiteSpaceHeight={whiteSpaceHeight}
              withStar={false}
              bullets={bullets}
            />
          )}
        />
        <PositionedTileStar articleId={tile.article.id} />
      </View>

      <TileImage
        aspectRatio={3 / 2}
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

TileZ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string,
  bullets: PropTypes.array,
};

export default withTileTracking(TileZ);
