import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, ProductDetails, SearchProduct, TypeProduct } from '../screens'

const ExploreNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{

            headerShown: false

        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='SearchProduct' component={SearchProduct} />
            <Stack.Screen name='TypeProduct' component={TypeProduct} />
            <Stack.Screen name='ProductDetails' component={ProductDetails} />

        </Stack.Navigator>
    )
}

export default ExploreNavigator