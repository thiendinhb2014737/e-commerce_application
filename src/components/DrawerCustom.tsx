import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appColors } from '../constants/appColors';
import { Logout, Message2, MessageQuestion, Setting2, Sms, User } from 'iconsax-react-native';
import { authSelector, removeAuth } from '../redux/reducers/authReducer';
import { RowComponent, SpaceComponent, TextComponent } from '.';
import { globalStyles } from '../styles/globalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontFamilies } from '../constants/fontFamilies';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
const DrawerCustom = ({ navigation }: any) => {
    //Lay user
    const user = useSelector(authSelector);
    //console.log(user)
    const dispatch = useDispatch();
    const size = 25;
    const color = appColors.gray;
    const profileMenu = [
        {
            key: 'MyProfile',
            title: 'My Profile',
            icon: <User size={size} color={color} />,
        },
        // {
        //     key: 'Message',
        //     title: 'Message',
        //     icon: <Message2 size={size} color={color} />,
        // },

        {
            key: 'ContactUs',
            title: 'Contact Us',
            icon: <Sms size={size} color={color} />,
        },
        {
            key: 'HelpAndFAQs',
            title: 'Help & FAQs',
            icon: <MessageQuestion size={size} color={color} />,
        },
        {
            key: 'Settings',
            title: 'Settings',
            icon: <Setting2 size={size} color={color} />,
        },

        {
            key: 'SignOut',
            title: 'Sign Out',
            icon: <Logout size={size} color={color} />,
        },
    ];

    const handleSignOut = async () => {
        //   await GoogleSignin.signOut();
        //   await LoginManager.logOut();
        dispatch(removeAuth({}));
        await AsyncStorage.clear();
    };

    return (
        <View style={[localStyles.container]}>
            <TouchableOpacity
                onPress={() => {
                    navigation.closeDrawer();

                    navigation.navigate('Profile', {
                        screen: 'ProfileScreen',
                    });
                }}>
                {user.avatar ? (
                    <Image source={{ uri: user.avatar }} style={[localStyles.avatar]} />
                ) : (
                    <View
                        style={[localStyles.avatar, { backgroundColor: appColors.gray2 }]}>
                        <TextComponent
                            title
                            size={22}
                            color={appColors.white}
                            text={
                                user.email
                                    ? user.email
                                        .split(' ')
                                    [user.email.split(' ').length - 1].substring(0, 1)
                                    : ''
                            }
                        />
                    </View>
                )}
                <TextComponent text={user.email} title size={18} font={fontFamilies.regular} />
            </TouchableOpacity>
            {/* <FlatList
                showsVerticalScrollIndicator={false}
                data={profileMenu}
                style={{ flex: 1, marginVertical: 20 }}
                renderItem={({ item, index }) => (
                    <RowComponent
                        styles={[localStyles.listItem]}
                        onPress={
                            item.key === 'SignOut'
                                ? () => handleSignOut()
                                : () => {
                                    //console.log(item.key);
                                    navigation.closeDrawer();
                                }

                        }>
                        {item.icon}
                        <TextComponent
                            text={item.title}
                            styles={localStyles.listItemText}
                        />
                    </RowComponent>
                )}
            /> */}
            <SpaceComponent height={30} />
            <TouchableOpacity
                onPress={() => {
                    navigation.closeDrawer();

                    navigation.navigate('HomeScreen', {
                        screen: 'HomeScreen',
                    });
                }}>
                <RowComponent styles={[localStyles.listItem]}>
                    <User size={size} color={color} />
                    <TextComponent text={'Trang chủ'} styles={localStyles.listItemText} />
                </RowComponent>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.closeDrawer();

                    navigation.navigate('Profile', {
                        screen: 'ProfileScreen',
                    });
                }}>
                <RowComponent styles={[localStyles.listItem]}>
                    <User size={size} color={color} />
                    <TextComponent text={'Tài khoản của tôi'} styles={localStyles.listItemText} />
                </RowComponent>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.closeDrawer();

                    navigation.navigate('Cart', {
                        screen: 'CartScreen',
                    });
                }}>
                <RowComponent styles={[localStyles.listItem]}>
                    <Zocial name='cart' size={size} color={color} />
                    <TextComponent text={'Giỏ hàng'} styles={localStyles.listItemText} />
                </RowComponent>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.closeDrawer();
                    navigation.navigate('MyLoveScreen')
                }}>
                <RowComponent styles={[localStyles.listItem]}>
                    <AntDesign name='hearto' size={size} color={color} />
                    <TextComponent text={'Yêu thích của tôi'} styles={localStyles.listItemText} />
                </RowComponent>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.closeDrawer();
                    navigation.navigate('Order', {
                        screen: 'OrderScreen',
                    });
                }}>
                <RowComponent styles={[localStyles.listItem]}>
                    <MaterialCommunityIcons name='file-document-outline' size={size} color={color} />
                    <TextComponent text={'Lịch sử mua hàng'} styles={localStyles.listItemText} />
                </RowComponent>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.closeDrawer();
                    navigation.navigate('ContactScreen')
                }}>
                <RowComponent styles={[localStyles.listItem]}>
                    <AntDesign name='contacts' size={size} color={color} />
                    <TextComponent text={'Liên hệ chúng tôi'} styles={localStyles.listItemText} />
                </RowComponent>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.closeDrawer();
                    navigation.navigate('Profile', {
                        screen: 'ProfileScreen',
                    });
                }}>
                <RowComponent styles={[localStyles.listItem]}>
                    <Setting2 size={size} color={color} />
                    <TextComponent text={'Cài đặt'} styles={localStyles.listItemText} />
                </RowComponent>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSignOut()}>
                <RowComponent styles={[localStyles.listItem]}>
                    <Logout size={size} color={color} />
                    <TextComponent text={'Đăng xuất'} styles={localStyles.listItemText} />
                </RowComponent>
            </TouchableOpacity>
            <SpaceComponent height={350} />
            <RowComponent justify="flex-start">
                <TouchableOpacity
                    style={[
                        globalStyles.button,
                        { backgroundColor: '#00F8FF33', height: 'auto' },
                    ]}>
                    <MaterialCommunityIcons name="crown" size={22} color={'#00F8FF'} />
                    <SpaceComponent width={8} />
                    <TextComponent color="#00F8FF" text="Upgrade Pro" />
                </TouchableOpacity>
            </RowComponent>
        </View>
    );
}

export default DrawerCustom

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
    },

    avatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listItem: {
        paddingVertical: 15,
        justifyContent: 'flex-start',
    },

    listItemText: {
        paddingLeft: 12,
    },
});