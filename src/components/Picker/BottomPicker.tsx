import * as React from "react";
import { View, ActivityIndicator, StyleSheet, Platform } from "react-native";
import Typography from "../Text/Typography";
import { PADDING_BOTTOM, SCREEN_HEIGHT } from "@/styles/dimensions";
import ActionSheet from "react-native-actions-sheet";
import { isEmpty, isEqual } from "lodash";
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { colors } from "@/styles/theme";
import { EInput } from "../Input/EInput";
import { SearchSvg } from "@/assets/svg/SearchSvg";
import { FlatList } from "react-native-gesture-handler";
import { DropDownItem } from "../BottomSheet/DropDownItem";
import { removeAccents } from "@/utils/helper";
import { KeyboardSpacer } from "../Keyboard/KeyboardSpacer";

interface Props {
  onSelect: (data) => void;
  items: any[];
  title: string;
  pickerSearchPlaceholder: string;
  loading?: boolean;
}

export const BottomPicker = React.memo(
  React.forwardRef(
    (
      { onSelect, items, title, pickerSearchPlaceholder, loading }: Props,
      ref
    ) => {
      const actionRef = useRef<any>();
      const [search, setSearch] = useState("");
      const [selected, setSelected] = useState(null);

      const arrSearch = useMemo(() => {
        if (isEmpty(search)) {
          return items
        }
        return items.filter(e => removeAccents(e.label.toLowerCase()).includes(removeAccents(search.toLowerCase())))
      }, [search, items])

      useImperativeHandle(
        ref,
        () => ({
          handleOpen,
        }),
        []
      );

      const handleOpen = useCallback((data) => {
        setSelected(data);
        actionRef.current.show();
      }, []);

      const handleClose = useCallback(() => {
        actionRef.current.hide();
      }, []);

      const onHasReachedTop = (hasReachedTop) => {
        if (hasReachedTop)
          actionRef.current?.setNativeProps({
            scrollEnabled: hasReachedTop,
          });
      };

      const handlePress = useCallback((item) => {
        onSelect(item);
        handleClose();
      }, []);

      const renderItem = useCallback(
        ({ item }) => {
          return (
            <DropDownItem
              isSelected={isEqual(item.value, selected)}
              data={item}
              label={item.label}
              onPress={handlePress}
            />
          );
        },
        [selected]
      );

      const renderIconSearch = React.useMemo(
        () => (
          <View style={{ alignSelf: "center" }}>
            <SearchSvg color={colors.primary} />
          </View>
        ),
        []
      );

      return (
        <ActionSheet
          gestureEnabled
          ref={actionRef}
          onClose={handleClose}
          onPositionChanged={onHasReachedTop}
          indicatorColor={colors.secondaryText}
          containerStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
          topSpacing={200}
        >
          <View
            style={{
              backgroundColor: "#fff",
              paddingTop: 32,
              paddingBottom: PADDING_BOTTOM,
              paddingHorizontal: 16,
              maxHeight: 400,
            }}
          >
            <Typography
              preset="largeTitle"
              align="center"
              colorPreset="primaryText"
            >
              {title}
            </Typography>
            <EInput
              onChangeText={setSearch}
              value={search}
              staticLabel
              style={styles.inputStyle}
              placeholder={pickerSearchPlaceholder}
              containerStyle={styles.mt16}
              componentRight={renderIconSearch}
            />
            {loading && (
              <View style={{ marginTop: 20 }}>
                <ActivityIndicator size={30} color={colors.primary} />
              </View>
            )}

            <FlatList
              data={arrSearch}
              keyExtractor={(item, index) => index.toString()}
              nestedScrollEnabled
              onScrollEndDrag={() => actionRef.current?.handleChildScrollEnd()}
              onScrollAnimationEnd={() =>
                actionRef.current?.handleChildScrollEnd()
              }
              onMomentumScrollEnd={() =>
                actionRef.current?.handleChildScrollEnd()
              }
              contentContainerStyle={{
                justifyContent: "center",
              }}
              renderItem={renderItem}
              ItemSeparatorComponent={() => (
                <View
                  style={{ height: 1, backgroundColor: colors.background }}
                />
              )}
              style={{ marginTop: 16, height: SCREEN_HEIGHT / 3 }}
            />
          </View>
        </ActionSheet>
      );
    }
  ),
  (prev, next) => isEqual(prev, next)
);

const styles = StyleSheet.create({
  inputStyle: {
    top: 0,
  },
  mt16: {
    marginTop: 16,
  },
});
