import { View, Text, TextInput, StyleSheet, KeyboardType } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../../../styles/globalStyles';
import { appColors } from '../../../constants/appColors';

interface Props {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    type?: KeyboardType;


}

const InputFormConponent = (props: Props) => {
    const {
        value,
        onChange,
        placeholder,
        type,
    } = props;
    return (
        <View style={[styles.inputContainer]}>
            <TextInput
                style={[styles.input, globalStyles.text]}
                value={value}
                onChangeText={val => onChange(val)}
                autoCapitalize='none'
                keyboardType={type ?? 'default'}
            />
        </View>
    )
}

export default InputFormConponent
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gray3,
        width: '100%',
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: appColors.white,
        marginBottom: 19,
    },

    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 14,
        color: appColors.text,
    },
});