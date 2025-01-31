import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { ItemRowSeparator } from "../shared";

const VerticalLayout = ({ style, tiles, rowSeparatorStyle }) => (
  <View style={style}>
    {tiles.map((tile, index) => (
      <Fragment key={`${tile.props.tileName || index}`}>
        {tile}
        {index !== tiles.length - 1 ? (
          <ItemRowSeparator style={rowSeparatorStyle} />
        ) : null}
      </Fragment>
    ))}
  </View>
);

VerticalLayout.propTypes = {
  style: PropTypes.shape({}),
  tiles: PropTypes.arrayOf(PropTypes.node).isRequired,
};

VerticalLayout.defaultProps = {
  style: {},
};

export default VerticalLayout;
