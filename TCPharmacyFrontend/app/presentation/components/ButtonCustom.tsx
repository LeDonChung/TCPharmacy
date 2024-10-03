import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../styles/Colors"
import React from "react"

/**
 * ButtonCustomProps
 * Lưu ý những props nào không có dấu ? là bắt buộc phải truyền vào
 * @param title: string | any - Tiêu đề của button
 * @param onPress: () => void | any - Hàm xử lý khi click vào button
 * @param leadingIcon?: any - Icon ở trước text
 * @param trailingIcon?: any - Icon ở sau text
 * @param buttonStyle?: any - Style của button
 * @param textStyle?: any - Style của text
 * @param iconStyle?: any - Style của icon
 * @returns 
 */
type ButtonCustomProps = {
    title: string | any, 
    onPress : () => void | any, 
    leadingIcon? : any, 
    trailingIcon? : any, 
    buttonStyle? : any, 
    textStyle? : any, 
    iconStyle? : any,
}
export const ButtonCustom = (props: ButtonCustomProps) => {
    return (
        <TouchableOpacity
            style={[styles.buttonDefault, props.buttonStyle]} 
            onPress={props.onPress} 
        >
            <View style={styles.buttonContent}>
                {/* Leading Icon nếu có  */}
                { props.leadingIcon && (
                    props.leadingIcon
                )}

                {/* T button text */}
                <Text style={[styles.buttonText, props.textStyle]}>
                    {props.title}
                </Text>

                {/* Trailing Icon nếu có và không ở trạng thái loading */}
                { props.trailingIcon && (
                    props.trailingIcon
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonDefault: {
        backgroundColor: Colors.primary,  // Màu nền mặc định
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginHorizontal: 5,  // Khoảng cách giữa icon và text
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
})