
import React, { useEffect, useState } from 'react'
import { SplashScreen } from './src/screens'
import AuthNavigator from './src/navigators/AuthNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import MainNavigator from './src/navigators/MainNavigator'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import AppRouter from './src/navigators/AppRouter'

const App = () => {
  const [isShownSplash, setIsShownSplash] = useState(true)


  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShownSplash(false)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])



  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />


        {
          isShownSplash ? (<SplashScreen />) : (
            <NavigationContainer>
              <AppRouter />
            </NavigationContainer>
          )
        }
      </Provider>
    </>
  )
}

export default App