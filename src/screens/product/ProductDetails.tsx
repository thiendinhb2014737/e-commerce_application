import { View, Text, Platform, StatusBar, TextInput, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, CardComponent, CircleComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { LoadingModal } from '../../modals'
import InputSearchConponent from '../home/InputSearchComponent/InputSearchConponent'
import { ElementPlus, HambergerMenu, Minus, Notification, SearchNormal1, Star1 } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import { fontFamilies } from '../../constants/fontFamilies'
import { TouchableOpacity } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query'
import productAPI from '../../apis/productApi'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../../redux/reducers/authReducer'
import { addOrderProduct, orderSelector } from '../../redux/reducers/orderReducer'
import { convertPrice } from '../../utils/validate'


const ProductDetails = ({ navigation, route }: any) => {

    const { ProductID }: { ProductID: string } = route.params
    // console.log(ProductID)
    const [search, setSearch] = useState('')
    const [size, setSize] = useState('')
    const [numberProduct, setNumberProduct] = useState(1)
    const user = useSelector(authSelector)
    const [isLoading, setIsLoading] = useState(false)
    const order = useSelector(orderSelector)
    const [colorBorderS, setColorBorderS] = useState('#111')
    const [colorBorderM, setColorBorderM] = useState('#111')
    const [colorBorderL, setColorBorderL] = useState('#111')
    const [colorBorderXL, setColorBorderXL] = useState('#111')




    const [listChecked, setListChecked] = useState([''])
    const [errorLimitOrder, setErrorLimitOrder] = useState(false)

    const dispatch = useDispatch()

    const fetchGetDetailsProduct = async (context: any) => {
        const id = context?.queryKey && context?.queryKey[1]
        const api = `/get-details/${id}`;
        if (id) {
            const res = await productAPI.HandleProduct(api, 'get')
            return res.data
        }
    }
    const { data: productDetails } = useQuery({
        queryKey: ['product-details', ProductID],
        queryFn: fetchGetDetailsProduct, enabled: !!ProductID
    })



    // useEffect(() => {
    //     initFacebookSDK()
    // }, [])

    // useEffect(() => {
    //     const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
    //     if ((orderRedux?.amount + numberProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
    //         setErrorLimitOrder(false)
    //     } else if (productDetails?.countInStock === 0) {
    //         setErrorLimitOrder(true)
    //     }
    // }, [numberProduct])

    // useEffect(() => {
    //     if (order.isSucessOrder) {
    //         mess.success('Đã thêm vào giỏ hàng')
    //     }
    //     return () => {
    //         dispatch(resetOrder())
    //     }
    // }, [order.isSucessOrder])

    const handleChangeCount = (type: any, limited: any) => {
        if (type === 'increase') {
            if (!limited) {
                setNumberProduct(numberProduct + 1)
            }
        } else {
            if (!limited) {
                setNumberProduct(numberProduct - 1)
            }
        }
    }
    // const [placement, SetPlacement] = useState('');
    // const placementChange = (e) => {
    //     SetPlacement(e.target.value);
    // };

    const handleAddOrderProduct = () => {

        // const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
        // if ((orderRedux?.amount + numberProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
        dispatch(addOrderProduct({
            ///
            userID: user?.id,
            orderItem: {
                name: productDetails?.name,
                amount: numberProduct,
                image: productDetails?.image,
                price: productDetails?.price,
                product: productDetails?._id,
                discount: productDetails?.discount,
                size: size,
                countInStock: productDetails?.countInStock
            },
        }))
        // } else {
        //     setErrorLimitOrder(true)
        // }

    }
    console.log(size)
    return (
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

                        <InputSearchConponent
                            styles={{}}
                            placeholder={productDetails?.name}
                            onChange={val => setSearch(val)}
                        />
                    </RowComponent>

                    <SpaceComponent height={24} />
                </View>
            </View>

            <CardComponent styles={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                {productDetails?.image ?
                    (<Image source={{ uri: productDetails?.image }} style={{ width: 290, height: 290 }} />)
                    : (
                        <View
                            style={{ backgroundColor: appColors.gray2 }}>
                            <TextComponent
                                title
                                size={22}
                                color={appColors.white}
                                text={
                                    productDetails?.name
                                        ? productDetails?.name
                                            .split(' ')
                                        [productDetails?.name.split(' ').length - 1].substring(0, 1)
                                        : ''
                                }
                            />
                        </View>
                    )
                }

            </CardComponent>

            <CardComponent>
                <RowComponent justify='flex-start' styles={{ padding: 6, borderWidth: 0.5 }}>
                    <TextComponent text={`${productDetails?.name}`} styles={{ fontSize: 17, paddingRight: 20 }} />
                    <TextComponent text={`(-${productDetails?.discount}%)`} styles={{ fontSize: 12, paddingRight: 20 }} />
                    <TextComponent text={`|  ${productDetails?.rating}`} styles={{ paddingRight: 3, fontSize: 12 }} />
                    <Star1 size={12} color='orange' />
                    <TextComponent text={`|  (Đã bán ${productDetails?.selled})`} styles={{ paddingRight: 20, paddingLeft: 20, fontSize: 12 }} />
                </RowComponent>
                <SpaceComponent height={6} />
                <RowComponent>
                    <TextComponent text={`Giá bán:`} styles={{ fontSize: 14, paddingRight: 5 }} />
                    <TextComponent text={`${convertPrice(productDetails?.price)}`} styles={{ fontSize: 18 }} />
                </RowComponent>
                <SpaceComponent height={6} />

                <RowComponent>
                    <TextComponent text='Kích cỡ:' styles={{ paddingRight: 5 }} />
                    <TouchableOpacity style={[styles.checkBox]} onPress={() => setSize('S')}>{
                        size === 'S' &&
                        <AntDesign style={[styles.check]} name='check' color={appColors.text} size={20} />
                    }</TouchableOpacity>
                    <TextComponent text={productDetails?.sizeS} styles={{ padding: 10 }} />
                    <TouchableOpacity style={[styles.checkBox]} onPress={() => setSize('M')}>{
                        size === 'M' &&
                        <AntDesign style={[styles.check]} name='check' color={appColors.text} size={20} />
                    }</TouchableOpacity>
                    <TextComponent text={productDetails?.sizeM} styles={{ padding: 10 }} />
                    <TouchableOpacity style={[styles.checkBox]} onPress={() => setSize('L')}>{
                        size === 'L' &&
                        <AntDesign style={[styles.check]} name='check' color={appColors.text} size={20} />
                    }</TouchableOpacity>
                    <TextComponent text={productDetails?.sizeL} styles={{ padding: 10 }} />
                    <TouchableOpacity style={[styles.checkBox]} onPress={() => setSize('XL')}>{
                        size === 'XL' &&
                        <AntDesign style={[styles.check]} name='check' color={appColors.text} size={20} />
                    }</TouchableOpacity>
                    <TextComponent text={productDetails?.sizeXL} styles={{ padding: 10 }} />
                    {/* <TouchableOpacity style={{ padding: 13, borderWidth: 0.7, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderBlockColor: colorBorderS }} onPress={() => { setSize('S'), setColorBorderS('blue') }}>
                        <TextComponent text={productDetails?.sizeS} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 13, borderWidth: 0.7, borderBlockColor: colorBorderM }} onPress={() => { setSize('M'), setColorBorderM('blue') }}>
                        <TextComponent text={productDetails?.sizeM} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 13, borderWidth: 0.7, borderBlockColor: colorBorderL }} onPress={() => { setSize('L'), setColorBorderL('blue') }}>
                        <TextComponent text={productDetails?.sizeL} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 13, borderWidth: 0.7, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBlockColor: colorBorderXL }} onPress={() => { setSize('XL'), setColorBorderXL('blue') }}>
                        <TextComponent text={productDetails?.sizeXL} />
                    </TouchableOpacity> */}
                </RowComponent>
                <SpaceComponent height={6} />
                <TextComponent text={`Số lượng còn lại (${productDetails?.countInStock}) sản phẩm`} />
                <SpaceComponent height={6} />
                <RowComponent>
                    <TextComponent text='Số lượng:' styles={{ paddingRight: 5 }} />
                    <TouchableOpacity style={{ padding: 6, borderWidth: 0.7 }} onPress={() => handleChangeCount('decrease', numberProduct === 1)} >
                        <AntDesign name='minus' color={appColors.text} size={24} />
                    </TouchableOpacity>
                    <TextComponent text={String(numberProduct)} styles={{ padding: 8.5, fontSize: 16, borderWidth: 0.7 }} />
                    <TouchableOpacity style={{ padding: 6, borderWidth: 0.7 }}>
                        <AntDesign name='plus' color={appColors.text} size={24} onPress={() => handleChangeCount('increase', numberProduct === productDetails?.countInStock)} />
                    </TouchableOpacity>
                </RowComponent>

                <SpaceComponent height={6} />
                <TextComponent text={`Mô tả sản phẩm: ${productDetails?.description}`} />
            </CardComponent>
            <ButtonComponent text='MUA NGAY' type='primary' onPress={handleAddOrderProduct} />

            <LoadingModal visible={isLoading} />
        </View>
    )
}

export default ProductDetails
const styles = StyleSheet.create({
    check: {
        alignSelf: 'center'
    },
    checkBox: {
        width: 23,
        height: 23,
        borderWidth: 2,
        borderColor: appColors.gray
    }
})