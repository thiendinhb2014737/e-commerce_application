import { View, Text, TouchableOpacity, StatusBar, Platform, StyleSheet, Modal, Alert } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { ButtonComponent, CardComponent, CircleComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { globalStyles } from '../../../styles/globalStyles'
import { appColors } from '../../../constants/appColors'
import { ArrowLeft, HambergerMenu, Notification } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontFamilies } from '../../../constants/fontFamilies'
import StepComponent from '../../cart/StepComponent/StepComponent'
import { useSelector } from 'react-redux'
import { orderSelector } from '../../../redux/reducers/orderReducer'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RadioButton } from 'react-native-paper'
import { authSelector } from '../../../redux/reducers/authReducer'
import authenticationAPI from '../../../apis/authApi'
import { useQuery } from '@tanstack/react-query'
import InputFormConponent from '../../profile/InputFormComponent/InputFormConponent'
import moment from 'moment'
import orderAPI from '../../../apis/orderApi'
import { PayPalButton } from 'react-paypal-button-v2'
import paymentAPI from '../../../apis/paymentApi'
import WebView from 'react-native-webview'
import queryString from 'query-string'
import { convertPrice } from '../../../utils/validate'




const Payment = ({ navigation }: any) => {
    const order = useSelector(orderSelector)
    const user = useSelector(authSelector)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [delivery, setDelivery] = useState('fast')
    const [payment, setPayment] = useState('later_money')
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const date = moment().format("MMMM YYYY")
    const [paypalUrl, setPaypalUrl] = useState(null)
    const [accessToken, setAccessToken]: any = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isSuccessOrder, setIsSuccessOrder] = useState(false)
    const a = Math.floor(Math.random() * 10000)
    const maDH = `DINGVOG${a}`


    const getDetailsUser = async () => {
        const api = `/get-details/${user.id}`;
        const res = await authenticationAPI.HandleAuthentication(api, 'get')
        return res.data
    }
    const queryUser = useQuery({
        queryKey: ['getDetailsUser'],
        queryFn: getDetailsUser
    })

    const { data: detailsUser } = queryUser

    useEffect(() => {
        setName(detailsUser?.name)
        setPhone(detailsUser?.phone)
        setAddress(detailsUser?.address)
    }, [detailsUser])


    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total: any, cur: any) => {
            return total + (cur.price * cur.amount)
        }, 0)
        return result
    }, [order])

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total: any, cur: any) => {
            const totalDiscount = cur.discount ? cur.discount : 0
            return total + (priceMemo * (totalDiscount * cur.amount) / 100)
        }, 0)
        if (Number(result)) {
            return result
        }
        return 0
    }, [order])

    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo >= 200000 && priceMemo < 500000) {
            return 25000
        } else if (priceMemo >= 500000 || order?.orderItemsSelected?.length === 0) {
            return 0
        } else {
            return 35000
        }
    }, [priceMemo])

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])


    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }
    const handleUpdateUse = async () => {
        const api = `/update-user/${user.id}`;

        try {
            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                { name, phone, address },
                'put',
            );
            Alert.alert('Cập nhật thành công!');
        } catch (error) {
            console.log(`Cập nhật thất bại, ${error}`);
        }
    };
    const ListOrder: any = []
    order?.orderItemsSelected?.map((item: any) => {
        if (item?.product !== "") {
            ListOrder.push(item)
        }

    })

    const handleAddOrder = async () => {
        const api = `/create`;
        try {
            const res: any = await orderAPI.HandleOrder(
                api,
                {
                    orderItems: ListOrder,
                    fullName: name,
                    address: address,
                    phone: phone,
                    paymentMethod: payment,
                    itemsPrice: priceMemo,
                    shippingPrice: diliveryPriceMemo,
                    totalPrice: totalPriceMemo,
                    user: user?.id,
                    maDH: maDH,
                    createOrderdAt: String(date)
                },
                'post',
            );

            console.log(res);
            Alert.alert('Đặt hàng thành công!');
            setIsSuccessOrder(true)
        } catch (error) {
            console.log(`Không thể đặt hàng, ${error}`);
        }
    }
    useEffect(() => {
        if (isSuccessOrder === true) {
            navigation.navigate('Order', {
                screen: 'OrderScreen',
            });
        }

    }, [isSuccessOrder])


    const onPressPaypal = async () => {

        setLoading(true)
        try {
            const token = await paymentAPI.generateToken()
            const res: any = await paymentAPI.createOrder(token)
            setAccessToken(token)

            // console.log("res++++++", res)
            if (!!res?.links) {
                const findUrl = res.links.find((data: any) => data?.rel == "approve")
                setPaypalUrl(findUrl.href)
            }
            setLoading(false)
        } catch (error) {
            console.log("error", error)
            setLoading(false)

        }
    }
    const onUrlChange = (webviewState: any) => {
        // console.log("webviewStatewebviewState", webviewState)
        if (webviewState.url.includes('https://example.com/cancel')) {
            clearPaypalState()
            return;
        }
        if (webviewState.url.includes('https://example.com/return')) {

            const urlValues = queryString.parseUrl(webviewState.url)
            //console.log("my urls value", urlValues)
            const { token } = urlValues.query
            if (!!token) {
                paymentSucess(token)
            }

        }
    }
    const createOrder = async () => {
        const api = `/create`;
        try {
            const res: any = await orderAPI.HandleOrder(
                api,
                {
                    orderItems: ListOrder,
                    fullName: name,
                    address: address,
                    phone: phone,
                    paymentMethod: payment,
                    itemsPrice: priceMemo,
                    shippingPrice: diliveryPriceMemo,
                    totalPrice: totalPriceMemo,
                    user: user?.id,
                    isPaid: true,
                    maDH: maDH,
                    createOrderdAt: String(date),
                },
                'post',
            );

            console.log(res);
            Alert.alert('Đặt hàng thành công!');
            setIsSuccessOrder(true)
        } catch (error) {
            console.log(`Không thể đặt hàng, ${error}`);
        }
    }
    const paymentSucess = async (id: any) => {
        try {
            const res: any = paymentAPI.capturePayment(id, accessToken)
            //console.log("capturePayment res++++", res)
            if (res) {
                createOrder()
            }
            clearPaypalState()
        } catch (error) {
            console.log("error raised in payment capture", error)
        }
    }


    const clearPaypalState = () => {
        setPaypalUrl(null)
        setAccessToken(null)
    }

    //console.log(paypalUrl)
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
            <CardComponent>
                <RowComponent>
                    <Text style={{ fontSize: 14, width: 300 }} numberOfLines={1} ellipsizeMode='tail'>{`Địa chỉ giao hàng: ${detailsUser?.address}`}</Text>
                    <TouchableOpacity onPress={handleChangeAddress}>
                        <TextComponent text=' (Chỉnh sửa)' color={appColors.primary} />
                    </TouchableOpacity>
                </RowComponent>
            </CardComponent>


            <CardComponent styles={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <TextComponent text={`Tổng tiền hàng: ${convertPrice(priceMemo)}`} styles={{ padding: 3 }} />
                <TextComponent text={`Tổng giảm giá: ${convertPrice(priceDiscountMemo)}`} styles={{ padding: 3 }} />
                <TextComponent text={`Tổng tiền phí vận chuyển: ${convertPrice(diliveryPriceMemo)}`} styles={{ padding: 3 }} />
                <CardComponent styles={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <RowComponent>
                        <TextComponent text={`Tổng thanh toán: `} styles={{ fontSize: 16 }} />
                        <TextComponent text={`${convertPrice(totalPriceMemo)}`} styles={{ fontSize: 16 }} color='coral' />
                    </RowComponent>
                </CardComponent>

            </CardComponent>
            <CardComponent>
                <TextComponent text='Chọn phương thức giao hàng' />


                <CardComponent styles={{ width: 350 }}>
                    <RowComponent>
                        <RadioButton
                            value='fast'
                            status={delivery === 'fast' ? 'checked' : 'unchecked'}
                            onPress={() => setDelivery('fast')}
                        />
                        <TextComponent text='FAST ' color='#ea8500' font={fontFamilies.medium} />
                        <TextComponent text='Giao hàng tiết kiệm' />
                    </RowComponent>
                </CardComponent>



                <CardComponent styles={{ width: 350 }}>
                    <RowComponent>
                        <RadioButton
                            value='gojek'
                            status={delivery === 'gojek' ? 'checked' : 'unchecked'}
                            onPress={() => setDelivery('gojek')}
                        />
                        <TextComponent text='GO_JEK ' color='#ea8500' font={fontFamilies.medium} />
                        <TextComponent text='Giao hàng tiết kiệm' />
                    </RowComponent>
                </CardComponent>




                <TextComponent text='Chọn phương thức thanh toán' />


                <CardComponent styles={{ width: 350 }}>
                    <RowComponent>
                        <RadioButton
                            value='later_money'
                            status={payment === 'later_money' ? 'checked' : 'unchecked'}
                            onPress={() => setPayment('later_money')}
                        />

                        <TextComponent text='Thanh toán khi nhận hàng' />
                    </RowComponent>
                </CardComponent>


                <CardComponent styles={{ width: 350 }}>
                    <RowComponent>
                        <RadioButton
                            value='paypal'
                            status={payment === 'paypal' ? 'checked' : 'unchecked'}
                            onPress={() => setPayment('paypal')}
                        />

                        <TextComponent text='Thanh toán qua Paypal' />
                    </RowComponent>
                </CardComponent>




            </CardComponent>

            {payment === 'paypal' ? (
                <ButtonComponent text='Thanh toán Paypal' type='primary' onPress={onPressPaypal} />

            ) : (
                <ButtonComponent text='Đặt hàng' type='primary' onPress={() => handleAddOrder()} />
            )}

            <Modal visible={isOpenModalUpdateInfo}
                onRequestClose={() => {
                    setIsOpenModalUpdateInfo(!isOpenModalUpdateInfo);
                }}>
                <SectionComponent>
                    <TouchableOpacity
                        onPress={() => setIsOpenModalUpdateInfo(!isOpenModalUpdateInfo)}
                        style={{ marginRight: 12 }}>
                        <ArrowLeft size={24} color={appColors.text} />
                    </TouchableOpacity>
                    <TextComponent text='Họ và tên:' size={15} font={fontFamilies.regular} />
                    <SpaceComponent height={5} />
                    <InputFormConponent
                        value={name}
                        onChange={val => setName(val)}
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
            </Modal>
            <Modal
                visible={!!paypalUrl}
            >
                <TouchableOpacity
                    onPress={clearPaypalState}
                    style={{ margin: 24 }}
                >
                    <Text >Closed</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    {paypalUrl ? (
                        <WebView
                            source={{ uri: paypalUrl }}
                            onNavigationStateChange={onUrlChange}
                        />
                    ) : (
                        <View>
                            <TextComponent text='NULL' />
                        </View>
                    )
                    }

                </View>

            </Modal>
        </View>
    )
}

export default Payment
const styles = StyleSheet.create({
    check: {
        alignSelf: 'center'
    },
    checkBox: {
        width: 13,
        height: 13,
        borderWidth: 2,
        borderColor: appColors.gray
    }
})