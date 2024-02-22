import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'


interface Props {
    justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined,
    styles?: StyleProp<ViewStyle>,
    children: ReactNode,
    onPress?: () => void
}

const RowComponent = (props: Props) => {
    const { justify, styles, children, onPress } = props
    const localStyles = [globalStyles.row, {
        justifyContent: justify
    }, styles]
    return onPress ? (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={localStyles}>
            {children}
        </TouchableOpacity>
    ) : (
        <View style={localStyles}>
            {children}
        </View>
    )
}

export default RowComponent