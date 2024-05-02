import { View, Text, StatusBar, Platform, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { ButtonComponent, CardComponent, CircleComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification, SearchNormal1 } from 'iconsax-react-native'
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
import InputSearchConponent from '../home/InputSearchComponent/InputSearchConponent'
import { useDebounce } from '../../hook/useDebounce'
import { orderEvaluatedSelector } from '../../redux/reducers/orderEvaluated'



const OrderScreen = ({ navigation }: any) => {
    const user = useSelector(authSelector)
    const [limit, setLimit] = useState(2)
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const searchDebounce = useDebounce(inputSearch, 100)
    const evaluatedListOrder = useSelector(orderEvaluatedSelector)

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        //setIsLoading(true)
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            //setIsLoading(false)
        }, 2000);
    }, []);

    const fetchMyOrder = async (context: any) => {
        //setIsLoading(true)
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        if (search?.length > 0) {
            setIsLoading(true)
            const api = `/get-all-order/${user.id}?limit=${limit}&filter=maDH&filter=${search}&sort=desc&sort=createdAt`;
            const res = await orderAPI.HandleOrder(api, { limit, search }, 'get')
            setIsLoading(false)
            return res.data
        } else {
            setIsLoading(true)
            const api = `/get-all-order/${user.id}?sort=desc&sort=createdAt&limit=${limit}`;
            const res = await orderAPI.HandleOrder(api, 'get')
            setIsLoading(false)
            return res.data
        }


    }

    const queryOrder = useQuery({
        queryKey: ['orders', limit, searchDebounce, refreshing],
        queryFn: fetchMyOrder,
        enabled: !!user.id
    })

    const { data } = queryOrder


    const handleCanceOrder = async (order: any) => {
        //setIsLoading(true)
        const api = `/cancel-order/${user.id}`;
        const res = await orderAPI.HandleOrder(api, {
            orderId: order._id,
            orderItems: order?.orderItems,
        }, 'delete')
        // setIsLoading(false)
        queryOrder.refetch()
        Alert.alert("Hủy đơn hàng thành công!")
        return res.data
    }
    const onSearch = () => {
        setInputSearch(search)
    }


    return (
        <SafeAreaView >
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={[globalStyles.container]}>

                    <StatusBar barStyle={'light-content'} />
                    <View
                        style={{
                            backgroundColor: appColors.primary,
                            height: 178 + (Platform.OS === 'ios' ? 16 : 0),
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

                            <RowComponent justify='center' >
                                <SectionComponent styles={{ paddingHorizontal: 10, paddingLeft: 0 }}>
                                    <SearchNormal1
                                        variant="TwoTone"
                                        size={24}
                                        color={appColors.white}
                                        style={{ paddingRight: 20 }}
                                    />
                                </SectionComponent>

                                <InputSearchConponent
                                    placeholder='Nhập nội dung cần tìm....'
                                    onChange={val => setSearch(val)}
                                    onEnd={() => onSearch()}
                                />
                            </RowComponent>

                            <SpaceComponent height={24} />
                        </View>

                    </View>
                    <ContainerComponent isScroll isImageBackground>
                        {data?.map((order: any) => {
                            let orderEvaluatedRedux = evaluatedListOrder?.ListOrderEvaluated?.find((item: any) => item.ListOrderEvaluated === order?._id)
                            return (
                                <CardComponent key={order?._id} >
                                    <RowComponent>
                                        <TextComponent text={`Mã đơn hàng: `} />
                                        <TextComponent text={`${order.maDH}`} color='blue' />
                                    </RowComponent>
                                    <TextComponent text={`Trạng thái đơn hàng:`} />
                                    <RowComponent>
                                        <TextComponent text={`Trạng thái đơn hàng: `} />
                                        <TextComponent text={`${order.statusOder}`} color='blue' />
                                    </RowComponent>
                                    <RowComponent>
                                        <TextComponent text={`Tổng tiền phí vận chuyển: `} />
                                        <TextComponent text={`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`} color='blue' />
                                    </RowComponent>

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
                                                            <TextComponent text={`${item?.name} (x${item?.amount})`} styles={{ paddingBottom: 4, fontSize: 12 }} />
                                                            <RowComponent>
                                                                <TextComponent text={`Giá: `} styles={{ fontSize: 12 }} />
                                                                <TextComponent text={`${convertPrice(item.price)}`} styles={{ fontSize: 12 }} />
                                                            </RowComponent>

                                                        </SectionComponent>
                                                    </RowComponent>
                                                </View>
                                            )
                                        })}
                                        <RowComponent>
                                            <TextComponent text={`Tổng thanh toán: `} />
                                            <TextComponent text={`${convertPrice(order.totalPrice)}`} color='coral' />
                                        </RowComponent>
                                        <TextComponent text={`Ngày đặt hàng : ${order.createOrderdAt}`} />


                                    </CardComponent>
                                    <RowComponent justify='space-between'>
                                        {
                                            !orderEvaluatedRedux ?
                                                <ButtonOrderComponent
                                                    text='Hủy đơn hàng'
                                                    type='primary'
                                                    styles={{ backgroundColor: appColors.white, width: 150 }}
                                                    onPress={() => handleCanceOrder(order)}
                                                /> : <View></View>
                                        }

                                        <ButtonOrderComponent
                                            text='Xem chi tiết'
                                            type='primary'
                                            styles={{ backgroundColor: appColors.white, width: 150 }}
                                            onPress={() => {
                                                navigation.navigate('OrderDetails', {
                                                    orderID: order?._id,
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderScreen