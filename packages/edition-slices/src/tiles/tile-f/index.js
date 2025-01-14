import React from "react";
import PropTypes from "prop-types";
import {
  getTileSummary,
  getTileStrapline,
  TileLink,
  TileSummary,
  withTileTracking,
} from "../shared";
import styles from "./styles";

const TileF = ({ onPress, tile, bullets }) => {
  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileSummary
        headlineStyle={styles.headline}
        strapline={getTileStrapline(tile)}
        straplineStyle={styles.strapline}
        summary={getTileSummary(tile, 125)}
        tile={tile}
        summaryStyle={styles.summaryContainer}
        bullets={bullets}
        onPress={onPress}
      />
    </TileLink>
  );
};

TileF.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
};

export default withTileTracking(TileF);
