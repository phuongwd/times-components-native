import React from "react";
import { DeviceEventEmitter, NativeModules } from "react-native";
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components-native/test-utils";
import "./mocks";
import Section from "../src/section";

jest.mock("@times-components-native/section", () => "Section");

export default () => {
  it("section data gets updated through the bridge on updateSectionData event", async () => {
    const {
      SectionEvents: { getSectionData },
    } = NativeModules;

    const initialSectionData = { name: "InitialSection" };
    const updatedSectionData = { name: "UpdatedSection" };
    const pmd = [{ id: "321", isAvailableOffline: true }];

    getSectionData.mockReturnValue(
      Promise.resolve(JSON.stringify(updatedSectionData)),
    );

    const testInstance = TestRenderer.create(
      <Section
        section={JSON.stringify(initialSectionData)}
        puzzlesMetaData={JSON.stringify(pmd)}
      />,
    );

    const sectionInstance = testInstance.root.findByType("Section");

    // Initial Data
    expect(sectionInstance.props.section).toEqual(initialSectionData);

    // Updated Data
    DeviceEventEmitter.emit("updateSectionData");
    await delay(0);
    expect(sectionInstance.props.section).toEqual(updatedSectionData);
  });
};
