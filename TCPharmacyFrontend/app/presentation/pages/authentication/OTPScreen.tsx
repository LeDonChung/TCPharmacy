import { useNavigation } from "@react-navigation/native"
import { Alert, ImageBackground, KeyboardAvoidingView, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { GlobalStyles } from "../../styles/GlobalStyles"
import { Colors } from "../../styles/Colors"
import { InputOtpCustom } from "../../components/InputOtpCustom"
import { UserRegisterRequest } from "../../../domain/models/request/UserRegisterRequest"
import { useDispatch, useSelector } from "react-redux"
import { Store } from "../../redux/store"
import { generateOTP, register, setUsertRegister } from "../../redux/slice/UserSlice"
import { SafeAreaView } from "react-native-safe-area-context"
import { ButtonCustom } from "../../components/ButtonCustom"
import Toast from "react-native-toast-message"
import { showToast } from "../../../api/AppUtils"

export const OTPScreen = () => {
    const navigation = useNavigation()
    const [secondsLeft, setSecondsLeft] = useState(5);
    const errorRespone = useSelector((state: Store) => state.user.errorResponse);
    const [otpSent, setOtpSent] = useState(true);
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

    const handlerReOTP = async () => {
        dispatch(generateOTP(userRegister.phoneNumber)).unwrap().catch((error: any) => {
            showToast('error', 'bottom', 'Lỗi', errorRespone.error || error|| 'Tạo OTP không thành công.');
            return;
        });

        showToast('success', 'bottom', 'Thành công', 'Gửi mã OTP thành công.');
        dispatch(setUsertRegister(new UserRegisterRequest(userRegister.phoneNumber, userRegister.password, ['', '', '', '', '', ''])));

        setSecondsLeft(5);
        setOtpSent(true);

    }
    const handlerRegister = async () => {

        if (userRegister.otp.filter((value) => value !== '').length === 6) {
            dispatch(register(userRegister)).unwrap().catch((error: any) => {
                showToast('error', 'bottom', 'Lỗi', errorRespone.error || error||  'Đăng nhập không thành công.');
                return;
            });


            setOtpSent(false);
            dispatch(setUsertRegister(new UserRegisterRequest(userRegister.phoneNumber, userRegister.password, ['', '', '', '', '', ''])));

            navigation.navigate('inapp' as never);
        } else {
            setOtpSent(false);
            showToast('error', 'bottom', 'Lỗi', 'Mã OTP không hợp lệ.');
        }
    }
    return (
        <SafeAreaView style={[GlobalStyles.container, styles.container]}>
            <ImageBackground source={require('../../../../assets/otp_background.png')} resizeMode="contain" style={{ height: 300 }} />
            <View style={{ flex: 6 }}>
                <View style={styles.otpContent}>

                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>Nhập mã xác thực</Text>
                    <Text style={[GlobalStyles.textStyle, { textAlign: 'center', marginVertical: 20, alignItems: 'center', justifyContent: 'center' }]}>
                        Mã xác thực được gửi đến số điện thoại
                        {' '}
                        <Text style={{ fontWeight: 'bold' }}>0867713557</Text>
                        {' '}
                        {
                        otpSent
                            ?
                            (<Text> có hiệu lực trong vòng {`${Math.floor(secondsLeft / 60)} phút ${secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60} giây`} </Text>)
                            :
                            (
                            <Pressable onPress={() => {handlerReOTP();}}>
                                <Text style={[GlobalStyles.textStyle, { color: Colors.primary }]}>Gửi lại mã</Text>
                            </Pressable>
                            )
                        }

                    </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary, marginBottom: 20 }]}>Đổi số điện thoại</Text>
                    </TouchableOpacity>

                    <View style={{ width: '100%' }}>
                        <InputOtpCustom otp={userRegister.otp} setOtp={(text) => {dispatch(setUsertRegister(new UserRegisterRequest(userRegister.phoneNumber, userRegister.password, text)));
 }} />
                    </View>
                    <ButtonCustom
                        buttonStyle={{ borderRadius: 30, paddingVertical: 15, width: '100%', marginTop: 100 }}
                        title={"Xác nhận"}
                        onPress={() => { handlerRegister() }}
                    />
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
        </SafeAreaView>
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