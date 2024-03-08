import { View, Text, Button, StatusBar, Platform, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { authReducer, authSelector, removeAuth } from '../../redux/reducers/authReducer'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { ButtonComponent, CardComponent, CategoriesList, CircleComponent, EventItem, RowComponent, SectionComponent, SpaceComponent, TagBarComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification, SearchNormal1, Sort, Star } from 'iconsax-react-native'
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



    const fetchAllTypeProduct = async () => {
        const api = `/get-all-type`;
        const res = await productAPI.HandleProduct(api, 'get')
        setTypeProduct(res?.data)
    }

    const fetchProductAll = async (context: any) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        if (search?.length > 0) {
            setIsLoading(true)
            const api = `/get-all?limit=${limit}&filter=name&filter=${search}&sort=desc&sort=createdAt`;
            const res = await productAPI.HandleProduct(api, { limit, search }, 'get')
            setIsLoading(false)
            return res.data
        } else {
            setIsLoading(true)
            const api = `/get-all?limit=${limit}&sort=desc&sort=createdAt`;
            const res = await productAPI.HandleProduct(api, { limit }, 'get')
            setIsLoading(false)
            return res.data
        }

    }

    const { data: products, isPlaceholderData } = useQuery({
        queryKey: ['products', limit, searchDebounce],
        queryFn: fetchProductAll,
    })


    useEffect(() => {
        fetchProductAll
        fetchAllTypeProduct()
    }, [])

    const onSearch = () => {
        setInputSearch(search)
    }


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
                style={{
                    width: 600,
                    height: 80,
                    marginBottom: 10,
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

                <RowComponent styles={{ display: 'flex', gap: 5, marginTop: 20, flexWrap: 'wrap' }}>
                    {products?.map((product: any) => {
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
                        onPress={() => setLimit((prev) => prev + 2)}
                    />
                </RowComponent>
            </ContainerComponent>
            <LoadingModal visible={isLoading} />
        </View>
    )
}

export default HomeScreen