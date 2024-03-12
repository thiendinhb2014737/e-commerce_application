import { View, Text, StatusBar, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { CardComponent, CircleComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontFamilies } from '../../constants/fontFamilies'
import { Image } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import orderAPI from '../../apis/orderApi'
import ButtonOrderComponent from './ButtonOrderComponent/ButtonOrderComponent'
import { convertPrice } from '../../utils/validate'

const OrderDetails = ({ navigation, route }: any) => {
    const { orderID }: { orderID: string } = route.params

    const fetchMyOrder = async () => {
        const api = `/get-details-order/${orderID}`;
        const res = await orderAPI.HandleOrder(api, 'get')

        return res.data
    }

    const queryOrder = useQuery({
        queryKey: ['orders'],
        queryFn: fetchMyOrder,
        enabled: !!orderID
    })

    const { data } = queryOrder
    console.log(data)
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
                    <Text style={{ fontSize: 14 }} numberOfLines={1} ellipsizeMode='tail'>{`Địa chỉ giao hàng: ${data?.shippingAddress?.address}`}</Text>
                </RowComponent>
            </CardComponent>

            <CardComponent >
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
                    <TextComponent text={`Tất cả (${data?.orderItems?.length} sản phẩm)`} />
                    <TextComponent text='Đơn giá' />
                    <TextComponent text='Số lượng' />
                </RowComponent>
            </CardComponent>
            {data?.orderItems?.map((order: any) => {
                if (order?.product !== '') {
                    return (
                        <CardComponent key={order?.product} styles={{ paddingBottom: 0 }} >
                            <RowComponent justify='space-between' >
                                <SectionComponent>
                                    {order?.image ?
                                        (<Image source={{ uri: order?.image }} style={{ width: 60, height: 60 }} />)
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
                        </CardComponent>

                    )
                }
            })}
            <ButtonOrderComponent
                text='Hủy đơn hàng'
                type='primary'
                styles={{ backgroundColor: appColors.white, width: 300 }} />
        </View>
    )
}

export default OrderDetails