import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../styles/Colors";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import { ButtonCustom } from "../../../components/ButtonCustom";

const locations = [
    {
        id: "1",
        name: "Trần Thị Thanh Tuyên",
        phone: "0396 172 224",
        address: {
            province: "Hồ Chí Minh",
            district: "Quận Gò Vấp",
            ward: "Phường 4",
            street: "44/10 Lê Lai"
        },
        addressType: "Nhà",
        default: true
    },
    {
        id: "2",
        name: "Don Chung",
        phone: "0396 172 224",
        address: {
            province: "Hồ Chí Minh",
            district: "Quận Gò Vấp",
            ward: "Phường 4",
            street: "44/10 Lê Lai"
        },
        addressType: "Nhà",
        default: false
    }
]

export const Location = () => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);


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
        <SafeAreaView style={{flex: 1}}>
            <View style={{ height: 70, width: '100%', backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => { navigation.goBack() }}>
                    <IconF5 name="chevron-left" size={30} style={{ color: Colors.secondary, }} />
                </TouchableOpacity>
                <Text style={[GlobalStyles.textStyle, { fontSize: 18, fontWeight: '700', color: Colors.secondary, textAlign: 'center', width: "80%" }]}>Danh sách địa chỉ</Text>
            </View>

            <View style={{flex: 1}}>
                <FlatList
                    data={locations}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={{width: "100%", height: 100, backgroundColor: '#fff', marginVertical: 5}}>
                    <View style={{flexDirection:'row', marginHorizontal: 15, justifyContent: 'space-between', marginVertical: 10}}>
                        <Text style={[GlobalStyles.textStyle, {fontWeight: '700'}]}>{item.name}</Text>
                        <TouchableOpacity>
                            <Text style={[GlobalStyles.textStyle, {color: Colors.primary, fontWeight: 'medium'}]}
                            onPress={() => { navigation.navigate('EditLocationScreen' as never) }}
                            >Sửa</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[GlobalStyles.textStyle,{width: "95%", textAlign: 'left', marginHorizontal: 15, color: Colors.textDecription}]} numberOfLines={2}>
                        {item.phone} | {item.address.street}, {item.address.ward}, {item.address.district}, {item.address.province}
                    </Text>
                </View>
                    )}
                />
            </View>


            <View style={{height: 90, width: "100%", position: 'absolute', bottom: 0, backgroundColor: '#fff', borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
            <ButtonCustom title="Thêm địa chỉ mới" onPress={() => { navigation.navigate('EditLocationScreen' as never) }}
                buttonStyle={{ margin: 20, borderRadius: 30, paddingVertical: 15, backgroundColor: Colors.primary, width: '90%', alignSelf: 'center' }}
                textStyle={{ color: Colors.secondary, fontSize: 16, fontWeight: '700' }}
            />
            </View>
        </SafeAreaView>
    )
}