import { View, Text, Platform, StatusBar, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, CircleComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import authenticationAPI from '../../apis/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../../redux/reducers/authReducer'
import { useQuery } from '@tanstack/react-query'
import InputFormConponent from './InputFormComponent/InputFormConponent'
import { fontFamilies } from '../../constants/fontFamilies'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getBase64 } from '../../utils/validate'
import contactAPI from '../../apis/contactApi'
import { globalStyles } from '../../styles/globalStyles'
import { HambergerMenu, Notification } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ContainerComponent from '../home/ContainerComponent/ContainerComponent'

const ContactScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [content, setContent] = useState('')

    const handleContact = async () => {
        const api = `/create-contact`;

        try {
            const res: any = await contactAPI.HandleContact(
                api,
                { email, name, phone, content },
                'post',
            );

            console.log(res);
            if (res.status === 'OK') {
                setEmail('')
                setName('')
                setPhone('')
                setContent('')
                Alert.alert('Liên hệ thành công!');
            }

        } catch (error) {
            console.log(`Liên hệ thất bại, ${error}`);
        }
    };

    return (
        <View style={[globalStyles.container]}>
            <StatusBar barStyle={'light-content'} />
            <View
                style={{
                    backgroundColor: appColors.primary,
                    height: 100 + (Platform.OS === 'ios' ? 16 : 0),
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
                    <SpaceComponent height={24} />


                    <SpaceComponent height={24} />
                </View>
            </View>
            <ContainerComponent isImageBackground isScroll>
                <SpaceComponent height={80} />
                <SectionComponent>
                    <TextComponent text='Họ và tên:' size={15} font={fontFamilies.regular} />
                    <SpaceComponent height={5} />
                    <InputFormConponent
                        value={name}
                        onChange={val => setName(val)}
                    />
                    <TextComponent text='Email:' size={15} font={fontFamilies.regular} />
                    <SpaceComponent height={5} />
                    <InputFormConponent
                        value={email}
                        onChange={val => setEmail(val)}
                    />
                    <TextComponent text='Số điện thoại:' size={15} font={fontFamilies.regular} />
                    <SpaceComponent height={5} />
                    <InputFormConponent
                        value={phone}
                        type='number-pad'
                        onChange={val => setPhone(val)}
                    />
                    <TextComponent text='Nội dung liên hệ:' size={15} font={fontFamilies.regular} />
                    <SpaceComponent height={5} />
                    <InputFormConponent
                        value={content}
                        onChange={val => setContent(val)}
                    />
                </SectionComponent>

                <ButtonComponent text='Liên hệ ngay' type='primary' onPress={handleContact} />
            </ContainerComponent>
        </View>
    )
}

export default ContactScreen