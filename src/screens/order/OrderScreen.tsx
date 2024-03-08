import { View, Text, StatusBar, Platform, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { ButtonComponent, CardComponent, CircleComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification } from 'iconsax-react-native'
import { fontFamilies } from '../../constants/fontFamilies'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux'
import { orderSelector } from '../../redux/reducers/orderReducer'
import { authSelector } from '../../redux/reducers/authReducer'
import { useQuery } from '@tanstack/react-query'
import orderAPI from '../../apis/orderApi'
import ContainerComponent from '../home/ContainerComponent/ContainerComponent'
import { LoadingModal } from '../../modals'
import ButtonOrderComponent from './ButtonOrderComponent/ButtonOrderComponent'
import { useMutationHooks } from '../../hook/useMutationHook'
import { convertPrice } from '../../utils/validate'



const OrderScreen = ({ navigation }: any) => {
    const user = useSelector(authSelector)
    const [limit, setLimit] = useState(2)
    const [isLoading, setIsLoading] = useState(false)

    const fetchMyOrder = async (context: any) => {
        setIsLoading(true)
        const limit = context?.queryKey && context?.queryKey[1]
        const api = `/get-all-order/${user.id}?sort=desc&sort=createdAt&limit=${limit}`;
        const res = await orderAPI.HandleOrder(api, 'get')
        setIsLoading(false)
        return res.data
    }

    const queryOrder = useQuery({
        queryKey: ['orders', limit],
        queryFn: fetchMyOrder,
        enabled: !!user.id
    })

    const { data } = queryOrder


    const handleCanceOrder = async (order: any) => {
        setIsLoading(true)
        const api = `/cancel-order/${user.id}`;
        const res = await orderAPI.HandleOrder(api, {
            orderId: order._id,
            orderItems: order?.orderItems,
        }, 'delete')
        setIsLoading(false)
        queryOrder.refetch()
        Alert.alert("Hủy đơn hàng thành công!")
        return res.data
    }


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
                {data?.map((order: any) => {
                    return (
                        <CardComponent key={order?._id} >
                            <TextComponent text={`Trạng thái đơn hàng`} />
                            <TextComponent text={`Tổng giảm giá: ${order.statusOder}`} />
                            <TextComponent text={`Tổng tiền phí vận chuyển: ${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`} />
                            <CardComponent>
                                {order?.orderItems.map((item: any) => {
                                    return (
                                        <View key={item?.name}>
                                            <RowComponent>
                                                {item?.image ? (
                                                    <Image source={{ uri: item?.image }} style={{ width: 50, height: 50 }} />
                                                ) : (
                                                    <View>
                                                        <TextComponent text='NULL' />
                                                    </View>
                                                )
                                                }
                                                <SectionComponent>
                                                    <TextComponent text={`${item?.name} (x${item?.amount})`} />
                                                    <TextComponent text={`Tổng tiền : ${convertPrice(order.totalPrice)}`} />
                                                    <TextComponent text={`Ngày đặt hàng : ${order.createOrderdAt}`} />
                                                </SectionComponent>
                                            </RowComponent>
                                        </View>
                                    )
                                })}


                            </CardComponent>
                            <RowComponent justify='space-between'>
                                <ButtonOrderComponent
                                    text='Hủy đơn hàng'
                                    type='primary'
                                    styles={{ backgroundColor: appColors.white, width: 150 }}
                                    onPress={() => handleCanceOrder(order)}
                                />
                                <ButtonOrderComponent
                                    text='Xem chi tiết'
                                    type='primary'
                                    styles={{ backgroundColor: appColors.white, width: 150 }}
                                    onPress={() => {
                                        navigation.navigate('OrderDetails', {
                                            orderID: order._id,
                                        })
                                    }}

                                />
                            </RowComponent>
                        </CardComponent>
                    )
                })}


                <RowComponent justify='center'>
                    <ButtonComponent
                        text='Xem thêm'
                        type='primary'
                        onPress={() => setLimit((prev) => prev + 2)}
                    />
                </RowComponent>
            </ContainerComponent>
            <LoadingModal visible={isLoading} />
        </View>
    )
}

export default OrderScreen