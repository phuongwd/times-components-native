import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
  memo,
  useRef,
  useContext,
} from "react";
import { Keyboard, TextInput, View } from "react-native";
import { colours } from "@times-components-native/styleguide";
import CancelButton from "./cancel-button";
import XButton from "./x-button";
import Magnifier from "./magnifier";
import debounce from "lodash.debounce";
import { isIOS } from "@times-components-native/utils/src/platformUtils";
import { styles } from "./styles/search-bar-styles";
import { SearchBoxProvided } from "react-instantsearch-core";
import { ResponsiveContext } from "@times-components-native/responsive";
import { SearchContext } from "../SearchContext";

const DEBOUNCE_WAIT = 300;

type SearchBarComponentProps = PropsWithChildren<SearchBoxProvided> & {
  isConnected: boolean | null;
  shouldFocus?: boolean;
};

export const SearchBarComponent: FC<SearchBarComponentProps> = memo(
  ({ currentRefinement, refine, isConnected, shouldFocus = false }) => {
    const { setSearchTerm } = useContext(SearchContext);
    const [text, setText] = useState(currentRefinement);
    const [hasFocus, setHasFocus] = useState(shouldFocus);
    const field = useRef<TextInput>(null);

    useEffect(() => {
      if (setSearchTerm) setSearchTerm(text);
    }, [text]);

    const debouncedRefine = useCallback(
      debounce((nextValue) => refine(nextValue), DEBOUNCE_WAIT),
      [],
    );

    const handleSetText = (val: string) => {
      setText(val);
      debouncedRefine(val);
    };

    const handleResetSearch = () => {
      handleSetText("");
    };

    const handleCancelSearch = () => {
      handleSetText("");
      Keyboard.dismiss();
    };

    const handleOnBlur = () => {
      setHasFocus(false);
    };

    const handleOnFocus = () => {
      setHasFocus(true);
    };

    return (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <View
            style={[
              styles.container,
              {
                paddingHorizontal: isTablet ? 0 : 8,
              },
            ]}
          >
            <View style={styles.subContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.magnifierTextWrapper}>
                  {isIOS ? (
                    <Magnifier
                      style={styles.iconStyle}
                      color={
                        !isConnected
                          ? colours.functional.offlineSearchText
                          : undefined
                      }
                      testID="search-icon"
                    />
                  ) : (
                    !!text && null
                  )}
                  <TextInput
                    ref={field}
                    placeholder="Search"
                    style={styles.input}
                    defaultValue={currentRefinement}
                    onChangeText={handleSetText}
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}
                    keyboardType="web-search"
                    placeholderTextColor={
                      isConnected
                        ? colours.functional.searchText
                        : colours.functional.offlineSearchText
                    }
                    value={text}
                    autoFocus
                    editable={isConnected ? isConnected : false}
                    testID="search-input"
                  />
                </View>
                {text && isIOS ? <XButton onPress={handleResetSearch} /> : null}
                {!isIOS && (
                  <CancelButton
                    onPress={isIOS ? handleCancelSearch : handleResetSearch}
                    isConnected={isConnected}
                    testID="search-cross-button"
                  />
                )}
              </View>
              {isIOS && hasFocus && (
                <CancelButton
                  onPress={isIOS ? handleCancelSearch : handleResetSearch}
                  isConnected={isConnected}
                  testID="search-cancel-button"
                />
              )}
            </View>
          </View>
        )}
      </ResponsiveContext.Consumer>
    );
  },
);
