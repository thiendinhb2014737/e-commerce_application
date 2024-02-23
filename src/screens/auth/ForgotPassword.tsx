import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { ArrowRight, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    return (
        <ContainerComponent back isImageBackground>
            <SectionComponent>
                <TextComponent text='Tạo lại mật khẩu' title />
                <TextComponent text='Vui lòng nhập lại địa chỉ email của bạn để tạo lại mật khẩu' />
                <SpaceComponent height={26} />
                <InputComponent
                    value={email}
                    placeholder="abc@gmail.com"
                    onChange={val => setEmail(val)}
                    allowClear
                    affix={<Sms size={22} color={appColors.gray} />}
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent text='Send' type='primary' icon={<ArrowRight size={20} color={appColors.white} />} iconFlex='right' />
            </SectionComponent>

        </ContainerComponent>
    )
}

export default ForgotPassword