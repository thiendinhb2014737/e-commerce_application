import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ForgotPassword, LoginScreen, SignUpScreen, Verification } from '../screens'
import OnBroadingScreen from '../screens/auth/OnBroadingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()

    // const [isExistingUser, setIsExistingUser] = useState(false)
    // useEffect(() => {
    //     checkUserExisting()
    // }, [])

    // const checkUserExisting = async () => {
    //     const res = await AsyncStorage.getItem('auth')

    //     res && setIsExistingUser(true)

    // }
    // console.log(isExistingUser)

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {/* {
                !isExistingUser && ( */}
            <Stack.Screen name='OnBroadingScreen' component={OnBroadingScreen} />
            {/* )
            } */}

            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            <Stack.Screen name='Verification' component={Verification} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </Stack.Navigator>
    )
}

export default AuthNavigator