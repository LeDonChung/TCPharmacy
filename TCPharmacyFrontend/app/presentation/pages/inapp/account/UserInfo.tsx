import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../styles/Colors";
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { ButtonCustom } from "../../../components/ButtonCustom";
import { launchImageLibrary } from "react-native-image-picker";

const user = {
    name: "TRAN THI THANH TUYEN",
    phone: "0396 172 224",
    gender: null,
    dob: null,
    image: require("./../../../../../assets/imgAccountScreen/avt.png")
}

export const UserInfo = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(user);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: undefined
        });
    }, [navigation]);

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

            <View style={{ height: 60, width: "95%", marginHorizontal: 'auto', borderBottomWidth: 1, borderColor: "#C4C4C4", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[GlobalStyles.textStyle, { fontSize: 16, fontWeight: '700', color: Colors.textDecription }]}>Họ và tên</Text>
                <Text style={[GlobalStyles.textStyle, { fontSize: 16, fontWeight: '700', color: "#000" }]}>{userInfo.name}</Text>
            </View>
            <View style={{ height: 60, width: "95%", marginHorizontal: 'auto', borderBottomWidth: 1, borderColor: "#C4C4C4", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[GlobalStyles.textStyle, { fontSize: 16, fontWeight: '700', color: Colors.textDecription }]}>Số điện thoại</Text>
                <Text style={[GlobalStyles.textStyle, { fontSize: 16, fontWeight: '700', color: "#000" }]}>{userInfo.phone}</Text>
            </View>
            <View style={{ height: 60, width: "95%", marginHorizontal: 'auto', borderBottomWidth: 1, borderColor: "#C4C4C4", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[GlobalStyles.textStyle, { fontSize: 16, fontWeight: '700', color: Colors.textDecription }]}>Giới tính</Text>
                <Text style={[GlobalStyles.textStyle, { fontSize: 16, fontWeight: '700', color: userInfo.gender === null ? Colors.primary : "#000" }]}>
                    {
                        userInfo.gender === null ? "Thêm thông tin" : userInfo.gender
                    }
                </Text>
            </View>
            <View style={{ height: 60, width: "95%", marginHorizontal: 'auto', borderBottomWidth: 1, borderColor: "#C4C4C4", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[GlobalStyles.textStyle, { fontSize: 16, fontWeight: '700', color: Colors.textDecription }]}>Ngày sinh</Text>
                <Text style={[GlobalStyles.textStyle, { fontSize: 16, fontWeight: '700', color: userInfo.dob === null ? Colors.primary : "#000" }]}>
                    {
                        userInfo.dob === null ? "Thêm thông tin" : userInfo.dob
                    }</Text>
            </View>

            <ButtonCustom title="Chỉnh sửa thông tin" onPress={() => { navigation.navigate("UpdateUserInfo" as never) }}
                buttonStyle={{ margin: 20, borderRadius: 30, paddingVertical: 15, backgroundColor: "#E7ECF9", position: 'absolute', bottom: 0, width: '90%', alignSelf: 'center' }}
                textStyle={{ color: Colors.primary, fontSize: 16, fontWeight: '700' }}
            />
        </SafeAreaView>
    );
}