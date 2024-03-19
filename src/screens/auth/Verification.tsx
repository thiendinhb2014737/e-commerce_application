import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';
import { globalStyles } from '../../styles/globalStyles';
import { ArrowRight } from 'iconsax-react-native';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authenticationAPI from '../../apis/authApi';
import { useDispatch } from 'react-redux';
import { LoadingModal } from '../../modals';
import moment from 'moment';

const Verification = ({ navigation, route }: any) => {
    const { code, email, password, username } = route.params;
    const [currentCode, setCurrentCode] = useState<string>(code);
    const [codeValues, setCodeValues] = useState<string[]>([]);
    const [newCode, setNewCode] = useState('');
    const [limit, setLimit] = useState(120);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const date = moment().format("MMMM YYYY")
    const dispatch = useDispatch();


    const ref1 = useRef<any>();
    const ref2 = useRef<any>();
    const ref3 = useRef<any>();
    const ref4 = useRef<any>();

    useEffect(() => {
        ref1.current.focus();
    }, []);

    useEffect(() => {
        let item = ``;

        codeValues.forEach(val => (item += val));

        setNewCode(item);
    }, [codeValues]);

    useEffect(() => {
        if (limit > 0) {
            const interval = setInterval(() => {
                setLimit(limit => limit - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [limit]);

    const handleChangeCode = (val: string, index: number) => {
        const data = [...codeValues];
        data[index] = val;

        setCodeValues(data);
    };
    const handleResendVerification = async () => {
        setCodeValues(['', '', '', '']);
        setNewCode('');

        const api = `/verification`;
        setIsLoading(true);
        try {
            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                { email },
                'post',
            );

            setLimit(120);
            setCurrentCode(res.data.code);
            setIsLoading(false);

            console.log(res.data.code);
        } catch (error) {
            setIsLoading(false);
            console.log(`Can not send verification code ${error}`);
        }
    };

    const handleVerification = async () => {
        if (limit > 0) {
            if (parseInt(newCode) !== parseInt(currentCode)) {
                setErrorMessage('Mã code không hợp lệ!');
            } else {
                setErrorMessage('');

                const api = `/register`;
                const data = {
                    email,
                    password,
                    username: username ?? '',
                    createUserdAt: date,
                };

                try {
                    const res: any = await authenticationAPI.HandleAuthentication(
                        api,
                        data,
                        'post',
                    );
                    dispatch(addAuth(res.data));
                    await AsyncStorage.setItem('auth', JSON.stringify(res.data));
                } catch (error) {
                    setErrorMessage('Tài khoản đã tồn tại!');
                    console.log(`Không thể tạo tài khoản ${error}`);
                }
            }
        } else {
            setErrorMessage('Mã xác minh hết thời gian chờ, vui lòng gửi lại mã mới!');
        }
    };

    return (
        <ContainerComponent back isImageBackground>
            <SectionComponent>
                <TextComponent text='Xác thực qua email' title />
                <SpaceComponent height={12} />
                <TextComponent text={`Vui lòng nhập mã code được gửi qua ${email.replace(/.{1,6}/, (m: any) => '*'.repeat(m.length))} vừa đăng ký!`} />
                <SpaceComponent height={26} />
                <RowComponent justify="space-around">
                    <TextInput
                        keyboardType="number-pad"
                        ref={ref1}
                        value={codeValues[0]}
                        style={[styles.input]}
                        maxLength={1}
                        onChangeText={val => {
                            val.length > 0 && ref2.current.focus();
                            handleChangeCode(val, 0);
                        }}
                        // onChange={() => }
                        placeholder="-"
                    />
                    <TextInput
                        ref={ref2}
                        value={codeValues[1]}
                        keyboardType="number-pad"
                        onChangeText={val => {
                            handleChangeCode(val, 1);
                            val.length > 0 && ref3.current.focus();
                        }}
                        style={[styles.input]}
                        maxLength={1}
                        placeholder="-"
                    />
                    <TextInput
                        keyboardType="number-pad"
                        value={codeValues[2]}
                        ref={ref3}
                        onChangeText={val => {
                            handleChangeCode(val, 2);
                            val.length > 0 && ref4.current.focus();
                        }}
                        style={[styles.input]}
                        maxLength={1}
                        placeholder="-"
                    />
                    <TextInput
                        keyboardType="number-pad"
                        ref={ref4}
                        value={codeValues[3]}
                        onChangeText={val => {
                            handleChangeCode(val, 3);
                        }}
                        style={[styles.input]}
                        maxLength={1}
                        placeholder="-"
                    />
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{ marginTop: 40 }}>
                <ButtonComponent
                    disable={newCode.length !== 4}
                    onPress={handleVerification}
                    text="Tiếp tục"
                    type="primary"
                    iconFlex="right"
                    icon={
                        <View
                            style={[
                                globalStyles.iconContainer,
                                {
                                    backgroundColor:
                                        newCode.length !== 4 ? appColors.gray : appColors.primary,
                                },
                            ]}>
                            <ArrowRight size={18} color={appColors.white} />
                        </View>
                    }
                />
            </SectionComponent>
            {errorMessage && (
                <SectionComponent>
                    <TextComponent
                        styles={{ textAlign: 'center' }}
                        text={errorMessage}
                        color={appColors.danger}
                    />
                </SectionComponent>
            )}
            <SectionComponent>
                {limit > 0 ? (
                    <RowComponent justify="center">
                        <TextComponent text="Re-send code in  " flex={0} />
                        <TextComponent
                            text={`${(limit - (limit % 60)) / 60}:${limit - (limit - (limit % 60))
                                }`}
                            flex={0}
                            color={appColors.link}
                        />
                    </RowComponent>
                ) : (
                    <RowComponent justify="center">
                        <ButtonComponent
                            type="link"
                            text="Làm mới mã code"
                            onPress={handleResendVerification}
                        />
                    </RowComponent>
                )}
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    )
}

export default Verification

const styles = StyleSheet.create({
    input: {
        height: 55,
        width: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gray2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontFamily: fontFamilies.bold,
        textAlign: 'center',
    },
});