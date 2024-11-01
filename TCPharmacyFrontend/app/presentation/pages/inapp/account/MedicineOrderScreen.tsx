import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { Colors } from "../../../styles/Colors";
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import { ButtonCustom } from "../../../components/ButtonCustom";

const statusOrder = [
    {
        id: 1,
        title: "Tất cả"
    },
    {
        id: 2,
        title: "Chờ tư vấn"
    },
    {
        id: 3,
        title: "Đã tư vấn"
    },
    {
        id: 4,
        title: "Chưa thể liên hệ"
    }
]

export const MedicineOrderScreen = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(statusOrder[0].id);
    // Hide tab bar
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#C6D5DD' }}>
            <View style={{ height: 70, width: '100%', backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity style={{}} onPress={() => { navigation.goBack() }}>
                    <IconF5 name="chevron-left" size={30} style={{ color: Colors.secondary, }} />
                </TouchableOpacity>
                <Text style={[GlobalStyles.textStyle, { fontSize: 18, fontWeight: '700', color: Colors.secondary, }]}>Đơn hàng của tôi</Text>

                <TouchableOpacity style={{}} onPress={() => { navigation.goBack() }}>
                    <IconF5 name="home" size={30} style={{ color: Colors.secondary, }} />
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%", height: 45, backgroundColor: "#fff", flexDirection: 'row' }}>
                {
                    statusOrder.map((item, index) => {
                        return (
                            <TouchableOpacity style={{
                                height: 45, width: "20%", justifyContent: 'center',
                                alignItems: 'center', marginHorizontal: "auto", borderRadius: 5,
                                borderBottomWidth: selected === item.id ? 2 : 0, borderColor: selected === item.id ? Colors.primary : "#fff"
                            }}
                                onPress={() => { setSelected(item.id) }}>
                                <Text style={[GlobalStyles.textStyle, { color: selected === item.id ? "#000" : Colors.textDecription, fontSize: 15, fontWeight: '700', textAlign: 'center', width: "90%" }]} numberOfLines={2}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            <View>
                <Image source={require('../../../../../assets/imgAccountScreen/YeuCau.png')} style={{ marginHorizontal: 'auto' }} />
                <Text style={[GlobalStyles.textStyle, { fontWeight: 'medium', marginHorizontal: 'auto' }]}>Bạn chưa có yêu cầu nào.</Text>
                <Text style={[GlobalStyles.textStyle, { fontWeight: 'medium', marginHorizontal: 'auto', width: "65%", color: Colors.textDecription, textAlign: 'center', marginVertical: 10 }]} numberOfLines={2}>
                    Dược sỹ Thera Care luôn sẵn lòng lắng nghe những yêu cầu của bạn
                </Text>

                <ButtonCustom title={"Gửi yêu cầu"}
                onPress={() => {navigation.navigate("ChatScreen" as never)}}
                    buttonStyle={{ width: "40%", height: 50, marginHorizontal: 'auto', marginVertical: 10, borderRadius: 30 }}
                />
            </View>

        </SafeAreaView>
    )
}