import { View, Text, Button, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms, User } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import SocialLogin from './components/SocialLogin'

const initValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpScreen = ({ navigation }: any) => {

    const [values, setValues] = useState(initValue)

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values }

        data[`${key}`] = value
        setValues(data)
    }

    return (
        <ContainerComponent isImageBackground isScroll back>

            <SectionComponent>
                <TextComponent size={24} title text="Đăng ký" />
                <SpaceComponent height={21} />
                <InputComponent
                    value={values.username}
                    placeholder="Full name"
                    onChange={val => handleChangeValue('usename', val)}
                    allowClear
                    affix={<User size={22} color={appColors.gray} />}
                />
                <InputComponent
                    value={values.email}
                    placeholder="abc@gmail.com"
                    onChange={val => handleChangeValue('email', val)}
                    allowClear
                    affix={<Sms size={22} color={appColors.gray} />}
                />
                <InputComponent
                    value={values.password}
                    placeholder="Password"
                    onChange={val => handleChangeValue('password', val)}
                    isPassword
                    allowClear
                    affix={<Lock size={22} color={appColors.gray} />}
                />
                <InputComponent
                    value={values.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={val => handleChangeValue('confirmPassword', val)}
                    isPassword
                    allowClear
                    affix={<Lock size={22} color={appColors.gray} />}
                />

            </SectionComponent>
            <SpaceComponent height={16} />
            <SectionComponent >
                <ButtonComponent text='ĐĂNG KÝ' type='primary' />
            </SectionComponent>
            <SocialLogin />
            <SectionComponent>
                <RowComponent justify='center'>
                    <TextComponent text='Bạn chưa có tài khoản? ' />
                    <ButtonComponent
                        text='Đăng nhập'
                        type='link'
                        onPress={() => navigation.navigate('LoginScreen')}
                    />
                </RowComponent>
            </SectionComponent>
        </ContainerComponent>
    )
}

export default SignUpScreen