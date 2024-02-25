import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../redux/reducers/authReducer'
import { SplashScreen } from '../screens'

const AppRouter = () => {
    const [isShownSplash, setIsShownSplash] = useState(true)
    const { getItem } = useAsyncStorage('auth');

    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        checkLogin();
        const timeout = setTimeout(() => {
            setIsShownSplash(false)
        }, 1500)
        return () => clearTimeout(timeout)
    }, [])

    const checkLogin = async () => {
        const res = await getItem();

        res && dispatch(addAuth(JSON.parse(res)));
    };

    return (
        <>
            {isShownSplash ? <SplashScreen /> : auth.access_token ? <MainNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppRouter