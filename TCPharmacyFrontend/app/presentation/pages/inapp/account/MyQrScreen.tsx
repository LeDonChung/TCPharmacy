import { Image, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect } from "react"
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../styles/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { ButtonCustom } from "../../../components/ButtonCustom";

const user = {
  name: "TRAN THI THANH TUYEN",
  phone: "0396 172 224",
  qrImage: require("../../../../../assets/imgAccountScreen/maQR.png")
}

export const MyQrScreen = () => {
  const navigation = useNavigation();
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
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
        <View style={{ height: 70, width: '100%', backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', }}>
          <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => { navigation.goBack() }}>
            <IconF5 name="chevron-left" size={30} style={{ color: Colors.secondary, }} />
          </TouchableOpacity>
          <Text style={[GlobalStyles.textStyle, { fontSize: 18, fontWeight: '700', color: Colors.secondary, textAlign: 'center', width: "80%" }]}>Mã QR</Text>
        </View>

        <Text numberOfLines={2} style={[GlobalStyles.textStyle, { width: "70%", textAlign: 'center', marginHorizontal: 'auto', color: Colors.secondary, fontWeight: "regular", marginVertical: 20 }]}>
          Vui lòng đưa mã QR cho Dược sỹ để được hướng dẫn
        </Text>

        <View style={{ height: 510, width: "85%", marginHorizontal: 'auto' }}>
          <View style={{
            width: "100%", height: 400, backgroundColor: "#fff",
            borderTopRightRadius: 15, borderTopLeftRadius: 15,
            justifyContent: 'center', alignItems: 'center'
          }}>

            <Image source={user.qrImage} style={{ marginVertical: 10 }} />
            <Text style={[GlobalStyles.textStyle, { fontSize: 18, fontWeight: 'bold' }]}>{user.name}</Text>
            <Text style={[GlobalStyles.textStyle, { fontWeight: 'regular' }]}>{user.phone}</Text>

          </View>

          <View style={{
            width: "100%", height: 110, backgroundColor: '#1631C7',
            borderBottomRightRadius: 15, borderBottomLeftRadius: 15, justifyContent: 'center', alignItems: 'center'
          }}>

            <View style={{flexDirection: 'row', marginVertical: 5}}>
              <Image source={require('../../../../../assets/icon/ic_point.png')} style={{ width: 14, height: 20, marginHorizontal: 5 }} />
              <Text style={[GlobalStyles.textStyle, { color: '#fff', fontWeight: 'bold', fontSize: 15 }]}>494 điểm thưởng</Text>
            </View>

            <ButtonCustom title="Khám phá điểm thưởng" buttonStyle={{backgroundColor: '#fff', borderRadius: 30, width: "75%", height: 40, 
              flexDorection: "row",justifyContent: 'space-between', alignItems: 'center'}}
              textStyle={{color: Colors.primary, fontWeight: 'bold', fontSize: 15}}
              trailingIcon={<IconF5 name="chevron-right" size={15} style={{ color: Colors.primary, position: 'absolute', right: -25}} />}
              onPress={() => {}}
            />

          </View>

          <View style={{ width: 30, height: 30, backgroundColor: Colors.primary, borderRadius: 50, position: 'absolute', left: -15, bottom: 95 }}></View>
          <View style={{ width: 30, height: 30, backgroundColor: Colors.primary, borderRadius: 50, position: 'absolute', right: -15, bottom: 95 }}></View>
        </View>

      </SafeAreaView>
    </>
  )
}