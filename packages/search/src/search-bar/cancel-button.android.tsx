import React, { FC } from "react";
import IconClose from "@times-components-native/icons/src/icons/close";
import { TouchableOpacity } from "react-native";
import { CancelButtonProps } from "./cancel-button";
import { colours } from "@times-components-native/styleguide";

const ICON_SIZE = 24;

const CancelButton: FC<CancelButtonProps> = ({
  onPress,
  isConnected,
  testIDProp,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={!isConnected}
    testID={testIDProp}
  >
    <IconClose
      fillColour={
        isConnected
          ? colours.functional.black
          : colours.functional.offlineSearchText
      }
      height={ICON_SIZE}
      width={ICON_SIZE}
    />
  </TouchableOpacity>
);

export default CancelButton;
