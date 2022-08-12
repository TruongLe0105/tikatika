import { colors } from '@/styles/theme'
import { isEqual } from 'lodash'
import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  height?: number
  backgroundColor?: string
}

export const EDivider = React.memo(({ height = 1, backgroundColor = colors.secondaryText }: Props) => {
  return (
    <View style={{ height, width: '100%', backgroundColor }} />
  )
}, (prev, next) => isEqual(prev, next))
