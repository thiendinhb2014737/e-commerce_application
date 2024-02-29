import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, SearchProduct } from '../screens'

const ExploreNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{

            headerShown: false

        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='SearchProduct' component={SearchProduct} />

        </Stack.Navigator>
    )
}

export default ExploreNavigator