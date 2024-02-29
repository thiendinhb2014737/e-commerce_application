import { View, Text, Platform, StatusBar, Alert, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, ContainerComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import authenticationAPI from '../../apis/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../../redux/reducers/authReducer'
import { useQuery } from '@tanstack/react-query'
import InputFormConponent from './InputFormComponent/InputFormConponent'
import { fontFamilies } from '../../constants/fontFamilies'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getBase64 } from '../../utils/validate'

const ProfileScreen = () => {
    const user = useSelector(authSelector);

    const id = user.id
    const token = user.access_token

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')



    const getDetailsUser = async () => {
        const api = `/get-details/${id}`;
        const res = await authenticationAPI.HandleAuthentication(api, 'get')
        return res.data
    }
    const queryUser = useQuery({
        queryKey: ['getDetailsUser'],
        queryFn: getDetailsUser
    })
    const { data: detailsUser } = queryUser

    const userDetails: any = detailsUser

    // console.log(id)
    // console.log(detailsUser)


    useEffect(() => {
        setEmail(userDetails?.email)
        setName(userDetails?.name)
        setPhone(userDetails?.phone)
        setAddress(userDetails?.address)
        setAvatar(userDetails?.avatar)
    }, [userDetails])

    const handleUpdateUse = async () => {
        const api = `/update-user/${id}`;

        try {
            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                { email, name, phone, address },
                'put',
            );

            console.log(res);

            Alert.alert('Cập nhật thành công!');
        } catch (error) {
            console.log(`Cập nhật thất bai, ${error}`);
        }
    };
    // console.log(email)
    // console.log(name)
    // console.log(typeof (phone))
    // console.log(address)
    // console.log(avatar)

    const handleOnChangeAvatar = async ({ fileList }: any) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }


    return (
        <ContainerComponent isImageBackground isScroll>
            <SpaceComponent height={30} />
            <SectionComponent>
                <SectionComponent styles={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextComponent text='Ảnh đại diện:' size={15} font={fontFamilies.regular} />
                    <SpaceComponent height={5} />
                    {avatar ? (
                        <Image source={{ uri: avatar }} style={[localStyles.avatar]} />
                    ) : (
                        <View
                            style={[localStyles.avatar, { backgroundColor: appColors.gray2 }]}>
                            <TextComponent
                                title
                                size={22}
                                color={appColors.white}
                                text={
                                    email
                                        ? email
                                            .split(' ')
                                        [email.split(' ').length - 1].substring(0, 1)
                                        : ''
                                }
                            />
                        </View>
                    )}
                    <View  >
                        <ButtonComponent
                            text='Chọn file'
                            textFont={fontFamilies.regular}
                            textColor={appColors.link}
                            type='primary'
                            iconFlex='right'
                            styles={{ width: 150, backgroundColor: appColors.white }}
                            icon={
                                <SimpleLineIcons name='cloud-upload' size={18} color={appColors.link} style={{ paddingLeft: 5, paddingRight: 13 }} />
                            }
                        // onPress={handleOnChangeAvatar}
                        />
                    </View>
                </SectionComponent>
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
                    value={String(phone)}
                    type='number-pad'
                    onChange={val => setPhone(val)}
                />
                <TextComponent text='Địa chỉ:' size={15} font={fontFamilies.regular} />
                <SpaceComponent height={5} />
                <InputFormConponent
                    value={address}
                    onChange={val => setAddress(val)}

                />
            </SectionComponent>

            <ButtonComponent text='Cập nhật' type='primary' onPress={handleUpdateUse} />
        </ContainerComponent>
    )
}

export default ProfileScreen
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