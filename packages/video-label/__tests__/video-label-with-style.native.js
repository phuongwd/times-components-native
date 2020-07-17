import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print,
} from "@times-components-native/jest-serializer";
import { iterator } from "@times-components-native/test-utils";
import VideoLabel from "../src/video-label";

jest.mock("@times-components-native/icons", () => ({ IconVideo: "IconVideo" }));

export default () => {
  addSerializers(
    expect,
    compose(print, minimalNativeTransform, flattenStyleTransform),
  );

  const tests = [
    {
      name: "video label with a title",
      test: () => {
        const testInstance = TestRenderer.create(
          <VideoLabel color="#008347" title="swimming" />,
        );

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "video label without a title shows VIDEO",
      test: () => {
        const testInstance = TestRenderer.create(
          <VideoLabel color="#008347" />,
        );

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "video label with the black default colour",
      test: () => {
        const testInstance = TestRenderer.create(<VideoLabel />);

        expect(testInstance).toMatchSnapshot();
      },
    },
  ];

  iterator(tests);
};
