import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GenderProductPage, HomeScreen, OrderDetails, Payment, ProductDetails, SearchProduct, TypeProduct } from '../screens'

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
            <Stack.Screen name='Payment' component={Payment} />
            <Stack.Screen name='OrderDetails' component={OrderDetails} />
            <Stack.Screen name='GenderProductPage' component={GenderProductPage} />

        </Stack.Navigator>
    )
}

export default ExploreNavigator