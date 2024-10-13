import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { GlobalStyles } from "../../styles/GlobalStyles"
import { Colors } from "../../styles/Colors"
import { ButtonCustom } from "../../components/ButtonCustom"
import IconF from "react-native-vector-icons/FontAwesome5"
import { ItemChangePoint } from "../../components/ItemChangePoint"

const data = [
    {
        id: 1,
        name: "Mặt nạ Banobagi Stem Cell Vitamin Mask Whitening And Moisture hỗ trợ cấp ẩm và dưỡng sáng da (30g)",
        price: 28000,
        point: 1500,
        image: "https://cdn.nhathuoclongchau.com.vn/unsafe/375x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_00041_bbc8b94616.jpg"
    },
    {
        id: 2,
        name: "Mặt nạ Banobagi stem cell vitamin mask whitening & tone up hỗ trợ cấp ẩm, dưỡng sáng da và nâng tông (30g)",
        price: 1000,
        point: 1500,
        image: "https://cdn.nhathuoclongchau.com.vn/unsafe/128x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_00036_f81526ba97.jpg"
    },
    {
        id: 3,
        name: "Mặt nạ Banobagi stem cell vitamin mask whitening & relaxing revital làm dịu và giảm viêm da (30g)",
        price: 28000,
        point: 1500,
        image: "https://cdn.nhathuoclongchau.com.vn/unsafe/128x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_00016_1e5a798909.jpg"
    },
    {
        id: 4,
        name: "Mặt nạ Banobagi Stem Cell Vitamin Mask Whitening & Aqua Hydrating cấp ẩm cho da, sáng màu da (30g)",
        price: 28000,
        point: 1500,
        image: "https://cdn.nhathuoclongchau.com.vn/unsafe/128x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_00046_c3aa8d101d.jpg"
    },    
    {
        id: 5,
        name: "Mặt nạ Banobagi stem cell vitamin mask whitening & relaxing revital làm dịu và giảm viêm da (30g)",
        price: 28000,
        point: 1500,
        image: "https://cdn.nhathuoclongchau.com.vn/unsafe/128x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_00031_448a440a49.jpg"
    },
    {
        id: 6,
        name: "Mặt nạ Banobagi Stem Cell Vitamin Mask Whitening & Aqua Hydrating cấp ẩm cho da, sáng màu da (30g)",
        price: 28000,
        point: 1500,
        image: "https://cdn.nhathuoclongchau.com.vn/unsafe/375x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_00025_00386132d2.jpg"
    }
]

export const BonusPointScreen = () => {
    

    const [products, setProducts] = useState(data)

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


                <View style={{ backgroundColor: "#fff" }}>
                    <View style={{ height: 120, paddingHorizontal: 15, backgroundColor: 'rgba(0, 0, 0, 0.07)', }}>
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

                        <View style={{ flexDirection: 'row', height: 60, justifyContent: 'space-between', alignItems: 'center' }}>
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

                    <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.07)',width: "100%",
                        justifyContent: 'space-between'
                    }}>
                        <FlatList
                            numColumns={2}
                            data={products}
                            renderItem={({ item }) => (
                                <ItemChangePoint props={item} />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
} 