import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../screens'
import OnBroadingScreen from '../screens/auth/OnBroadingScreen'

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='OnBroadingScreen' component={OnBroadingScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator