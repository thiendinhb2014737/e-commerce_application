import React from 'react'
import { TextComponent } from '.'
import { ScrollView, TouchableOpacity } from 'react-native'
import { fontFamilies } from '../constants/fontFamilies'



const TypeProduct = ({ name, navigation }: any) => {
    return (
        <ScrollView>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('TypeProduct', {
                        state: name,
                    })
                }}
            >

                <TextComponent text={name.toUpperCase()} title size={13} font={fontFamilies.regular} />
            </TouchableOpacity>
        </ScrollView>
    )
}

export default TypeProduct