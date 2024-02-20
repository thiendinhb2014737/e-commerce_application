
import React, { useEffect, useState } from 'react'
import { SplashScreen } from './src/screens'
import AuthNavigator from './src/navigators/AuthNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import MainNavigator from './src/navigators/MainNavigator'

const App = () => {
  const [isShownSplash, setIsShownSplash] = useState(true)
  const [accessToken, setAccessToken] = useState('')
  const { getItem, setItem } = useAsyncStorage('access_token')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShownSplash(false)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    checkLogin()
  }, [])


  const checkLogin = async () => {
    const token = await getItem()
    token && setAccessToken(token)
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      {
        isShownSplash ? (<SplashScreen />) : (
          <NavigationContainer>
            {accessToken ? <MainNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        )
      }
    </>
  )
}

export default App