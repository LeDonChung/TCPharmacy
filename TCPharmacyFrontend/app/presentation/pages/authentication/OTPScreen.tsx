import { useNavigation } from "@react-navigation/native";
import { Alert, ImageBackground, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { Colors } from "../../styles/Colors";
import { InputOtpCustom } from "../../components/InputOtpCustom";
import { UserRegisterRequest } from "../../../domain/models/request/UserRegisterRequest";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../redux/store";
import { generateOTP, register, setUsertRegister } from "../../redux/slice/UserSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonCustom } from "../../components/ButtonCustom";
import Toast from "react-native-toast-message";
import { showToast } from "../../../api/AppUtils";

export const OTPScreen = () => {
    const navigation = useNavigation();
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [loading, setLoading] = useState(false);
    const errorRespone = useSelector((state: Store) => state.user.errorResponse);
    const [otpSent, setOtpSent] = useState(true);
    const userRegister = useSelector((state: Store) => state.user.userRegister);
    const dispatch = useDispatch();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (otpSent && secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            setOtpSent(false);
        }

        return () => clearInterval(timer); // Dọn dẹp bộ đếm thời gian
    }, [otpSent, secondsLeft]);

    const handlerReOTP = async () => {
        try {
            await dispatch(generateOTP(userRegister.phoneNumber)).unwrap();
            showToast('success', 'bottom', 'Thành công', 'Gửi mã OTP thành công.');
            setSecondsLeft(60);
            setOtpSent(true);
            dispatch(setUsertRegister(new UserRegisterRequest(userRegister.phoneNumber, userRegister.password, ['', '', '', '', '', ''])));
        } catch (error: any) {
            showToast('error', 'bottom', 'Lỗi', errorRespone.error || error || 'Tạo OTP không thành công.');
        }
    };

    const handlerRegister = async () => {
        if (userRegister.otp.filter((value) => value !== '').length === 6) {
            setLoading(true);
            try {
                await dispatch(register(userRegister)).unwrap(); // unwrap để lấy kết quả hoặc lỗi
                navigation.navigate('inapp' as never);
                setUsertRegister(new UserRegisterRequest('', '', ['', '', '', '', '', ''])); // reset lại thông tin đăng ký
            } catch (error) {
                showToast('error', 'bottom', 'Lỗi', errorRespone?.error || error?.message || 'Đăng ký không thành công.');
            } finally {
                setLoading(false);
            }
        } else {
            showToast('error', 'bottom', 'Lỗi', 'Mã OTP không hợp lệ.');
        }
    };

    return (
        <SafeAreaView style={[GlobalStyles.container, styles.container]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.select({ ios: 40, android: 20 })}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
                                        ? (<Text> có hiệu lực trong vòng {`${Math.floor(secondsLeft / 60)} phút ${secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60} giây`} </Text>)
                                        : (
                                            <Pressable onPress={() => { handlerReOTP(); }}>
                                                <Text style={[GlobalStyles.textStyle, { color: Colors.primary }]}>Gửi lại mã</Text>
                                            </Pressable>
                                        )
                                }
                            </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary, marginBottom: 20 }]}>Đổi số điện thoại</Text>
                            </TouchableOpacity>

                            <View style={{ width: '100%' }}>
                                <InputOtpCustom otp={userRegister.otp} setOtp={(text) => {
                                    dispatch(setUsertRegister(new UserRegisterRequest(userRegister.phoneNumber, userRegister.password, text)));
                                }} />
                            </View>
                            <ButtonCustom
                                buttonStyle={{ borderRadius: 30, paddingVertical: 15, width: '100%', marginTop: 100 }}
                                title={loading ? "Đang xử lý..." : "Xác nhận"}
                                disabled={loading}
                                onPress={() => { handlerRegister() }}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 2, justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription, fontWeight: 'regular' }]}>
                            Gửi lại mã OTP cho tôi {secondsLeft > 0 ? `(${secondsLeft} giây)` : '(Hết hạn)'}
                        </Text>
                        <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription }]}>hoặc có thể
                            {' '}
                            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>nhận mã qua Zalo</Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

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
});
