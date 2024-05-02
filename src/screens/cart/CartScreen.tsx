import { View, Text, StatusBar, Platform, TouchableOpacity, Image, StyleSheet, Modal, Alert } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { ButtonComponent, CardComponent, CircleComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import CardItem from '../../components/CardItem'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseAmount, increaseAmount, orderSelector, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/reducers/orderReducer'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { ArrowLeft, Check, HambergerMenu, Notification } from 'iconsax-react-native'
import { fontFamilies } from '../../constants/fontFamilies'
import InputSearchConponent from '../home/InputSearchComponent/InputSearchConponent'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { authSelector } from '../../redux/reducers/authReducer'
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import authenticationAPI from '../../apis/authApi'
import { useQuery } from '@tanstack/react-query'
import InputFormConponent from '../profile/InputFormComponent/InputFormConponent'
import StepComponent from './StepComponent/StepComponent'
import ContainerComponent from '../home/ContainerComponent/ContainerComponent'
import { convertPrice } from '../../utils/validate'

const CartScreen = ({ navigation }: any) => {
    const order = useSelector(orderSelector)
    const user = useSelector(authSelector)

    const [listChecked, setListChecked] = useState([''])
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const dispatch = useDispatch()
    //console.log(order)

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

    useEffect(() => {
        getDetailsUser
    }, [isOpenModalUpdateInfo])


    useEffect(() => {
        dispatch(selectedOrder({ listChecked }))
    }, [listChecked])


    //console.log(order?.orderItemsSelected)

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

    const handleChangeCount = (type: any, idProduct: any, limited: any) => {
        if (type === 'increase') {
            if (!limited) {
                dispatch(increaseAmount({ idProduct }))
            }

        } else {
            if (!limited) {
                dispatch(decreaseAmount({ idProduct }))
            }
        }

    }
    const handleDeleteOrder = (idProduct: any) => {
        dispatch(removeOrderProduct({ idProduct }))
    }
    const handleOnchangeCheckAll = (selected: any) => {
        if (selected) {
            const newListChecked: any = []
            order?.orderItems?.forEach((item: any) => {
                newListChecked.push(item?.product)
            })
            setListChecked(newListChecked)
        } else {
            setListChecked([""])
        }
    }
    const onChange = (selected: any) => {
        if (listChecked.includes(selected)) {
            const newListChecked = listChecked.filter((item) => item !== selected)
            setListChecked(newListChecked)
        } else {
            setListChecked([...listChecked, selected])
        }

    };
    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }

    }
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
    const itemsDelivery = [
        '35.000 VNĐ',
        '25.000 VNĐ',
        'FREE SHIP'
    ]
    const handleAddCard = () => {
        //console.log('user', user)
        if (order?.orderItemsSelected?.length === 1 || 0) {
            Alert.alert('Vui lòng chọn sản phẩm!');
        } else if (!name || !phone || !address) {
            setIsOpenModalUpdateInfo(true)
        } else {
            // if (listChecked) {
            //     const List: any = []
            //     listChecked?.map((item: any) => {
            //         if (item !== "") {
            //             List.push(item)
            //         }

            //     })
            //     handleDeleteOrder(List)
            // }
            navigation.navigate('Payment')
        }
    }
    console.log(listChecked)

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

                </View>
            </View>
            <ContainerComponent isImageBackground isScroll>
                <StepComponent items={itemsDelivery} current={diliveryPriceMemo === 35000 ? 0 : diliveryPriceMemo === 25000 ? 1 : order?.orderItemsSelected?.length === 0 ? 0 : 2} />
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
                        <TextComponent text={`Tổng thanh toán: ${convertPrice(totalPriceMemo)}`} color='red' styles={{ fontSize: 16 }} />
                    </CardComponent>

                </CardComponent>

                <CardComponent>
                    <RowComponent justify='space-between'>
                        <TouchableOpacity style={[styles.checkBox]} onPress={() => handleOnchangeCheckAll(true)}>{
                            listChecked?.length === order?.orderItems?.length &&
                            <AntDesign style={[styles.check]} name='check' color={appColors.text} size={10} />
                        }</TouchableOpacity>

                        <TextComponent text={`Tất cả (${order?.orderItems?.length - 1} sản phẩm)`} />
                        <TextComponent text='Đơn giá' />
                        <TextComponent text='Số lượng' />
                        <TouchableOpacity onPress={handleRemoveAllOrder}><TextComponent text='Xóa tất cả' /></TouchableOpacity>
                    </RowComponent>
                </CardComponent>


                {order?.orderItems?.map((order: any) => {
                    if (order?.product !== '') {
                        return (
                            <CardComponent key={order?.product} >
                                <RowComponent justify='space-between' >
                                    <TouchableOpacity style={[styles.checkBox]} onPress={() => onChange(order?.product)}>{
                                        listChecked.includes(order?.product) &&
                                        <AntDesign style={[styles.check]} name='check' color={appColors.text} size={13} />
                                    }</TouchableOpacity>

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
                                        <TextComponent styles={{ fontSize: 10 }} text={`size (${order.size})`} />
                                        <RowComponent>
                                            <TextComponent styles={{ fontSize: 10 }} text={`màu sắc `} />
                                            <TextComponent styles={{ width: 13, height: 13, borderWidth: 0.5, borderColor: appColors.gray, backgroundColor: `${order.color}` }} text={''} />
                                        </RowComponent>

                                    </SectionComponent>


                                    <TextComponent text={`${convertPrice(order.price)}`} />
                                    <RowComponent>

                                        <TouchableOpacity style={{ padding: 6, borderWidth: 0.5 }} onPress={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}>
                                            <AntDesign name='minus' color={appColors.text} size={18} />
                                        </TouchableOpacity>
                                        <TextComponent text={String(order.amount)} styles={{ padding: 7.8, fontSize: 12, borderWidth: 0.5 }} />
                                        <TouchableOpacity style={{ padding: 6, borderWidth: 0.5 }} onPress={() => handleChangeCount('increase', order?.product, order?.amount === order?.countInStock)}>
                                            <AntDesign name='plus' color={appColors.text} size={18} />
                                        </TouchableOpacity>
                                    </RowComponent>
                                    <AntDesign name='delete' color={appColors.text} size={18} onPress={() => handleDeleteOrder(order?.product)} />
                                </RowComponent>
                            </CardComponent>

                        )
                    }
                })}

                <ButtonComponent text='Mua ngay' type='primary' onPress={() => handleAddCard()} />
            </ContainerComponent>
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
        </View>
    )
}

export default CartScreen
const styles = StyleSheet.create({
    check: {
        alignSelf: 'center'
    },
    checkBox: {
        width: 16,
        height: 16,
        borderWidth: 2,
        borderColor: appColors.gray
    }
})