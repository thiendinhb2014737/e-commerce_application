import { View, Text, Button, Image, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms, User } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import SocialLogin from './components/SocialLogin'
import { LoadingModal } from '../../modals'
import authenticationAPI from '../../apis/authApi'
import { Validate } from '../../utils/validate'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'

const initValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpScreen = ({ navigation }: any) => {

    const [values, setValues] = useState(initValue)
    const [isLoading, setIsLoading] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const date = moment().format("MMMM DD YYYY")
    const dispatch = useDispatch()

    useEffect(() => {
        if (values.email || values.password) {
            setErrMessage('')
        }

    }, [values.email, values.password])

    const handleChangeValue = (key: string, value: string) => {

        const data: any = { ...values }

        data[`${key}`] = value
        setValues(data)
    }


    const handleRegister = async () => {
        const { email, password, confirmPassword } = values
        const emailValidation = Validate.email(email)
        const passwordValidation = Validate.Password(password)

        if (email && password && confirmPassword) {
            if (emailValidation && passwordValidation) {
                setErrMessage('')
                setIsLoading(true)
                //console.log(values)
                try {
                    const res = await authenticationAPI.HandleAuthentication('/register', {
                        name: values.username,
                        email,
                        password,
                        createOrderdAt: String(date)
                    }, 'post')
                    dispatch(addAuth(res.data))
                    await AsyncStorage.setItem('auth', JSON.stringify(res.data))
                    setIsLoading(false)
                } catch (error) {
                    console.log(error)
                    setIsLoading(false)
                }
            } else {
                setErrMessage('Địa chỉ email không hợp lệ!')
            }

        } else {
            setErrMessage('Vui lòng nhập thông tin cần thiết!')
        }


    }

    return (
        <>
            <ContainerComponent isImageBackground isScroll back>

                <SectionComponent>
                    <TextComponent size={24} title text="Đăng ký" />
                    <SpaceComponent height={21} />
                    <InputComponent
                        value={values.username}
                        placeholder="Full name"
                        onChange={val => handleChangeValue('username', val)}
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

                {
                    errMessage && (
                        <SectionComponent>
                            <TextComponent text={errMessage} color={appColors.danger} />
                        </SectionComponent>
                    )
                }

                <SpaceComponent height={16} />
                <SectionComponent >
                    <ButtonComponent onPress={handleRegister} text='ĐĂNG KÝ' type='primary' />
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
            <LoadingModal visible={isLoading} />
        </>

    )
}

export default SignUpScreen