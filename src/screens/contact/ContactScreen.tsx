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
import contactAPI from '../../apis/contactApi'

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
    )
}

export default ContactScreen