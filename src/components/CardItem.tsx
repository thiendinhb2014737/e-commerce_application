import { View, Text, Dimensions, Image, StyleSheet } from 'react-native'
import React from 'react'
import { CardComponent, RowComponent, SectionComponent, TextComponent } from '.';
import { Star, Star1, StarSlash } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import { convertPrice } from '../utils/validate';

interface Props {
    countInStock: number,
    description: string,
    image: string,
    name: string,
    price: number,
    rating: number,
    typePro: string,
    selled: number,
    discount: number,
    id: string,
    item?: any;
    type: 'list' | 'card';
    onPress?: () => void;
    navigation: any

}

const CardItem = (props: Props) => {
    const { item, type, onPress,
        countInStock, description, image, name, price, rating,
        typePro, selled, discount, id, navigation
    } = props;

    return type === 'card' ? (
        <CardComponent
            styles={{ width: Dimensions.get('window').width * 0.42, height: 230, marginLeft: 17 }}
            onPress={() => {
                navigation.navigate('ProductDetails', {
                    ProductID: id,
                })
            }}
        >
            <Image source={{ uri: image }} style={[localStyles.avatar]} />
            <SectionComponent styles={{ paddingHorizontal: 10, paddingLeft: 0, paddingBottom: 0 }}>
                <TextComponent text={name} styles={{ textAlign: 'center' }} />
                <RowComponent justify='space-around'>
                    <RowComponent>
                        <TextComponent text={String(rating)} styles={{ fontSize: 10, marginRight: 5 }} />
                        <Star1 size={12} color='orange' />
                    </RowComponent>
                    <TextComponent text={`Đã bán ${String(selled)}`} styles={{ fontSize: 10 }} />
                </RowComponent>
                <RowComponent justify='center' >
                    <TextComponent text={`Giá: ${convertPrice(price)}`} styles={{ fontSize: 14 }} />
                    <TextComponent text={` (- ${String(discount)} %)`} styles={{ fontSize: 10 }} />
                </RowComponent>
            </SectionComponent>
        </CardComponent>
    ) : (
        <></>
    );
}

export default CardItem

const localStyles = StyleSheet.create({

    avatar: {
        width: 150,
        height: 150,
        marginBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',

    },

});