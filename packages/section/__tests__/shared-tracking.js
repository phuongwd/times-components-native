import React, { Component } from "react";
import PropTypes from "prop-types";

import "./mocks";
import { MockEdition } from "@times-components-native/fixture-generator";
import Link from "@times-components-native/link";
import { SectionContext } from "@times-components-native/context";
import StarButton from "@times-components-native/star-button";
import TestRenderer from "react-test-renderer";
import Section from "../src/section";

jest.mock("@times-components-native/icons", () => ({
  IconForwardArrow: "IconForwardArrow",
  IconStar: "IconStar",
  IconVideo: "IconVideo",
}));

jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");
  rn.NativeModules.SectionEvents = {
    getSavedArticles: jest.fn().mockReturnValue(Promise.resolve(true)),
  };
  return rn;
});

import { ResponsiveContext } from "@times-components-native/responsive";
import { calculateResponsiveContext } from "@times-components-native/responsive/src/calculateResponsiveContext";

jest.mock("@times-components-native/image", () => ({
  __esModule: true,
  default: "TimesImage",
}));

class WithTrackingContext extends Component {
  getChildContext() {
    const { stream } = this.props;
    return {
      tracking: {
        analytics: stream,
      },
    };
  }

  render() {
    const { onArticlePress, onPuzzlePress, section } = this.props;
    return (
      <ResponsiveContext.Provider
        value={calculateResponsiveContext(400, 600, 1)}
      >
        <Section
          analyticsStream={() => null}
          onArticlePress={onArticlePress}
          onPuzzlePress={onPuzzlePress}
          publicationName="TIMES"
          section={section}
        />
      </ResponsiveContext.Provider>
    );
  }
}

WithTrackingContext.childContextTypes = {
  tracking: PropTypes.shape({
    analytics: PropTypes.func,
  }),
};

WithTrackingContext.propTypes = {
  onArticlePress: PropTypes.func.isRequired,
  onPuzzlePress: PropTypes.func.isRequired,
  section: PropTypes.shape({}).isRequired,
  stream: PropTypes.func.isRequired,
};

export default () => {
  it("default section page click tracking", () => {
    const edition = new MockEdition().get();

    const stream = jest.fn();
    const onArticlePress = jest.fn();

    const testInstance = TestRenderer.create(
      <WithTrackingContext
        onArticlePress={onArticlePress}
        onPuzzlePress={() => null}
        section={edition.sections[0]}
        stream={stream}
      />,
    );
    const [link] = testInstance.root.findAllByType(Link);

    link.props.onPress();

    const [[call]] = stream.mock.calls;

    expect(call).toMatchSnapshot();
    expect(onArticlePress.mock.calls).toMatchSnapshot("onArticlePress");
  });

  it("puzzle section page click tracking", () => {
    const edition = new MockEdition().get();

    const stream = jest.fn();
    const onPuzzlePress = jest.fn();

    const testInstance = TestRenderer.create(
      <WithTrackingContext
        onArticlePress={() => null}
        onPuzzlePress={onPuzzlePress}
        section={edition.sections[3]}
        stream={stream}
      />,
    );

    const [link] = testInstance.root.findAllByType(Link);

    link.props.onPress();

    const [[call]] = stream.mock.calls;

    expect(call).toMatchSnapshot();
    expect(onPuzzlePress.mock.calls).toMatchSnapshot("onPuzzlePress");
  });
};

// this test only applies for android as ios tiles have save buttons
export const saveClickTracking = () => {
  it("Save/Unsave article click tracking", () => {
    const edition = new MockEdition().get();
    const stream = jest.fn();
    const onArticlePress = jest.fn();
    const artickleId = edition.sections[0].slices[0].lead.article.id;
    const savedArticles = { artickleId: undefined };
    const onArticleSavePress = () => {
      savedArticles[artickleId] = !savedArticles[artickleId];
    };

    const testInstance = TestRenderer.create(
      <SectionContext.Provider value={{ onArticleSavePress, savedArticles }}>
        <WithTrackingContext
          onArticlePress={onArticlePress}
          onPuzzlePress={() => null}
          section={edition.sections[0]}
          stream={stream}
        />
      </SectionContext.Provider>,
    );

    const [starButton] = testInstance.root.findAllByType(StarButton);
    starButton.props.onPress();
    starButton.props.onPress();

    const call = stream.mock.calls;
    expect(call).toMatchSnapshot();
  });
};
