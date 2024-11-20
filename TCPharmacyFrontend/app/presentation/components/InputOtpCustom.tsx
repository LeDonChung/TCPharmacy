import React, { useRef } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

type InputOtpCustomProps = {
    otp: string[],
    setOtp: (otp: string[]) => void
}

export const InputOtpCustom = (props: InputOtpCustomProps) => {
    let inputs = useRef<any[]>([]).current;

    const handlerOtp = (index: number, value: string) => {
        // Chỉ giữ lại ký tự cuối cùng nếu người dùng nhập nhiều hơn 1 ký tự
        if (value.length > 1) {
            value = value[value.length - 1];
        }

        // Cập nhật giá trị OTP
        const newOtp = [...props.otp];
        newOtp[index] = value;
        props.setOtp(newOtp);

        // Nếu giá trị nhập vào không rỗng và chưa phải ô cuối cùng, focus vào ô tiếp theo
        if (value.length === 1 && index < props.otp.length - 1) {
            inputs[index + 1].focus();
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (props.otp[index] === '' && index > 0) {
                // Nếu ô hiện tại không có ký tự và nhấn Backspace -> focus về ô trước
                inputs[index - 1].focus();
                const newOtp = [...props.otp];
                newOtp[index - 1] = ''; // Xóa giá trị của ô trước
                props.setOtp(newOtp);
            } else if (props.otp[index] !== '') {
                // Nếu ô hiện tại có ký tự và nhấn Backspace -> xóa ký tự trong ô
                const newOtp = [...props.otp];
                newOtp[index] = '';
                props.setOtp(newOtp);
            }
        }
    }

    return (
        <View style={styles.container}>
            {props.otp.map((value, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => inputs[index] = ref}
                    style={[styles.input, value ? styles.inputActive : styles.inputInactive, GlobalStyles.textStyle]}
                    maxLength={1} // Giới hạn 1 ký tự số
                    keyboardType="numeric"
                    value={value}
                    onChangeText={(value) => handlerOtp(index, value)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                />
            ))}
        </View>
    );
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
