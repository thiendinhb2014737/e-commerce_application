
import React, { useEffect, useState } from 'react'
import { SplashScreen } from './src/screens'
import AuthNavigator from './src/navigators/AuthNavigator'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  const [isShownSplash, setIsShownSplash] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShownSplash(false)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])
  return (
    isShownSplash ? <SplashScreen /> : <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}

export default App