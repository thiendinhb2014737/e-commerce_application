import { View, Text, Button, StatusBar, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { authReducer, authSelector, removeAuth } from '../../redux/reducers/authReducer'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { CircleComponent, RowComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification } from 'iconsax-react-native'
import { fontFamilies } from '../../constants/fontFamilies'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const HomeScreen = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const auth = useSelector(authSelector)

    return (
        <View style={[globalStyles.container]}>
            <StatusBar barStyle={'light-content'} />
            <View
                style={{
                    backgroundColor: appColors.primary,
                    height: 178 + (Platform.OS === 'ios' ? 16 : 0),
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
                }}>
                <View style={{ paddingHorizontal: 16 }}>
                    <RowComponent>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <HambergerMenu size={24} color={appColors.white} />
                        </TouchableOpacity>
                        <View style={[{ flex: 1, alignItems: 'center' }]}>
                            <RowComponent>
                                <TextComponent
                                    text=""
                                    color={appColors.white}
                                    size={12}
                                />
                                <MaterialIcons
                                    name="arrow-drop-down"
                                    size={18}
                                    color={appColors.white}
                                />
                            </RowComponent>
                            <TextComponent
                                text=""
                                flex={0}
                                color={appColors.white}
                                font={fontFamilies.medium}
                                size={13}
                            />
                        </View>
                        <CircleComponent color="#524CE0" size={36}>
                            <View>
                                <Notification size={18} color={appColors.white} />
                                <View
                                    style={{
                                        backgroundColor: '#02E9FE',
                                        width: 10,
                                        height: 10,
                                        borderRadius: 4,
                                        borderWidth: 2,
                                        borderColor: '#524CE0',
                                        position: 'absolute',
                                        top: -2,
                                        right: -2,
                                    }}
                                />
                            </View>
                        </CircleComponent>

                    </RowComponent>
                </View>
            </View>
            <View
                style={[
                    {
                        flex: 1
                    }
                ]}
            >

            </View>
        </View>
    )
}

export default HomeScreen