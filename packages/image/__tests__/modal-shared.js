import React from "react";
import { Modal } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import Link from "@times-components-native/link";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print,
  replacePropTransform,
} from "@times-components-native/jest-serializer";
import { hash, iterator } from "@times-components-native/test-utils";
import Image, { ModalImage } from "../src";

jest.useFakeTimers();

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key === "nativeBackgroundAndroid",
      ),
      replacePropTransform((value, key) =>
        key === "d" && typeof d === "string" ? hash(value) : value,
      ),
    ),
  );

  const props = {
    aspectRatio: 2,
    caption: {
      text: "Caption",
      credits: "Credits",
    },
    uri: "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0",
    relativeHeight: 1,
    relativeHorizontalOffset: 1,
    relativeVerticalOffset: 1,
    relativeWidth: 1,
  };

  const tests = [
    {
      name: "modal image",
      async test() {
        const testInstance = TestRenderer.create(<ModalImage {...props} />);

        await act(async () => {
          jest.runAllImmediates();
        });

        testInstance.root.findAllByType(Image).forEach((img) =>
          img.children[0].props.onLayout({
            nativeEvent: { layout: { height: 350, width: 700 } },
          }),
        );

        await act(async () => {
          jest.runAllImmediates();
        });

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "modal image with no caption",
      async test() {
        const testInstance = TestRenderer.create(
          <ModalImage {...props} caption={null} />,
        );

        await act(async () => {
          jest.runAllImmediates();
        });

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "modal image with custom highResSize",
      async test() {
        const testInstance = TestRenderer.create(
          <ModalImage {...props} highResSize={900} />,
        );

        await act(async () => {
          jest.runAllImmediates();
        });

        testInstance.root.findAllByType(Image).forEach((img) =>
          img.children[0].props.onLayout({
            nativeEvent: { layout: { height: 350, width: 700 } },
          }),
        );

        await act(async () => {
          jest.runAllImmediates();
        });

        expect(testInstance).toMatchSnapshot();
      },
    },
    {
      name: "handle onPress event on the link",
      test: async () => {
        const testInstance = TestRenderer.create(<ModalImage {...props} />);

        await act(async () => {
          jest.runAllImmediates();
        });

        const [openButton] = testInstance.root.findAll(
          (node) => node.type === Link,
        );

        openButton.props.onPress();

        await act(async () => {
          jest.runAllImmediates();
        });

        const modal = testInstance.root.find((node) => node.type === Modal);

        expect(modal.props.visible).toBe(true);
      },
    },
    {
      name: "handle onPress event on the close button",
      test: async () => {
        const testInstance = TestRenderer.create(
          <ModalImage {...props} show />,
        );

        await act(async () => {
          jest.runAllImmediates();
        });

        const [closeButton] = testInstance.root.findAll(
          (node) => node.type === Link,
        );

        closeButton.props.onPress();

        await act(async () => {
          jest.runAllImmediates();
        });

        const modal = testInstance.root.find((node) => node.type === Modal);

        expect(modal.props.visible).toBe(false);
      },
    },
    {
      name: "image with onImagePress prop should not have Modal",
      test: async () => {
        const onImagePress = () => null;
        const propWithImagePress = { ...props, onImagePress };
        const testInstance = TestRenderer.create(
          <ModalImage {...propWithImagePress} />,
        );

        await act(async () => {
          jest.runAllImmediates();
        });

        expect(testInstance.root.findAllByType(Modal).length).toBe(0);
      },
    },
  ];

  iterator(tests);
};
