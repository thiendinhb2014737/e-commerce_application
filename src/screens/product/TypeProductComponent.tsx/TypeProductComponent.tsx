import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { TextComponent } from '../../../components'
import { fontFamilies } from '../../../constants/fontFamilies'

const TypeProductComponent = ({ name, navigation }: any) => {
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

export default TypeProductComponent