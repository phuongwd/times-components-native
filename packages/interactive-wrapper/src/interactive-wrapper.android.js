import React, { Component } from "react";
import { Linking, Button, View, Text } from "react-native";
import PropTypes from "prop-types";
import AutoHeightWebView from "react-native-autoheight-webview";
import ResponsiveImageInteractive from "./responsive-image";

const editorialLambdaProtocol = "https://";
const editorialLambdaOrigin = "jotn9sgpg6.execute-api.eu-west-1.amazonaws.com";
const editorialLambdaSlug = "prod/component";

class InteractiveWrapper extends Component {
  static openURLInBrowser(url) {
    return Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          return console.error("Cant open url", url); // eslint-disable-line no-console
        }
        return Linking.openURL(url);
      })
      .catch((err) => console.error("An error occurred", err)); // eslint-disable-line no-console
  }

  constructor(props) {
    super(props);
    this.state = {
      height: 1,
      hasError: false,
      active: false,
    };
    this.handleOnShouldStartLoadWithRequest = this.handleOnShouldStartLoadWithRequest.bind(
      this,
    );
    this.onLoadEnd = this.onLoadEnd.bind(this);
  }

  onLoadEnd() {
    if (this.webview) {
      this.webview.postMessage("thetimes.co.uk", "*");
    }
  }

  handleHttpError = (event) => {
    if (event?.nativeEvent?.statusCode >= 400) {
      this.setState({ hasError: true });
    }
  };

  updateHeight = (passedHeight) => {
    const { height } = this.state;
    if (passedHeight !== height && Math.abs(passedHeight - height) > 5) {
      this.setState({ height: passedHeight });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  handleOnShouldStartLoadWithRequest(data) {
    if (
      !data.url.includes("data:text/html") &&
      data.url.includes("http") &&
      !data.url.includes(editorialLambdaOrigin)
    ) {
      InteractiveWrapper.openURLInBrowser(data.url);
      return false;
    }
    return true;
  }

  render() {
    const {
      config: { dev, environment, platform, version },
      id,
    } = this.props;
    const { height, hasError, active } = this.state;
    const uri = `${editorialLambdaProtocol}${editorialLambdaOrigin}/${editorialLambdaSlug}/${id}?dev=${dev}&env=${environment}&platform=${platform}&version=${version}`;

    if (hasError) return null;

    if (active) {
      return (
        <>
          <Button
            title="toggle"
            onPress={() => this.setState({ active: !active })}
          />
          <AutoHeightWebView
            onSizeUpdated={(size) => this.updateHeight(size.height)}
            scalesPageToFit={false}
            automaticallyAdjustContentInsets={false}
            onLoadEnd={this.onLoadEnd}
            ref={(ref) => {
              this.webview = ref;
            }}
            scrollEnabled={false}
            onShouldStartLoadWithRequest={
              this.handleOnShouldStartLoadWithRequest
            }
            source={{ uri }}
            style={{ height, width: "100%" }}
            onHttpError={this.handleHttpError}
          />
        </>
      );
    }

    return (
      <View style={{ backgroundColor: "pink", height: 200, width: "100%" }}>
        <Text>Interactive wrapper here</Text>
        <Button
          title="toggle interactive"
          onPress={() => this.setState({ active: !active })}
        />
      </View>
    );
  }
}

InteractiveWrapper.propTypes = {
  config: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
};

InteractiveWrapper.defaultProps = {
  config: {},
};

InteractiveWrapper.ResponsiveImageInteractive = ResponsiveImageInteractive;

export default InteractiveWrapper;
