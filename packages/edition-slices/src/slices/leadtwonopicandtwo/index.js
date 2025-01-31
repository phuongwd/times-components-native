import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { LeadTwoNoPicAndTwoSlice } from "@times-components-native/slice-layout";
import { TileB, TileD, TileE, TileF, TileX, TileY, TileAL } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class LeadTwoNoPicAndTwo extends PureComponent {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
    this.bullets = Object.keys(this.props.slice)
      .filter((key) => key.toLowerCase().indexOf("bullet") !== -1)
      .filter((key) => this.props.slice[key] !== null)
      .map((bulletKey) => this.props.slice[bulletKey].article);
  }

  renderSmall(breakpoint, orientation) {
    const {
      onPress,
      slice: { lead1, lead2, support1, support2 },
    } = this.props;

    return (
      <LeadTwoNoPicAndTwoSlice
        breakpoint={breakpoint}
        orientation={orientation}
        lead1={
          <TileF
            onPress={onPress}
            tile={lead1}
            tileName="lead1"
            bullets={this.bullets}
          />
        }
        lead2={<TileB onPress={onPress} tile={lead2} tileName="lead2" />}
        support1={
          <TileD onPress={onPress} tile={support1} tileName="support1" />
        }
        support2={
          <TileE
            onPress={onPress}
            tile={support2}
            tileName="support2"
            orientation={orientation}
          />
        }
      />
    );
  }

  renderMedium(breakpoint, orientation) {
    const {
      onPress,
      // slice,
      slice: { lead1, lead2, support1, support2 },
    } = this.props;

    const Support1 = orientation === "landscape" ? TileAL : TileD;

    return (
      <LeadTwoNoPicAndTwoSlice
        orientation={orientation}
        breakpoint={breakpoint}
        lead1={
          <TileX
            breakpoint={breakpoint}
            onPress={onPress}
            tile={lead1}
            tileName="lead1"
            orientation={orientation}
            bullets={this.bullets}
          />
        }
        lead2={
          <TileY
            breakpoint={breakpoint}
            onPress={onPress}
            tile={lead2}
            tileName="lead2"
            orientation={orientation}
          />
        }
        support1={
          <Support1
            breakpoint={breakpoint}
            onPress={onPress}
            tile={support1}
            tileName="support1"
          />
        }
        support2={
          <TileE
            breakpoint={breakpoint}
            onPress={onPress}
            tile={support2}
            tileName="support2"
            orientation={orientation}
          />
        }
      />
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderSmall={this.renderSmall}
        renderMedium={this.renderMedium}
      />
    );
  }
}

LeadTwoNoPicAndTwo.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    lead1: PropTypes.shape({}).isRequired,
    lead2: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default LeadTwoNoPicAndTwo;
