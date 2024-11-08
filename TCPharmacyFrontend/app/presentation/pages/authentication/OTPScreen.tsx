import { useNavigation } from "@react-navigation/native"
import { ImageBackground, KeyboardAvoidingView, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { GlobalStyles } from "../../styles/GlobalStyles"
import { Colors } from "../../styles/Colors"
import { InputOtpCustom } from "../../components/InputOtpCustom"
import { UserRegisterRequest } from "../../../domain/models/request/UserRegisterRequest"
import { useDispatch, useSelector } from "react-redux"
import { Store } from "../../redux/store"
import { register, setUsertRegister } from "../../redux/slice/UserSlice"

export const OTPScreen = () => {
    const navigation = useNavigation()
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [otpSent, setOtpSent] = useState(true);
    const [otp, setOtp] = React.useState<string[]>(['', '', '', '', '', '']);
    const userRegister = useSelector((state: Store) => state.user.userRegister);
    const dispatch = useDispatch();
    useEffect(() => {
        if (otpSent && secondsLeft > 0) {
            const timer = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer); // Dọn dẹp bộ đếm thời gian
        } else if (secondsLeft === 0) {
            setOtpSent(false);
        }
    }, [otpSent, secondsLeft]);
    useEffect(() => {
        const handlerRegister = async () => {
            if (otp.filter((value) => value !== '').length === 6) {
                await dispatch(setUsertRegister(new UserRegisterRequest(userRegister.phoneNumber, userRegister.password, parseInt(otp.join('')))));
                const response = dispatch(register(userRegister));

                // if (response.meta.requestStatus === 'fulfilled') {
                //     navigation.navigate('otp' as never);
                // } else {
                // }
            }
        }
        handlerRegister();

    }, [otp]);
    return (
        <KeyboardAvoidingView style={[GlobalStyles.container, styles.container]}>
            <ImageBackground source={require('../../../../assets/otp_background.png')} resizeMode="contain" style={{ height: 300 }} />
            <View style={{ flex: 6 }}>
                <View style={styles.otpContent}>

                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>Nhập mã xác thực</Text>
                    <Text style={[GlobalStyles.textStyle, { textAlign: 'center', lineHeight: 25, marginVertical: 20 }]}>
                        Mã xác thực được gửi đến số điện thoại
                        {' '}
                        <Text style={{ fontWeight: 'bold' }}>0867713557</Text>
                        {' '}
                        {otpSent
                            ?
                            (<Text> có hiệu lực trong vòng {`${Math.floor(secondsLeft / 60)} phút ${secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60} giây`} </Text>)
                            :
                            (<Pressable onPress={() => {
                                setOtpSent(true);
                                setSecondsLeft(120);
                            }}>
                                <Text style={{ color: Colors.primary }}>Gửi lại mã</Text>
                            </Pressable>)
                        }

                    </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary, marginBottom: 20 }]}>Đổi số điện thoại</Text>
                    </TouchableOpacity>

                    <View style={{ width: '100%' }}>
                        <InputOtpCustom otp={otp} setOtp={setOtp} />
                    </View>
                </View>
            </View>

            <View style={{ flex: 2, justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription, fontWeight: 'regular' }]}>Gửi lại mã OTP cho tôi ({secondsLeft})</Text>
                <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription }]}>hoặc có thể
                    {' '}
                    <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>nhận mã qua Zalo</Text>
                    {' '}
                </Text>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 0
    },
    otpContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -40,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})