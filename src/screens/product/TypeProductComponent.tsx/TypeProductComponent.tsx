import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextComponent } from '../../../components'

const TypeProductComponent = ({ name, navigation }: any) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('TypeProduct', {
                    state: name,
                })
            }}
        >

            <TextComponent text={name} title size={14} />
        </TouchableOpacity>
    )
}

export default TypeProductComponent