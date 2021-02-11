/* eslint-disable no-undef */
import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useResponsiveContext } from "@times-components-native/responsive";
import { getNarrowArticleBreakpoint } from "@times-components-native/styleguide";

import { getPrebidSlotConfig, getSlotConfig, prebidConfig } from "./utils";
import adInit from "./utils/ad-init";
import AdContainer from "./ad-container";
import DOMContext from "./dom-context";
import AdComposer from "./ad-composer";
import { defaultProps, propTypes } from "./ad-prop-types";
import styles from "./styles";
import memoizeOne from "memoize-one";

const determineData = (config, props) => {
  const { contextUrl, orientation, screenWidth, slotName, adConfig } = props;

  const allSlotConfigs = adConfig.globalSlots
    .concat(adConfig.bidderSlots)
    .map((slot) => getSlotConfig(slot, screenWidth, orientation));

  const slots = adConfig.bidderSlots.map((slot) =>
    getPrebidSlotConfig(
      slot,
      adConfig.slotTargeting.section,
      config.maxSizes.width,
      adConfig.biddersConfig.bidders,
      orientation,
    ),
  );

  return {
    adUnit: adConfig.adUnit,
    allSlotConfigs: allSlotConfigs || slots,
    bidInitialiser: adConfig.bidInitialiser || false,
    config,
    contextUrl,
    debug: adConfig.debug || false,
    disableAds: adConfig.disabled || false,
    networkId: adConfig.networkId,
    pageTargeting: adConfig.pageTargeting,
    prebidConfig: Object.assign(prebidConfig, {
      bidders: adConfig.biddersConfig.bidders,
      bucketSize: adConfig.biddersConfig.bucketSize,
      maxBid: adConfig.biddersConfig.maxBid,
      minPrice: adConfig.biddersConfig.minPrice,
      timeout: adConfig.biddersConfig.timeout,
    }),
    section: adConfig.slotTargeting.section,
    sizingMap: config.mappings,
    slotName,
    slots,
    slotTargeting: adConfig.slotTargeting,
  };
};

interface Props {}

interface State {}
export class AdBase extends PureComponent<Props, State> {
  // static getDerivedStateFromProps(nextProps) {
  //   const { slotName, width, screenWidth, orientation } = nextProps;
  //
  //   const config = getSlotConfig(slotName, width || screenWidth, orientation);
  //   return {
  //     config,
  //     data: determineData(config, nextProps),
  //   };
  // }

  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      isAdReady: false,
      offline: false,
    };
  }

  componentDidMount() {
    NetInfo.fetch()
      .then((state) => {
        const { isConnected } = state;
        this.setState({
          offline: !isConnected,
        });
      })
      .then(() => {
        this.unsubscribe = NetInfo.addEventListener((state) => {
          const { offline } = this.state;
          const { isConnected } = state;
          if (isConnected && offline) {
            this.setState({
              offline: false,
            });
          }
        });
      });
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe === "function") {
      this.unsubscribe();
    }
  }

  setAdReady = () => {
    this.setState({
      isAdReady: true,
    });
  };

  setAdError = () => {
    this.setState({
      hasError: true,
    });
  };

  render() {
    const {
      baseUrl,
      display,
      isLoading,
      narrowContent,
      screenWidth,
      style,
      slotName,
      orientation,
      width,
    } = this.props;

    const { hasError, isAdReady, offline } = this.state;
    // const [config, data] = memoizeOne(() => {
    //   const slotConfig = getSlotConfig(
    //     slotName,
    //     width || screenWidth,
    //     orientation,
    //   );
    //   return [slotConfig, determineData(slotConfig, this.props)];
    // })();
    const config = getSlotConfig(slotName, width || screenWidth, orientation);
    const data = determineData(config, this.props);

    if (hasError || offline) return null;

    const sizeProps =
      !isAdReady || hasError
        ? { width: 0 }
        : {
            width:
              width ||
              (narrowContent
                ? getNarrowArticleBreakpoint(screenWidth).content
                : screenWidth),
          };

    const isInline = display === "inline";

    return (
      <View style={[styles.container, style, isInline && styles.inlineAd]}>
        {isInline ? (
          <View style={[styles.inlineAdTitle, { width: sizeProps.width }]}>
            <Text style={styles.inlineAdTitleText}>Advertisement</Text>
          </View>
        ) : null}
        {isLoading ? null : (
          <DOMContext
            baseUrl={baseUrl}
            data={data}
            init={adInit}
            onRenderComplete={this.setAdReady}
            onRenderError={this.setAdError}
            isInline={isInline}
            maxHeight={config.maxSizes.height}
            paragraph={this.props.paragraph}
            {...sizeProps}
          />
        )}
      </View>
    );
  }
}

const Ad = (props) => {
  const { windowWidth, orientation } = useResponsiveContext();
  return (
    <AdBase {...props} screenWidth={windowWidth} orientation={orientation} />
  );
};

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export { AdComposer, AdContainer };
export default Ad;
