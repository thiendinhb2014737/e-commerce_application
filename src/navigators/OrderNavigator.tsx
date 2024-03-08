
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { OrderScreen } from '../screens'


const OrderNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{

            headerShown: false

        }}>
            <Stack.Screen name='OrderScreen' component={OrderScreen} />

        </Stack.Navigator>
    )
}

export default OrderNavigator