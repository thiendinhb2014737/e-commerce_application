import { View, Text, Button, StatusBar, Platform, TouchableOpacity, FlatList, ScrollView, Image, ActivityIndicator, StyleSheet, SafeAreaView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { authReducer, authSelector, removeAuth } from '../../redux/reducers/authReducer'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { ButtonComponent, CardComponent, CategoriesList, CircleComponent, EventItem, RowComponent, SectionComponent, SpaceComponent, TagBarComponent, TextComponent } from '../../components'
import { HambergerMenu, Location, Notification, SearchNormal1, Sort, Star } from 'iconsax-react-native'
import { fontFamilies } from '../../constants/fontFamilies'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductItem from '../../components/ProductItem'
import productAPI from '../../apis/productApi'
import TypeProduct from '../../components/TypeProduct'
import { useDebounce } from '../../hook/useDebounce'
import { useQuery } from '@tanstack/react-query'
import CardItem from '../../components/CardItem'
import { LoadingModal } from '../../modals'
import InputFormConponent from '../profile/InputFormComponent/InputFormConponent'
import InputSearchConponent from './InputSearchComponent/InputSearchConponent'
import ContainerComponent from './ContainerComponent/ContainerComponent'
import eventAPI from '../../apis/eventApi'
import Feather from 'react-native-vector-icons/Feather';


const HomeScreen = ({ navigation }: any) => {
    // const searchProduct = useSelector((state) => state?.product?.search)
    const dispatch = useDispatch()
    const auth = useSelector(authSelector)
    const [typeProduct, setTypeProduct] = useState([])
    const [limit, setLimit] = useState(4)
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const searchDebounce = useDebounce(inputSearch, 100)

    const [days, setDay] = useState('');
    const [hours, setHour] = useState('');
    const [minutes, setMinute] = useState('');
    const [seconds, setSecond] = useState('');
    const [discountEvent, setDiscountEvent] = useState('');
    const [limitEvent, setLimitEvent] = useState(1)

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        //setIsLoading(true)
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            //setIsLoading(false)
        }, 2000);
    }, []);

    const fetchAllTypeProduct = async () => {
        const api = `/get-all-type`;
        const res = await productAPI.HandleProduct(api, 'get')
        setTypeProduct(res?.data)
    }

    const fetchProductAll = async (context: any) => {
        const limit = context?.queryKey && context?.queryKey[1]
        //const search = context?.queryKey && context?.queryKey[2]
        if (search?.length > 0) {
            // setIsLoading(true)
            // const api = `/get-all?limit=${limit}&filter=name&filter=${search}&sort=desc&sort=createdAt`;
            // const res = await productAPI.HandleProduct(api, { limit, search }, 'get')
            // setIsLoading(false)
            // return res.data
        } else {
            setIsLoading(true)
            const api = `/get-all?limit=${limit}&sort=desc&sort=createdAt`;
            const res = await productAPI.HandleProduct(api, { limit }, 'get')
            setIsLoading(false)
            return res.data
        }

    }
    // const fetchEvent = async (context: any) => {
    //     const limitEvent = context?.queryKey && context?.queryKey[1]
    //     const api = `/get-event?limit=${limitEvent}&sort=desc&sort=createdAt`;
    //     const res = await eventAPI.HandleEvent(api, { limit }, 'get')
    //     return res
    // }

    const { data: products, isPlaceholderData } = useQuery({
        queryKey: ['products', limit, refreshing],
        queryFn: fetchProductAll,

    })
    // const { data: event } = useQuery({
    //     queryKey: ['event', limitEvent],
    //     queryFn: fetchEvent
    // })
    useEffect(() => {
        fetchProductAll
        fetchAllTypeProduct()
    }, [refreshing])

    const onSearch = () => {
        setInputSearch(search)
    }
    // const fullTime = new Date(`${event?.data[0]?.days} ${event?.data[0]?.hours}:${event?.data[0]?.minutes}:${event?.data[0]?.seconds}`).getTime()
    // useEffect(() => {
    //     setDiscountEvent(event?.data[0]?.discount)
    //     const interval = setInterval(() => {
    //         const now = new Date().getTime()
    //         const distance = (fullTime - now) / 1000
    //         if (distance > 0) {
    //             const days = `0${Math.floor(distance / 60 / 60 / 24)}`.slice(-2)
    //             const hours = `0${Math.floor(distance / 60 / 60 % 24)}`.slice(-2)
    //             const minutes = `0${Math.floor((distance / 60) % 60)}`.slice(-2)
    //             const seconds = `0${Math.floor(distance % 60)}`.slice(-2)
    //             setDay(days)
    //             setHour(hours)
    //             setMinute(minutes)
    //             setSecond(seconds)
    //         } else {
    //             clearInterval(interval)
    //         }
    //     }, 1000);
    //     return () => clearInterval(interval);

    // }, [fullTime])


    const handleReloading = () => {
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
                                    <HambergerMenu size={28} color={appColors.white} />
                                </TouchableOpacity>
                                <View style={[{ flex: 1, alignItems: 'center' }]}>
                                    <RowComponent>
                                        <TouchableOpacity onPress={handleReloading}>
                                            {/* <TextComponent
                                        text=""
                                        color={appColors.white}
                                        size={12}
                                    /> */}
                                            <Feather
                                                name="refresh-ccw"
                                                size={18}
                                                color={appColors.white}
                                            />
                                        </TouchableOpacity>

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
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/images/slider1.png')}
                        resizeMode='repeat'
                        style={{
                            width: 405,
                            height: 80,
                            marginTop: 8,
                            marginLeft: 10,
                            //marginBottom: 10,
                        }}
                    />

                    <ContainerComponent isImageBackground isScroll>
                        <CardComponent styles={{ margin: 0 }}>
                            <RowComponent justify='center' styles={{ gap: 20 }} >
                                {typeProduct.map((item) => {
                                    return (
                                        <TypeProduct name={item} key={item} navigation={navigation} />
                                    )
                                })}

                            </RowComponent>
                        </CardComponent>
                        <CardComponent styles={{ margin: 0, marginTop: 5 }}>
                            <RowComponent justify='space-between' styles={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('GenderProductPage', {
                                            state: 'nam',
                                        })
                                    }}>
                                    <TextComponent text='THỜI TRANG NAM' styles={{ fontSize: 12, paddingLeft: 10 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('GenderProductPage', {
                                        state: 'nữ',
                                    })
                                }}>
                                    <TextComponent text='THỜI TRANG NỮ' styles={{ fontSize: 12, paddingLeft: 15 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('GenderProductPage', {
                                        state: 'unisex',
                                    })
                                }}>
                                    <TextComponent text='THỜI TRANG NAM-NỮ' styles={{ fontSize: 12, }} />
                                </TouchableOpacity>

                            </RowComponent>
                            <RowComponent justify='space-between' styles={{ marginLeft: 15, marginRight: 15 }}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('GenderProductPage', {
                                        state: 'nam',
                                    })
                                }}>
                                    <Image
                                        source={require('../../assets/images/male.png')}
                                        style={{
                                            width: 110,
                                            height: 80,
                                            marginTop: 8,
                                            marginBottom: 3,
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('GenderProductPage', {
                                        state: 'nữ',
                                    })
                                }}>
                                    <Image
                                        source={require('../../assets/images/female.png')}
                                        style={{
                                            width: 110,
                                            height: 80,
                                            marginTop: 8,
                                            marginBottom: 3,
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('GenderProductPage', {
                                        state: 'unisex',
                                    })
                                }}>
                                    <Image
                                        source={require('../../assets/images/unisex.png')}
                                        style={{
                                            width: 110,
                                            height: 80,
                                            marginTop: 8,
                                            marginBottom: 3,
                                        }}
                                    />
                                </TouchableOpacity>
                            </RowComponent>
                        </CardComponent>

                        {/* {(days !== '00' && hours !== '00' && minutes !== '00' && seconds !== '00') ? (
                    <View
                        style={{
                            backgroundColor: appColors.primary,
                            height: 100 + (Platform.OS === 'ios' ? 16 : 0),
                        }}>
                        <TextComponent text='FLASH SALE' color={appColors.white} styles={{ textAlign: 'center' }} font={fontFamilies.semiBold} />
                        <RowComponent justify='center' styles={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 5 }}>
                            <SectionComponent styles={{ height: 70, width: 70, borderColor: '#fff', borderWidth: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <TextComponent text={String(days)} color={appColors.text} styles={{ height: 30, width: 30, borderColor: '#fff', borderWidth: 1, backgroundColor: '#fff', textAlign: 'center', paddingTop: 5, marginTop: 20 }} />
                                <TextComponent text='Ngày' color={appColors.white} styles={{ height: 20 }} />
                            </SectionComponent>
                            <SectionComponent styles={{ height: 70, width: 70, borderColor: '#fff', borderWidth: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <TextComponent text={String(hours)} color={appColors.text} styles={{ height: 30, width: 30, borderColor: '#fff', borderWidth: 1, backgroundColor: '#fff', textAlign: 'center', paddingTop: 5, marginTop: 20 }} />
                                <TextComponent text='Giờ' color={appColors.white} styles={{ height: 20 }} />
                            </SectionComponent>
                            <SectionComponent styles={{ height: 70, width: 70, borderColor: '#fff', borderWidth: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <TextComponent text={String(minutes)} color={appColors.text} styles={{ height: 30, width: 30, borderColor: '#fff', borderWidth: 1, backgroundColor: '#fff', textAlign: 'center', paddingTop: 5, marginTop: 20 }} />
                                <TextComponent text='Phút' color={appColors.white} styles={{ height: 20 }} />
                            </SectionComponent>
                            <SectionComponent styles={{ height: 70, width: 70, borderColor: '#fff', borderWidth: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <TextComponent text={String(seconds)} color={appColors.text} styles={{ height: 30, width: 30, borderColor: '#fff', borderWidth: 1, backgroundColor: '#fff', textAlign: 'center', paddingTop: 5, marginTop: 20 }} />
                                <TextComponent text='Giây' color={appColors.white} styles={{ height: 20 }} />
                            </SectionComponent>
                        </RowComponent>


                    </View>
                ) : <View />
                }

                {

                    (days !== '00' && hours !== '00' && minutes !== '00' && seconds !== '00') ? (
                        <RowComponent styles={{ display: 'flex', gap: 0, marginTop: 0, flexWrap: 'wrap', backgroundColor: appColors.gray3 }}>
                            {products?.map((product: any) => {
                                if (product.discount >= discountEvent) {
                                    return (
                                        <CardItem
                                            key={product._id}
                                            countInStock={product.countInStock}
                                            description={product.description}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            rating={product.rating}
                                            typePro={product.type}
                                            selled={product.selled}
                                            discount={product.discount}
                                            id={product._id}
                                            navigation={navigation}
                                            type="card"

                                        />
                                    )
                                }
                            })}
                        </RowComponent>
                    ) : <View />

                } */}

                        <RowComponent styles={{ display: 'flex', gap: 0, marginTop: 0, flexWrap: 'wrap' }}>
                            {products?.filter((pro: any) => {
                                if (searchDebounce === '') {
                                    return pro
                                } else if (pro?.name?.toLowerCase().includes(searchDebounce?.toLowerCase())) {
                                    return pro
                                }
                            })?.map((product: any) => {
                                return (
                                    <CardItem
                                        key={product._id}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        typePro={product.type}
                                        selled={product.selled}
                                        discount={product.discount}
                                        id={product._id}
                                        navigation={navigation}
                                        type="card"

                                    />
                                )
                            })}
                        </RowComponent>

                        <RowComponent justify='center'>
                            <ButtonComponent
                                text='Xem thêm'
                                type='primary'
                                onPress={() => setLimit((prev) => prev + 4)}
                            />
                        </RowComponent>
                    </ContainerComponent>
                    <LoadingModal visible={isLoading} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
