import { View, Text } from 'react-native'
import React from 'react'

const SearchProduct = ({ navigation, route }: any) => {
    const { isFilter }: { isFilter: boolean } = route.params
    console.log(isFilter)
    return (
        <View>
            <Text>SearchProducts</Text>
        </View>
    );
}

export default SearchProduct