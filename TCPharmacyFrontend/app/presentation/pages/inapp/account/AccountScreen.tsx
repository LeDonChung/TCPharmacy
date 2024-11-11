import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Colors } from "../../../styles/Colors"
import IconF from "react-native-vector-icons/FontAwesome"
import IconMas from "react-native-vector-icons/MaterialCommunityIcons"
import { GlobalStyles } from "../../../styles/GlobalStyles"
import * as SecureStore from 'expo-secure-store';
const stausOrder = [
    {
        id: 1,
        name: "Đang xử lý",
        image: require("./../../../../../assets/imgAccountScreen/DangXuLy.png")
    },
    {
        id: 2,
        name: "Đang giao",
        image: require("./../../../../../assets/imgAccountScreen/DangGiao.png")
    },
    {
        id: 3,
        name: "Đã giao",
        image: require("./../../../../../assets/imgAccountScreen/DaGiao.png")
    },
    {
        id: 4,
        name: "Đổi trả",
        image: require("./../../../../../assets/imgAccountScreen/DoiTra.png")
    }

]

const switchAccount = [
    {
        id: 1,
        name: "Mã QR của tôi",
        image: require("./../../../../../assets/imgAccountScreen/qr.png"),
        navigateName : "MyQrScreen"
    },
    {
        id: 2,
        name: "Thông tin cá nhân",
        image: require("./../../../../../assets/imgAccountScreen/user.png"),
        navigateName : "UserInfo"
    },
    {
        id: 3,
        name: "Quán lý sổ địa chỉ",
        image: require("./../../../../../assets/imgAccountScreen/location.png"),
        navigateName : "LocationScreen"
    },
    {
        id: 5,
        name: "Đơn thuốc của tôi",
        image: require("./../../../../../assets/imgAccountScreen/check-list.png"),
        navigateName : "MedicineOrderScreen"
    }
]

const user = {
    name: "TRAN THI THANH TUYEN", 
    phone: "0396 172 224", 
    gender: "Female", 
    dob: null,
    image: ""
}

export const AccountScreen = () => {
    const navigation = useNavigation()
    const [account, setAccount] = useState(user)



    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ width: "100%", height: 80, backgroundColor: Colors.primary, flexDirection: "row", alignItems: 'center' }}>
                    <IconF name="user-circle-o" size={50} color={"#fff"} style={{ marginHorizontal: 20 }} />
                    <View style={{}}>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{account.name}</Text>
                        <Text style={{ color: "#fff", fontSize: 16 }}>{account.phone}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', width: "95%", height: 25, marginHorizontal: 'auto', marginVertical: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[GlobalStyles.textStyle, { fontWeight: '700', color: Colors.textDecription, fontSize: 18 }]}>Đơn của tôi</Text>
                    <TouchableOpacity>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: '700', color: Colors.primary, fontSize: 18 }]}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: "95%", height: 100, marginHorizontal: 'auto', backgroundColor: "#fff", marginVertical: 10, borderRadius: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <FlatList
                        data={stausOrder}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ width: "25%", marginHorizontal: 'auto', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Image source={item.image} style={{ width: 40, height: 40 }} />
                                <Text style={[GlobalStyles.textStyle, { fontSize: 14, fontWeight: 'bold' }]}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        numColumns={4}
                    />
                </View>
                <Text style={[GlobalStyles.textStyle, { fontWeight: '700', color: Colors.textDecription, fontSize: 18, marginHorizontal: 10 }]}>Tài khoản</Text>
                <View style={{ width: "95%", marginHorizontal: 'auto', height: 300, backgroundColor: '#fff', marginVertical: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <FlatList
                        data={switchAccount}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 5, justifyContent: 'space-between' }}
                                onPress={() => {navigation.navigate(item.navigateName as never)}}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: "75%" }} >
                                    <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={item.image} style={{ marginHorizontal: 15 }} />
                                    </View>
                                    <Text style={[GlobalStyles.textStyle, { fontSize: 16, fontWeight: '500', marginHorizontal: 10 }]}>{item.name}</Text>
                                </View>
                                <IconMas name="chevron-right" size={40} color={Colors.desciption} style={{ marginHorizontal: 15, marginVertical: 10 }} />
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 10, left: 100 }} onPress={async () => {
                    const token = await SecureStore.getItemAsync('token');
                    if(token) {
                        SecureStore.deleteItemAsync('token');
                    }
                    navigation.reset({ index: 0, routes: [{ name: 'authentication' as never }] })
                }}>
                    <IconMas name="logout" size={40} color={Colors.desciption} style={{ marginHorizontal: 15, marginVertical: 10 }} />
                    <Text style={[GlobalStyles.textStyle, { fontSize: 14, fontWeight: '700' }]}>Đăng xuất</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}