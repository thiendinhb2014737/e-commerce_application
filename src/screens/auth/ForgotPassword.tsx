import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { ArrowRight, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import { Validate } from '../../utils/validate'
import authenticationAPI from '../../apis/authApi'
import { LoadingModal } from '../../modals'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const handleCheckEmail = () => {
        const isValidEmail = Validate.email(email);
        setIsDisable(!isValidEmail);
    };
    const handleForgotPassword = async () => {
        const api = `/forgotPassword`;
        setIsLoading(true);
        try {
            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                { email },
                'post',
            );

            console.log(res);

            Alert.alert('Gửi đến email', 'Vui lòng kiểm tra email để lấy mật khẩu!');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(`Không thể tạo mật khẩu mới api quên mật khẩu, ${error}`);
        }
    };

    return (
        <ContainerComponent back isImageBackground isScroll>
            <SectionComponent>
                <TextComponent text='Tạo lại mật khẩu' title />
                <SpaceComponent height={12} />
                <TextComponent text='Vui lòng nhập lại địa chỉ email của bạn để tạo lại mật khẩu' />
                <SpaceComponent height={26} />
                <InputComponent
                    value={email}
                    placeholder="abc@gmail.com"
                    onChange={val => setEmail(val)}
                    allowClear
                    affix={<Sms size={22} color={appColors.gray} />}
                    onEnd={handleCheckEmail}
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    onPress={handleForgotPassword}
                    disable={isDisable}
                    text='Gửi'
                    type='primary'
                    icon={<ArrowRight size={20} color={appColors.white} />}
                    iconFlex='right' />
            </SectionComponent>
            <LoadingModal visible={isLoading} />

        </ContainerComponent>
    )
}

export default ForgotPassword