import { View, Text, StatusBar, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../../redux/reducers/authReducer'
import productAPI from '../../apis/productApi'
import { useQuery } from '@tanstack/react-query'
import { appColors } from '../../constants/appColors'
import { globalStyles } from '../../styles/globalStyles'
import { ButtonComponent, CircleComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontFamilies } from '../../constants/fontFamilies'
import CardItem from '../../components/CardItem'
import { LoadingModal } from '../../modals'
import { useLocation } from 'react-router-dom'
import TypeProductComponent from './TypeProductComponent.tsx/TypeProductComponent'
import InputSearchConponent from '../home/InputSearchComponent/InputSearchConponent'
import { useDebounce } from '../../hook/useDebounce'
import ContainerComponent from '../home/ContainerComponent/ContainerComponent'

const TypeProduct = ({ navigation, route }: any) => {
    // const searchProduct = useSelector((state) => state?.product?.search)


    const [limit, setLimit] = useState(4)
    const [isLoading, setIsLoading] = useState(false)

    const { state }: { state: string } = route.params
    const [productType, setProductType] = useState([])
    const [typeProduct, setTypeProduct] = useState([])
    const [search, setSearch] = useState('')
    const [inputSearch, setInputSearch] = useState('')

    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 4,
        total: 1
    })
    // console.log(state)
    console.log(inputSearch)

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit, inputSearch)
        }
    }, [state, panigate.page, panigate.limit, inputSearch])


    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    const fetchAllTypeProduct = async () => {
        const api = `/get-all-type`;
        const res = await productAPI.HandleProduct(api, 'get')
        setTypeProduct(res?.data)
    }

    const fetchProductType = async (type: any, page: any, limit: any, inputSearch: string) => {

        if (inputSearch?.length > 0) {
            setIsLoading(true)
            const api = `/get-all?limit=${limit}&filter=name&filter=${inputSearch}&sort=desc&sort=createdAt`;
            const res = await productAPI.HandleProduct(api, { limit }, 'get')
            setIsLoading(false)
            setProductType(res?.data)
        } else {
            setIsLoading(true)
            const api = `/get-all?filter=type&filter=${type}&limit=${limit}&sort=desc&sort=createdAt`;
            const res = await productAPI.HandleProduct(api, { limit }, 'get')
            setIsLoading(false)
            setProductType(res?.data)
        }
    }

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
                    <SpaceComponent height={24} />
                </View>
            </View>

            <ContainerComponent isImageBackground isScroll>

                <RowComponent justify='center' styles={{ gap: 20 }} >
                    {typeProduct?.map((item) => {
                        return (
                            <TypeProductComponent name={item} key={item} navigation={navigation} />
                        )
                    })}
                </RowComponent>

                <RowComponent styles={{ display: 'flex', gap: 5, marginTop: 20, flexWrap: 'wrap' }}>
                    {productType?.map((product: any) => {
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

export default TypeProduct