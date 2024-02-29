
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



const App = () => {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />

          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
        </Provider>
      </QueryClientProvider>
    </>
  )
}

export default App