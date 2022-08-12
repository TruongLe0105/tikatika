import { CheckSvg } from '@/assets/svg/CheckSvg';
import { isEqual } from 'lodash';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal";
import { EButton } from '../Button/EButton';
import { RowView } from '../View/RowView';
import HsvColorPicker from 'react-native-hsv-color-picker';
import chroma from 'chroma-js';

const arrColor = ['#fbbab5', '#f48aae', '#c95ddb', '#a385d8', '#8b97d7', '#97cef9', '#69cffd', '#34e8ff', '#00dac5', '#99d39b', '#c5e1a5', '#e8efa3', '#fff9c8', '#ffde7d', '#ffc673', '#ffbaa4', '#a97e6f', '#e5e5e5', '#9bb0ba',
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b',
  '#710d06', '#600927', '#3e1046', '#291749', '#192048', '#063d69', '#014462', '#004b55', '#003c36', '#1e4620', '#38511b', '#575e11', '#7e7100', '#694f00', '#663d00', '#741c00', '#30221d', '#3f3f3f', '#263238']

interface Props {

}

export const EColorPicker = React.memo(React.forwardRef(({ }: Props, ref) => {
  const [visible, setVisible] = useState(false)
  const [colorSelected, setColorSelected] = useState('')
  const selectedCallback = useRef(null)
  const colorPickerRef = useRef(null)

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose
  }));

  const handleOpen = useCallback((color, cb?) => {
    setColorSelected(color)
    setVisible(true)

    cb && (selectedCallback.current = cb)
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [])

  const handleAccept = useCallback(() => {
    setVisible(false)
    const color = colorPickerRef.current.getCurrentColor()
    selectedCallback.current(color)
  }, [colorSelected])

  return (
    <Modal
      isVisible={visible}
      backdropColor="#0C1B25"
      backdropOpacity={0.8}
      useNativeDriver
      style={{ paddingHorizontal: 20 }}
    >
      <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <FlatList
            data={arrColor}
            renderItem={({ item, index }) => <ColorItem data={item} onPress={setColorSelected} selected={colorSelected == item} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={Math.ceil(arrColor.length / 3)}
            key={Math.ceil(arrColor.length / 3)}
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={false}
          />
        </ScrollView>

        <View style={{ height: 0, overflow: 'hidden' }}>

          <ColorPanel colorSelected={colorSelected} colorPickerRef={colorPickerRef} />
        </View>

        <RowView style={{ marginTop: 10 }}>
          <EButton text="Đóng" onPress={handleClose} border style={{ flex: 1, marginRight: 10 }} />
          <EButton text="Chọn" onPress={handleAccept} style={{ flex: 1, marginLeft: 10 }} />
        </RowView>
      </View>

    </Modal>
  )
}), (prev, next) => isEqual(prev, next))

const ColorItem = React.memo(({ data, onPress, selected }: any) => {
  return (
    <TouchableOpacity activeOpacity={.4} onPress={() => onPress(data)} style={{ backgroundColor: data, height: 40, aspectRatio: 1, borderRadius: 50, margin: 4 }}>
      {selected && <CheckSvg size={40} color={'transparent'} />}
    </TouchableOpacity>
  )
}, (prev, next) => isEqual(prev.selected, next.selected))

const ColorPanel = React.memo(({ colorSelected, colorPickerRef }: any) => {
  const [hsv, setHsv] = useState({
    hue: 0,
    sat: 0,
    val: 1,
  })

  useEffect(() => {
    const hsv = chroma(colorSelected).hsv()
    setHsv({
      hue: hsv[0] || 0,
      sat: hsv[1],
      val: hsv[2]
    })
  }, [colorSelected])

  const onSatValPickerChange = ({ saturation, value }) => {
    setHsv(state => {
      state.sat = saturation
      state.val = value
      return { ...state }
    })
  }

  const onHuePickerChange = ({ hue }) => {
    setHsv(state => {
      state.hue = hue
      return { ...state }
    })
  }

  return (
    <HsvColorPicker
      ref={colorPickerRef}
      huePickerHue={hsv.hue}
      onHuePickerDragMove={onHuePickerChange}
      onHuePickerPress={onHuePickerChange}
      satValPickerHue={hsv.hue}
      satValPickerSaturation={hsv.sat}
      satValPickerValue={hsv.val}
      onSatValPickerDragMove={onSatValPickerChange}
      onSatValPickerPress={onSatValPickerChange}
    />
  )
}, (prev, next) => isEqual(prev, next))