import { View, Text, StatusBar, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { CardComponent, CircleComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { TouchableOpacity } from 'react-native'
import { HambergerMenu, Notification } from 'iconsax-react-native'
import { fontFamilies } from '../../constants/fontFamilies'
import ContainerComponent from '../home/ContainerComponent/ContainerComponent'
import { Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux'
import { orderSelector } from '../../redux/reducers/orderReducer'
import { authSelector } from '../../redux/reducers/authReducer'
import { addloveProProduct, loveProSelector, removeloveProProduct } from '../../redux/reducers/loveProReducer'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { convertPrice } from '../../utils/validate'
const MyLoveScreen = ({ navigation }: any) => {
    const lovePro = useSelector(loveProSelector)
    const [listLovePro, setListLovePro] = useState('')
    const dispatch = useDispatch()
    const { getItem } = useAsyncStorage('lovePro');

    const handleDeleteLovePro = (idProduct: any) => {
        dispatch(removeloveProProduct({ idProduct }))
    }
    // useEffect(() => {
    //     checkLovePro();
    //     const timeout = setTimeout(() => {
    //     }, 1500)
    //     return () => clearTimeout(timeout)
    // }, [])
    // const checkLovePro = async () => {
    //     const res = await getItem();
    //     console.log('first.///-------', res)
    //     //setListLovePro(res)
    //     //note
    //     //res && dispatch(addloveProProduct(JSON.parse(res)));
    // };
    const newArrayListLovePro = lovePro?.loveProItems.slice().reverse();

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

                <CardComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent text={`Tất cả (${lovePro?.loveProItems?.length - 1} sản phẩm)`} />
                    </RowComponent>
                </CardComponent>


                {newArrayListLovePro?.map((item: any) => {
                    if (item?.product !== '') {
                        return (
                            <CardComponent key={item?.product} >
                                <RowComponent justify='space-between' >
                                    <SectionComponent>
                                        {item?.image ?
                                            (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigation.navigate('ProductDetails', {
                                                            ProductID: item?.product,
                                                        })
                                                    }}>
                                                    <Image source={{ uri: item?.image }} style={{ width: 70, height: 70 }} />
                                                </TouchableOpacity>
                                            )
                                            : (
                                                <View>
                                                </View>
                                            )
                                        }
                                    </SectionComponent>
                                    <Text style={{ fontSize: 12, width: 80 }} numberOfLines={1} ellipsizeMode='tail'>{item?.name}</Text>
                                    <TextComponent text={`Giá: ${convertPrice(item?.price)}`} styles={{ fontSize: 14 }} />
                                    <AntDesign name='delete' color={appColors.text} size={18} onPress={() => handleDeleteLovePro(item?.product)} />
                                </RowComponent>
                            </CardComponent>

                        )
                    }
                })}

            </ContainerComponent>

        </View>
    )
}

export default MyLoveScreen
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