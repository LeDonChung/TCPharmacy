import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../styles/Colors"

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