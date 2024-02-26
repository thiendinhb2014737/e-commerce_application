import { View, Text, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'
import { useNavigation } from '@react-navigation/native';
import { ButtonComponent, RowComponent, TextComponent } from '.';
import { appColors } from '../constants/appColors';
import { ArrowLeft, EyeSlash } from 'iconsax-react-native';
import { fontFamilies } from '../constants/fontFamilies';


interface Props {
    isImageBackground?: boolean,
    isScroll?: boolean,
    title?: string,
    children: ReactNode,
    back?: boolean

}

const ContainerComponent = (props: Props) => {
    const { isImageBackground, isScroll, title, children, back } = props

    const navigation: any = useNavigation()

    const returnContainer = isScroll ?
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>{children}</ScrollView>
        :
        <View style={{ flex: 1 }}>{children}</View>

    const headerComponent = () => {
        return (
            <View style={{ flex: 1, paddingTop: 30 }}>
                {(title || back) && (
                    <RowComponent
                        styles={{
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            minWidth: 48,
                            minHeight: 48,
                            justifyContent: 'flex-start',
                            paddingTop: 50
                        }}>
                        {back && (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ marginRight: 12 }}>
                                <ArrowLeft size={24} color={appColors.text} />
                            </TouchableOpacity>
                        )}
                        {title ? (
                            <TextComponent
                                text={title}
                                size={16}
                                font={fontFamilies.medium}
                                flex={1}
                            />
                        ) : (
                            <></>
                        )}
                    </RowComponent>
                )}
                {returnContainer}
            </View>
        )
    }
    return isImageBackground ? (
        <ImageBackground
            source={require('../assets/images/background.png')}
            style={{ flex: 1 }}
            imageStyle={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                {headerComponent()}
            </SafeAreaView>

        </ImageBackground>
    ) : (
        <SafeAreaView style={[globalStyles.container]}>
            <View>
                {headerComponent()}
            </View>
        </SafeAreaView>
    );
};

export default ContainerComponent