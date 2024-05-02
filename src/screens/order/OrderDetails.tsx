import { View, Text, StatusBar, Platform, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { CardComponent, CircleComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification, Radio } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontFamilies } from '../../constants/fontFamilies'
import { Image } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import orderAPI from '../../apis/orderApi'
import ButtonOrderComponent from './ButtonOrderComponent/ButtonOrderComponent'
import { convertPrice } from '../../utils/validate'
import { RadioButton } from 'react-native-paper'
import ContainerComponent from '../home/ContainerComponent/ContainerComponent'
import { useMutationHooks } from '../../hook/useMutationHook'
import productAPI from '../../apis/productApi'
import { useDispatch, useSelector } from 'react-redux'
import { addorderEvaluateProduct, orderEvaluatedSelector } from '../../redux/reducers/orderEvaluated'
import AntDesign from 'react-native-vector-icons/AntDesign';
const OrderDetails = ({ navigation, route }: any) => {
    const { orderID }: { orderID: string } = route.params
    const [isOpenEvaluate, setIsOpenEvaluate] = useState(false)
    const [evaluateIDPro, setEvaluateIDPro] = useState('')
    const [checked, setChecked] = React.useState(Number);
    const [orderDetails, setOrderDetails]: any = useState('')
    const dispatch = useDispatch()
    const evaluatedListOrder = useSelector(orderEvaluatedSelector)
    const [isOpenEvaluateComplete, setIsOpenEvaluateComplete] = useState(false)

    const fetchMyOrder = async () => {
        const api = `/get-details-order/${orderID}`;
        const res = await orderAPI.HandleOrder(api, 'get')
        setOrderDetails(res.data)
        return res.data
    }

    const queryOrder = useQuery({
        queryKey: ['orders'],
        queryFn: fetchMyOrder,
    })
    useEffect(() => {
        fetchMyOrder()
    }, [orderID])

    const { data } = queryOrder

    const handleOnChangeEvaluate = (id: any) => {
        setIsOpenEvaluate(true)
        setEvaluateIDPro(id)
    }

    const handleEvalute = async () => {
        const api = `/evaluate/${evaluateIDPro}`;

        try {
            const res: any = await productAPI.HandleProduct(
                api,
                { rating: checked },
                'put',
            );
            console.log(res);
            Alert.alert('Đánh giá thành công!');
            setIsOpenEvaluateComplete(true)
            setIsOpenEvaluate(false)
        } catch (error) {
            console.log(`Đánh giá thất bai, ${error}`);
        }
    };

    const orderEvaluatedRedux = evaluatedListOrder?.ListOrderEvaluated?.find((item: any) => item.ListOrderEvaluated === orderID)
    const handleOnEvaluated = () => {
        setIsOpenEvaluateComplete(false)
        dispatch(addorderEvaluateProduct({
            ListOrderEvaluated: orderID,
        }))
    }

    //console.log('evaluatedListOrder', evaluatedListOrder)
    // console.log('orderDetails......', orderDetails?.orderItems)
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
            <ContainerComponent isScroll isImageBackground>
                <CardComponent>
                    <RowComponent>
                        <Text style={{ fontSize: 14 }} numberOfLines={1} ellipsizeMode='tail'>{`Địa chỉ giao hàng: ${orderDetails?.shippingAddress?.address}`}</Text>
                    </RowComponent>
                </CardComponent>

                <CardComponent >
                    <RowComponent>
                        <TextComponent text={`Mã đơn hàng: `} />
                        <TextComponent text={`${data?.maDH}`} color='blue' />
                    </RowComponent>
                    <TextComponent text={`Trạng thái đơn hàng:`} />
                    <RowComponent>
                        <TextComponent text={`Trạng thái đơn hàng: `} />
                        <TextComponent text={`${data?.statusOder}`} color='blue' />
                    </RowComponent>
                    <RowComponent>
                        <TextComponent text={`Trạng thái thanh toán: `} />
                        <TextComponent text={`${data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`} color='blue' />
                    </RowComponent>
                    <TextComponent text={`Tổng tiền phí vận chuyển: ${convertPrice(data?.shippingPrice)}`} />
                    <TextComponent text={`Ngày đặt hàng : ${data?.createOrderdAt}`} />
                    <CardComponent styles={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <RowComponent>
                            <TextComponent text={`Tổng thanh toán: `} />
                            <TextComponent text={`${convertPrice(data?.totalPrice)}`} color='coral' />
                        </RowComponent>
                    </CardComponent>
                </CardComponent>

                <CardComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent text={`Tất cả (${orderDetails?.orderItems?.length} sản phẩm)`} />
                        <TextComponent text='Đơn giá' />
                        <TextComponent text='Số lượng' />
                    </RowComponent>
                </CardComponent>
                {orderDetails?.orderItems?.map((order: any) => {
                    if (order?.product !== '') {
                        return (
                            <CardComponent key={order?.product} styles={{ paddingBottom: 0 }} >
                                <RowComponent justify='space-between' >
                                    <SectionComponent>
                                        {order?.image ?
                                            (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigation.navigate('ProductDetails', {
                                                            ProductID: order?.product,
                                                        })
                                                    }}>
                                                    <Image source={{ uri: order?.image }} style={{ width: 60, height: 60 }} />
                                                </TouchableOpacity>

                                            )
                                            : (
                                                <View
                                                    style={{ backgroundColor: appColors.white }}>
                                                    <TextComponent
                                                        title
                                                        size={22}
                                                        color={appColors.white}
                                                        text={
                                                            order?.name
                                                                ? order?.name
                                                                    .split(' ')
                                                                [order?.name.split(' ').length - 1].substring(0, 1)
                                                                : ''
                                                        }
                                                    />
                                                </View>
                                            )
                                        }

                                        <Text style={{ fontSize: 10, width: 60 }} numberOfLines={1} ellipsizeMode='tail'>{order?.name}</Text>
                                        <TextComponent styles={{ fontSize: 10 }} text={`size (${order?.size})`} />
                                        <RowComponent>
                                            <TextComponent styles={{ fontSize: 10 }} text={`màu sắc `} />
                                            <TextComponent styles={{ width: 13, height: 13, borderWidth: 0.5, borderColor: appColors.gray, backgroundColor: `${order?.color}` }} text={''} />
                                        </RowComponent>

                                    </SectionComponent>
                                    <TextComponent text={`${convertPrice(order?.price)}`} />
                                    <TextComponent text={order.amount} />
                                </RowComponent>
                                {
                                    isOpenEvaluate === false ? (

                                        !orderEvaluatedRedux ? <ButtonOrderComponent
                                            text='Đánh giá sản phẩm'
                                            type='primary'
                                            styles={{ backgroundColor: appColors.white, width: 300 }}
                                            onPress={() => handleOnChangeEvaluate(order?.product)}
                                        /> : <ButtonOrderComponent
                                            text='Sản phẩm đã được đánh giá'
                                            type='primary'
                                            styles={{ backgroundColor: appColors.white, width: 300 }} />

                                    ) :
                                        <CardComponent styles={{ width: 375, marginLeft: 0 }}>
                                            <TextComponent text={`Vui lòng chọn mức đánh giá:`} />
                                            <RowComponent>
                                                <RadioButton
                                                    value="1"
                                                    status={checked === 1 ? 'checked' : 'unchecked'}
                                                    onPress={() => setChecked(1)}
                                                />
                                                <AntDesign name="star" size={18} color='yellow' />
                                            </RowComponent>
                                            <RowComponent>
                                                <RadioButton
                                                    value="2"
                                                    status={checked === 2 ? 'checked' : 'unchecked'}
                                                    onPress={() => setChecked(2)}
                                                />
                                                <AntDesign name="star" size={18} color='yellow' />
                                                <AntDesign name="star" size={18} color='yellow' />
                                            </RowComponent>
                                            <RowComponent>
                                                <RadioButton
                                                    value="3"
                                                    status={checked === 3 ? 'checked' : 'unchecked'}
                                                    onPress={() => setChecked(3)}
                                                />
                                                <AntDesign name="star" size={18} color='yellow' />
                                                <AntDesign name="star" size={18} color='yellow' />
                                                <AntDesign name="star" size={18} color='yellow' />
                                            </RowComponent>
                                            <RowComponent>
                                                <RadioButton
                                                    value="4"
                                                    status={checked === 4 ? 'checked' : 'unchecked'}
                                                    onPress={() => setChecked(4)}
                                                />
                                                <AntDesign name="star" size={18} color='yellow' />
                                                <AntDesign name="star" size={18} color='yellow' />
                                                <AntDesign name="star" size={18} color='yellow' />
                                                <AntDesign name="star" size={18} color='yellow' />
                                            </RowComponent>
                                            <RowComponent>
                                                <RadioButton
                                                    value="5"
                                                    status={checked === 5 ? 'checked' : 'unchecked'}
                                                    onPress={() => setChecked(5)}
                                                />
                                                <AntDesign name="star" size={18} color='yellow' />
                                                <AntDesign name="star" size={18} color='yellow' />
                                                <AntDesign name="star" size={18} color='yellow' />
                                                <AntDesign name="star" size={18} color='yellow' />
                                                <AntDesign name="star" size={18} color='yellow' />
                                            </RowComponent>
                                            <ButtonOrderComponent
                                                onPress={handleEvalute}
                                                text='Đánh giá'
                                                type='primary'
                                                styles={{ backgroundColor: appColors.white, width: 300 }} />
                                        </CardComponent>
                                }

                            </CardComponent>
                        )
                    }
                })}

            </ContainerComponent>
            {
                isOpenEvaluateComplete ?
                    <ButtonOrderComponent
                        onPress={handleOnEvaluated}
                        text='Hoàn tất đánh giá'
                        type='primary'
                        styles={{ backgroundColor: appColors.white, width: 300 }} /> :
                    <View />

            }

        </View>
    )
}

export default OrderDetails