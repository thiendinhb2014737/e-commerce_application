import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../redux/reducers/authReducer'

const AppRouter = () => {

    const { getItem } = useAsyncStorage('auth');
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    console.log(auth)

    useEffect(() => {
        checkLogin();
        // const timeout = setTimeout(() => {
        //   setIsShowSplash(false);
        // }, 1500);

        // return () => clearTimeout(timeout);
    }, []);

    const checkLogin = async () => {
        const res = await getItem();

        res && dispatch(addAuth(JSON.parse(res)));
    };

    return (
        <>
            {auth.access_token ? <MainNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppRouter