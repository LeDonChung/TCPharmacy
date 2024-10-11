import { Image, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { GlobalStyles } from "../../styles/GlobalStyles"
import { Colors } from "../../styles/Colors"
import { ButtonCustom } from "../../components/ButtonCustom"
import IconF from "react-native-vector-icons/FontAwesome5"

const products = [
    
]

export const BonusPointScreen = () => {
    return (
        <ScrollView>
            <SafeAreaView style={{ backgroundColor: Colors.primary }}>
                <View style={{ height: 600 }}>
                    <View style={{ height: 220, }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
                            <ButtonCustom
                                buttonStyle={{ backgroundColor: "rgba(217, 217, 217, 0.15)", width: 140, height: 42, borderRadius: 30, }}
                                leadingIcon={<IconF name="gift" size={20} color={"#fff"} style={{ marginHorizontal: 5 }} />}
                                title={"Quà của tôi"}
                                onPress={() => { }} />

                            <ButtonCustom
                                buttonStyle={{ marginHorizontal: 10, backgroundColor: "rgba(217, 217, 217, 0.15)", width: 125, height: 42, borderRadius: 30, }}
                                leadingIcon={<IconF name="history" size={20} color={"#fff"} style={{ marginHorizontal: 5 }} />}
                                title={"Lịch sử"}
                                onPress={() => { }} />
                        </View>

                        <View style={{ flex: 2, flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ justifyContent: 'space-around' }}>
                                <Text style={[GlobalStyles.textStyle, { color: '#fff', fontWeight: 'bold', marginVertical: 10 }]}>Điểm thưởng</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('./../../../../assets/icon/ic_point.png')} resizeMode="contain" />
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', marginStart: 10, color: '#FFC700', fontSize: 32 }]}>494</Text>
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} onPress={() => { }} >
                                    <Text style={[GlobalStyles.textStyle, { color: '#fff', fontWeight: 'bold', textDecorationLine: 'underline' }]}>Xem thể lệ</Text>
                                    <IconF name="chevron-right" size={20} color={"#fff"} style={{ marginHorizontal: 5 }} />
                                </TouchableOpacity>
                            </View>

                            <Image source={require('./../../../../assets/imgBonusPointsScreen/BonusPointCreenPoint.png')} resizeMode="contain" style={{ width: 150, height: 150 }} />
                        </View>
                    </View>

                    <View style={{ height: 380, backgroundColor: '#1631C7', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <View
                            style={{
                                flexDirection: 'row', height: 125,
                                width: "90%", backgroundColor: '#fff', borderRadius: 10,
                                alignItems: 'center'
                            }}>
                            <View style={{ width: "65%", height: 125, justifyContent: 'space-around', marginHorizontal: 15 }}>
                                <Text style={[GlobalStyles.textStyle, { fontSize: 14, fontWeight: 'bold', color: Colors.textDecription }]}>
                                    Mua sắm để tích điểm và đổi quà tại Nhà thuốc Thera Care nhé!
                                </Text>

                                <ButtonCustom title={"Mua sắm ngay"}
                                    buttonStyle={{ width: 150, height: 40, borderRadius: 30, }}
                                    textStyle={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
                                    onPress={() => { }} />
                            </View>
                            <Image source={require('./../../../../assets/imgBonusPointsScreen/BonusPointCreenDoctor.png')} resizeMode="contain"
                                style={{ height: 180, width: 180, marginLeft: -45 }} />
                        </View>

                        <View style={{ height: 200, width: "90%", backgroundColor: '#fff', borderRadius: 10 }}>
                            <Text style={[GlobalStyles.textStyle,
                            { fontSize: 18, fontWeight: 'bold', color: Colors.primary, marginVertical: 10, marginHorizontal: 15 }]} >
                                Đồng hành cùng chiến binh nhí
                            </Text>
                            <View style={{ height: 150, flexDirection: "row", alignItems: 'center' }}>
                                <View style={{ width: "60%", marginHorizontal: 15, justifyContent: 'space-around', height: "100%" }}>
                                    <Text style={[GlobalStyles.textStyle, { fontSize: 18, fontWeight: 'regular', color: '#464A56', width: "60%" }]}>
                                        Góp quỹ ủng hộ Trẻ mắc bệnh Ung Thư Máu & Tim bẩm sinh
                                    </Text>
                                    <ButtonCustom title={"Tham gia ngay"}
                                        buttonStyle={{ width: 150, height: 40, borderRadius: 30, }}
                                        textStyle={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
                                        onPress={() => { }} />
                                </View>
                                <Image source={require('./../../../../assets/imgBonusPointsScreen/BonusPointCreenChiaSeYeuThuong.png')}
                                    resizeMode="contain" style={{ height: 200, width: 200, marginLeft: -80 }} />
                            </View>
                        </View>
                    </View>
                </View>


                <View style={{ height: 630, backgroundColor: "#fff" }}>
                    <View style={{ height: 120, marginHorizontal: 15 }}>
                        <View
                            style={{
                                height: 40, justifyContent: 'space-between',
                                flexDirection: 'row', alignItems: 'center'
                            }}>
                            <Text style={[GlobalStyles.textStyle, { fontSize: 17, color: '#464A56', fontWeight: 'bold' }]}>
                                Quà tặng
                            </Text>
                            <TouchableOpacity onPress={() => { }} >
                                <Text style={[GlobalStyles.textStyle, { color: Colors.primary, fontWeight: 'bold', }]}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[GlobalStyles.textStyle, { fontSize: 15, color: '#7B848F' }]}>
                            Tích điểm đổi quà với giá 1.000 đồng.
                        </Text>

                        <View style={{ flexDirection: 'row', height: 60,justifyContent: 'space-between', alignItems: 'center' }}>
                            <ButtonCustom title={"1.500 điểm"}
                                buttonStyle={{ width: "32%", height: 40, borderRadius: 30, backgroundColor: "#fff", borderWidth: 2, borderColor: Colors.primary, margin: 0, paddingHorizontal: -5 }}
                                textStyle={{ fontSize: 13, fontWeight: 'bold', color: Colors.primary, width: "65%" }}
                                trailingIcon={<IconF name="check" size={18} color={Colors.primary} style={{ marginHorizontal: 3 }} />}
                                onPress={() => { }} />

                            <ButtonCustom title={"3.000 điểm"}
                                buttonStyle={{ width: "32%", height: 40, borderRadius: 30, backgroundColor: "#fff", borderWidth: 2, borderColor: Colors.desciption, margin: 0, paddingHorizontal: -5 }}
                                textStyle={{ fontSize: 13, fontWeight: 'bold', color: Colors.desciption, width: "65%" }}
                                onPress={() => { }} />

                            <ButtonCustom title={"4.500 điểm"}
                                buttonStyle={{ width: "32%", height: 40, borderRadius: 30, backgroundColor: "#fff", borderWidth: 2, borderColor: Colors.desciption, margin: 0, paddingHorizontal: -5 }}
                                textStyle={{ fontSize: 13, fontWeight: 'bold', color: Colors.desciption, width: "65%" }}
                                onPress={() => { }} />
                        </View>
                    </View>

                    <View style={{height: 500}}>

                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
} 