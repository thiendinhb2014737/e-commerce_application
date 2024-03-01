import { View, Text, TextInput, StyleSheet, KeyboardType, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../../../styles/globalStyles';
import { appColors } from '../../../constants/appColors';

interface Props {
    value?: string;
    onChange: (val: string) => void;
    placeholder?: string;
    type?: KeyboardType;
    onEnd?: () => void,
    styles?: StyleProp<ViewStyle>;

}
const InputSearchConponent = (props: Props) => {
    const {
        value,
        onChange,
        placeholder,
        type,
        onEnd
    } = props;
    return (
        <View style={[styles.inputContainer]}>
            <TextInput
                style={[styles.input, globalStyles.text]}
                value={value}
                placeholder={placeholder}
                onChangeText={val => onChange(val)}
                autoCapitalize='none'
                keyboardType={type ?? 'default'}
                onEndEditing={onEnd}
            />
        </View>
    )
}

export default InputSearchConponent
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gray3,
        width: 330,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: appColors.white,
        marginBottom: 10,
    },

    input: {
        flex: 1,
        paddingHorizontal: 8,
        color: appColors.text,
    },
});