import mockDate from "mockdate";
import { iterator } from "@times-components-native/test-utils";
import getActiveArticleFlags from "../src/getActiveArticleFlags";

export default () => {
  //  GMT: Thursday, 14 March 2019 16:22:54
  beforeEach(() => {
    mockDate.set(1552580574000, 0);
  });

  afterEach(() => {
    mockDate.reset();
  });

  const tests = [
    {
      name: "returns only active flags",
      test: () => {
        const flags = [
          { expiryTime: "2020-03-13T12:00:00.000Z", type: "UPDATED" },
          { expiryTime: "2019-03-14T12:00:00.000Z", type: "EXCLUSIVE" },
        ];

        expect(getActiveArticleFlags(flags)).toEqual([flags[0]]);
      },
    },
    {
      name: "returns no flags when all have expired",
      test: () => {
        const flags = [
          { expiryTime: "2019-03-14T16:22:54.000Z", type: "UPDATED" },
          { expiryTime: "2019-03-14T12:00:00.000Z", type: "EXCLUSIVE" },
        ];

        expect(getActiveArticleFlags(flags)).toEqual([]);
      },
    },
    {
      name: "returns flags when expiry time is null",
      test: () => {
        const flags = [
          { expiryTime: null, type: "UPDATED" },
          { expiryTime: null, type: "EXCLUSIVE" },
        ];

        expect(getActiveArticleFlags(flags)).toEqual(flags);
      },
    },
    {
      name: "returns no flags when no flags are provided",
      test: () => {
        expect(getActiveArticleFlags([])).toEqual([]);
      },
    },
  ];

  iterator(tests);
};
