
import React, { ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ExploreNavigator from './ExploreNavigator'
import CartNavigator from './CartNavigator'
import MapNavigator from './MapNavigator'
import ProfileNavigator from './ProfileNavigator'
import { appColors } from '../constants/appColors'
import { Calendar, Home, Home2, Location, User } from 'iconsax-react-native'
import { TextComponent } from '../components'
import { Platform } from 'react-native'
import Zocial from 'react-native-vector-icons/Zocial';
import DrawerNavigator from './DrawerNavigator'

//42:20
const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                height: Platform.OS === 'ios' ? 88 : 68,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: appColors.white
            },
            tabBarIcon: ({ focused, color, size }) => {
                let icon: ReactNode
                color = focused ? appColors.primary : appColors.gray5
                size = 23

                switch (route.name) {
                    case 'Explore':
                        icon = <Home size={size} color={color} />
                        break;
                    case 'Cart':
                        icon = <Zocial name='cart' size={size} color={color} />;
                        break;
                    case 'Map':
                        icon = <Location size={size} variant="Bold" color={color} />;
                        break;
                    case 'Profile':
                        icon = <User size={size} variant="Bold" color={color} />;
                        break;

                }
                return icon
            },
            tabBarIconStyle: {
                marginTop: 8,
            },
            tabBarLabel({ focused }) {
                return route.name === 'Add' ? null : (
                    <TextComponent
                        text={route.name}
                        flex={0}
                        size={12}
                        color={focused ? appColors.primary : appColors.gray}
                        styles={{
                            marginBottom: Platform.OS === 'android' ? 12 : 0,
                        }}
                    />
                );
            },
        })}>
            <Tab.Screen name='Explore' component={ExploreNavigator} />
            {/* <Tab.Screen name='Map' component={MapNavigator} /> */}
            {/* Phần add 13:49 phan 13 */}
            <Tab.Screen name='Cart' component={CartNavigator} />
            <Tab.Screen name='Profile' component={ProfileNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator