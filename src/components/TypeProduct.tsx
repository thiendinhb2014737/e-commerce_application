import React from 'react'
import { TextComponent } from '.'
import { TouchableOpacity } from 'react-native'
import { fontFamilies } from '../constants/fontFamilies'



const TypeProduct = ({ name, navigation }: any) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('TypeProduct', {
                    state: name,
                })
            }}
        >

            <TextComponent text={name} title size={15} font={fontFamilies.regular} />
        </TouchableOpacity>
    )
}

export default TypeProduct