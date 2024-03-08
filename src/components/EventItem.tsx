import { View, Text, Dimensions, Image } from 'react-native';
import React from 'react';
import { CardComponent, TextComponent } from '.';

interface Props {
    item: any;
    type: 'list' | 'card';
    onPress?: () => void;
}
const EventItem = (props: Props) => {
    const { item, type, onPress } = props;
    console.log('item', item)
    return type === 'card' ? (
        <CardComponent styles={{ width: Dimensions.get('window').width * 0.6 }}>
            <TextComponent
                numberOfLine={1}
                title
                size={18}
                text="International Band Music Concert"
            />
            <Image
                source={require('../assets/images/Logo_trongsuot.png')}
                style={{
                    width: 180,
                    height: 180,
                    marginBottom: 30,
                }}
            />
        </CardComponent>

    ) : (
        <></>
    );

}

export default EventItem