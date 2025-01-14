/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components-native/styleguide";
import {
  getTileStrapline,
  TileLink,
  TileSummary,
  getTileSummary,
} from "../shared";
import stylesFactory from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileX = ({
  onPress,
  tile,
  breakpoint = editionBreakpoints.medium,
  orientation,
  bullets,
}) => {
  const styles = stylesFactory(breakpoint, orientation);

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <WithoutWhiteSpace
        render={(whiteSpaceHeight) => (
          <TileSummary
            headlineStyle={styles.headline}
            strapline={getTileStrapline(tile)}
            straplineStyle={styles.strapline}
            summary={getTileSummary(tile, 1000)}
            summaryStyle={styles.summary}
            tile={tile}
            whiteSpaceHeight={whiteSpaceHeight}
            withStar={false}
            bullets={bullets}
            onPress={onPress}
          />
        )}
      />
      <PositionedTileStar articleId={tile.article.id} />
    </TileLink>
  );
};

TileX.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string,
  bullets: PropTypes.array,
};

export default TileX;
