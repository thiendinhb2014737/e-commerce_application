import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import Swiper from 'react-native-swiper'
import { appInfo } from '../../constants/appInfos'
import { appColors } from '../../constants/appColors'
import { TextComponent } from '../../components'
import { fontFamilies } from '../../constants/fontFamilies'


const OnBroadingScreen = ({ navigation }: any) => {

    const [index, setIndex] = useState(0)

    return (
        <View style={[globalStyles.container]}>
            <Swiper
                style={{}}
                loop={false}
                onIndexChanged={num => setIndex(num)}
                index={index}
                activeDotColor={appColors.text}>
                <Image source={require('../../assets/images/ad1.png')} style={{ flex: 1, width: appInfo.size.WIDTH, height: appInfo.size.HEIGHT, resizeMode: 'contain' }} />
                <Image source={require('../../assets/images/ad2.png')} style={{ flex: 1, width: appInfo.size.WIDTH, height: appInfo.size.HEIGHT, resizeMode: 'contain' }} />
                <Image source={require('../../assets/images/ad3.png')} style={{ flex: 1, width: appInfo.size.WIDTH, height: appInfo.size.HEIGHT, resizeMode: 'contain' }} />
            </Swiper>
            <View style={{
                paddingHorizontal: 16,
                paddingVertical: 20,
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <TextComponent text='Skip' color={appColors.gray} font={fontFamilies.medium} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')}>
                    <TextComponent text='Next' color={appColors.text} font={fontFamilies.medium} />
                </TouchableOpacity>
            </View>
        </View>
    )


}

export default OnBroadingScreen
const styles = StyleSheet.create({
    text: {
        color: appColors.text,
        fontSize: 18,
        fontWeight: '500'
    }
})