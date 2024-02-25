import { View, Text, Button, Image, Switch, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import SocialLogin from './components/SocialLogin'
import authenticationAPI from '../../apis/authApi'
import { Validate } from '../../utils/validate'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
    const dispatch = useDispatch()

    const handleLogin = async () => {


        const emailValidation = Validate.email(email)
        if (emailValidation) {
            try {
                const res = await authenticationAPI.HandleAuthentication('/login', { email, password }, 'post')
                dispatch(addAuth(res.data))

                await AsyncStorage.setItem('auth', isRemember ? JSON.stringify(res.data) : email)

            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('Email không hợp lệ!')
        }

    }

    return (
        <ContainerComponent isImageBackground isScroll>
            <SectionComponent
                styles={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 75,
                }}>
                <Image
                    source={require('../../assets/images/Logo.png')}
                    style={{
                        width: 180,
                        height: 180,
                        marginBottom: 30,
                    }}
                />
            </SectionComponent>
            <SectionComponent >
                <TextComponent size={24} title text="Đăng nhập" />
                <SpaceComponent height={21} />
                <InputComponent
                    value={email}
                    placeholder="Email"
                    onChange={val => setEmail(val)}
                    allowClear
                    affix={<Sms size={22} color={appColors.gray} />}
                />
                <InputComponent
                    value={password}
                    placeholder="Password"
                    onChange={val => setPassword(val)}
                    isPassword
                    allowClear
                    affix={<Lock size={22} color={appColors.gray} />}
                />
                <RowComponent justify='space-between'>
                    <RowComponent onPress={() => setIsRemember(!isRemember)}>
                        <Switch
                            trackColor={{ true: appColors.primary }}
                            thumbColor={appColors.white}
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)} />
                        <TextComponent text='Ghi nhớ tôi' />
                    </RowComponent>
                    <ButtonComponent
                        text='Quên mật khẩu?'
                        onPress={() => navigation.navigate('ForgotPassword')}
                        type='text' />
                </RowComponent>
            </SectionComponent>
            <SpaceComponent height={16} />
            <SectionComponent >
                <ButtonComponent onPress={handleLogin} text='ĐĂNG NHẬP' type='primary' />
            </SectionComponent>
            <SocialLogin />
            <SectionComponent>
                <RowComponent justify='center'>
                    <TextComponent text='Bạn chưa có tài khoản? ' />
                    <ButtonComponent
                        text='Đăng ký'
                        type='link'
                        onPress={() => navigation.navigate('SignUpScreen')} />
                </RowComponent>
            </SectionComponent>
        </ContainerComponent>
    )
}

export default LoginScreen