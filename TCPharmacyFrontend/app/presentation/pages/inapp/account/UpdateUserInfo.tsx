import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import { Colors } from "../../../styles/Colors";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { ButtonCustom } from "../../../components/ButtonCustom";
import { RadioButton, TextInput } from "react-native-paper";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const user = {
    name: "TRAN THI THANH TUYEN",
    phone: "0396 172 224",
    gender: "",
    dob: null,
    image: require("./../../../../../assets/imgAccountScreen/avt.png")
}

export const UpdateUserInfo = () => {

    const [datePickerVisibility, setDatePickerVisibility] = useState(false);

    // Hàm để hiển thị Date Picker
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    // Hàm để ẩn Date Picker
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // Hàm xử lý khi chọn ngày xong
    const handleConfirm = (selectedDate:any) => {
        const currentDate = selectedDate || new Date();
        const formattedDate = currentDate.toLocaleDateString(); // Định dạng ngày tháng năm
        setUserInfo({ ...userInfo, dob: formattedDate });
        // setDate(formattedDate);
        hideDatePicker();
    };

    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(user);
    const [isEdit, setIsEdit] = useState(false);

    //Xu ly chon anh dai dien moi
    const handleChangeAvatar = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.assets && response.assets.length > 0) {
                const source = response.assets[0].uri;
                setUserInfo({ ...userInfo, image: { uri: source } });
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ height: 70, width: '100%', backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => { navigation.goBack() }}>
                    <IconF5 name="chevron-left" size={30} style={{ color: Colors.secondary, }} />
                </TouchableOpacity>
                <Text style={[GlobalStyles.textStyle, { fontSize: 18, fontWeight: '700', color: Colors.secondary, textAlign: 'center', width: "80%" }]}>Thông tin cá nhân</Text>
            </View>

            <View style={{ height: 200, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                <Image source={userInfo.image} style={{ width: 100, height: 100, borderRadius: 50 }} />
                <TouchableOpacity onPress={handleChangeAvatar}>
                    <Text style={[GlobalStyles.textStyle, { color: Colors.primary, fontSize: 16, fontWeight: '700', marginTop: 10 }]}>Thay đổi ảnh đại diện</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                label="Họ và tên"
                value={userInfo.name}
                onChangeText={text => setUserInfo({ ...userInfo, name: text })}
                // mode="outlined" // tạo border cho TextInput
                style={{ fontSize: 16, width: "95%", marginHorizontal: 'auto', height: 60, backgroundColor: '#fff', borderWidth: 1, borderRadius: 8, borderColor: '#c4c4c4', fontWeight: '700', marginVertical: 15 }} // tuỳ chỉnh font chữ bên trong
                theme={{
                    colors: {
                        primary: Colors.primary, // màu viền khi chọn vào input
                        text: '#000', // màu chữ
                    },
                }}

            />

            <View style={{ width: "95%", marginHorizontal: 'auto', height: 60, }}>
                <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription, fontWeight: '700' }]}>Giới tính</Text>

                <RadioButton.Group onValueChange={value => setUserInfo({ ...userInfo, gender: value })} value={userInfo.gender !== "" ? userInfo.gender : "Nam"}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <RadioButton value="Nam" color="#007AFF" />
                            <Text style={[GlobalStyles.textStyle, {fontWeight: '700'}]}>Nam</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 20
                        }}>
                            <RadioButton value="Nữ" color="#007AFF" />
                            <Text style={[GlobalStyles.textStyle, {fontWeight: '700'}]}>Nữ</Text>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>

            <TextInput
                label="Số điện thoại"
                editable={true}
                value={userInfo.phone}
                onChangeText={text => setUserInfo({ ...userInfo, name: text })}
                // mode="outlined" // tạo border cho TextInput
                style={{ fontSize: 16, width: "95%", marginHorizontal: 'auto', height: 60, backgroundColor: '#DEE1E3', borderWidth: 1, borderRadius: 8, borderColor: '#c4c4c4', fontWeight: '700', marginVertical: 15 }} // tuỳ chỉnh font chữ bên trong
                theme={{
                    colors: {
                        primary: Colors.primary, // màu viền khi chọn vào input
                        text: '#000', // màu chữ
                    },
                }}

            />

            <View>
            <TextInput
                value={userInfo.dob === null ? "Ngày sinh" : userInfo.dob}
                mode="outlined"
                editable={false} // Đặt thành không thể chỉnh sửa
                style={{fontSize: 16, width: "95%", marginHorizontal: 'auto', height: 60, backgroundColor: '#fff', borderWidth: 1, borderRadius: 8, borderColor: '#c4c4c4', fontWeight: '700', marginVertical: 15}}
                right={
                    <TextInput.Icon
                        icon="calendar"
                        onPress={showDatePicker}
                    />
                }
            />
            <DateTimePickerModal
                isVisible={datePickerVisibility}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            </View>


            <ButtonCustom title="Cập nhật thông tin" onPress={() => { navigation.goBack() }}
                buttonStyle={{ margin: 20, borderRadius: 30, paddingVertical: 15, backgroundColor: Colors.primary, position: 'absolute', bottom: 0, width: '90%', alignSelf: 'center' }}
                textStyle={{ color: Colors.secondary, fontSize: 16, fontWeight: '700' }}
            />
        </SafeAreaView>
    )
}