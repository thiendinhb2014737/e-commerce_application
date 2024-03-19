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


interface ErrorMessages {
    email: string,
    password: string,
    cpnfirmPassword: string,
}

const initValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpScreen = ({ navigation }: any) => {

    const [values, setValues] = useState(initValue)
    const [isLoading, setIsLoading] = useState(false)
    const [errMessage, setErrMessage] = useState<any>()
    const [isDisable, setIsDisable] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        if (
            !errMessage ||
            (errMessage &&
                (errMessage.email || errMessage.password || errMessage.confirmPassword)) || !values.email || !values.password || !values.confirmPassword
        ) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [errMessage, values]);


    const handleChangeValue = (key: string, value: string) => {

        const data: any = { ...values }

        data[`${key}`] = value
        setValues(data)
    }

    const formValidator = (key: string) => {
        const data = { ...errMessage };
        let message = ``;

        switch (key) {
            case 'email':
                if (!values.email) {
                    message = `Địa chỉ email là bắt buộc!`;
                } else if (!Validate.email(values.email)) {
                    message = 'Đại chỉ email không hợp lệ!';
                } else {
                    message = '';
                }

                break;

            case 'password':
                message = !values.password ? `Mật khẩu là bắt buộc!` : '';
                break;

            case 'confirmPassword':
                if (!values.confirmPassword) {
                    message = `Vui lòng nhập lại mật khẩu!`;
                } else if (values.confirmPassword !== values.password) {
                    message = 'Mật khẩu không trùng khớp!';
                } else {
                    message = '';
                }

                break;
        }

        data[`${key}`] = message;

        setErrMessage(data);
    };

    const handleRegister = async () => {
        const api = `/verification`;
        setIsLoading(true);
        try {
            const res = await authenticationAPI.HandleAuthentication(
                api,
                { email: values.email },
                'post',
            );
            console.log(res)

            setIsLoading(false);

            navigation.navigate('Verification', {
                code: res.data.code,
                ...values,
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
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
                        onEnd={() => formValidator('email')}
                    />
                    <InputComponent
                        value={values.password}
                        placeholder="Password"
                        onChange={val => handleChangeValue('password', val)}
                        isPassword
                        allowClear
                        affix={<Lock size={22} color={appColors.gray} />}
                        onEnd={() => formValidator('password')}
                    />
                    <InputComponent
                        value={values.confirmPassword}
                        placeholder="Confirm Password"
                        onChange={val => handleChangeValue('confirmPassword', val)}
                        isPassword
                        allowClear
                        affix={<Lock size={22} color={appColors.gray} />}
                        onEnd={() => formValidator('confirmPassword')}
                    />

                </SectionComponent>

                {
                    errMessage && (
                        <SectionComponent>
                            {
                                Object.keys(errMessage).map((error, index) => errMessage[`${error}`] && (
                                    <TextComponent
                                        text={errMessage[`${error}`]}
                                        key={`error${index}`}
                                        color={appColors.danger}
                                    />
                                ))
                            }

                        </SectionComponent>
                    )
                }

                <SpaceComponent height={16} />
                <SectionComponent >
                    <ButtonComponent
                        onPress={handleRegister}
                        text='ĐĂNG KÝ'
                        type='primary'
                        disable={isDisable}
                    />
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