import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { GlobalStyles } from '../styles/GlobalStyles';
type InputOtpCustomProps = {
    otp: string[],
    setOtp: (otp: string[]) => void
}
export const InputOtpCustom = (props: InputOtpCustomProps) => {
    let inputs = useRef<any[]>([]).current;

    const handlerOtp = (index: number, value: string) => {
        if(value.length == 2) 
            value = value[1];

        const newOtp = [...props.otp]
        newOtp[index] = value;
        props.setOtp(newOtp);

        // Nếu value không rỗng và index < otp.length - 1 thì focus ô tiếp theo
        if (value.length === 1 && index < props.otp.length - 1) {
            inputs[index + 1].focus();  // Focus ô tiếp theo
        }
    }
    return (
        <View style={styles.container}>
            {props.otp.map((value, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => inputs[index] = ref}
                    style={[styles.input, value ? styles.inputActive : styles.inputInactive, GlobalStyles.textStyle]}
                    maxLength={2} // 1 ký tự số
                    keyboardType="numeric"
                    value={value}
                    onChangeText={(value) => handlerOtp(index, value)}

                />
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
    },
    inputActive: {
        borderColor: '#0000ff', // Màu khi ô được chọn
    },
    inputInactive: {
        borderColor: '#d3d3d3', // Màu khi ô không được chọn
    },
});