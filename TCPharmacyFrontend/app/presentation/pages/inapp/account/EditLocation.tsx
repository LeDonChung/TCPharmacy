import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../styles/Colors";
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { TextInput } from "react-native-paper";
import { ModalCustom } from "../../../components/ModalCustom";
import IconAnd from "react-native-vector-icons/AntDesign";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import { ButtonCustom } from "../../../components/ButtonCustom";

const fetchData = async (url: string) => {
    try {
        const resp = await axios.get(url);
        return resp.data;
    } catch (error) {
        console.log(error)
    }
}


const locate = {
    name: "Trần Thị Thanh Tuyên",
    phone: "0396 172 224",
    address: {
        province: "",
        district: "",
        ward: "",
        street: ""
    },
    addressType: "",
    default: false
}

export const EditLocation = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const navigation = useNavigation();
    const [locationInfo, setLocationInfo] = useState(locate);
    const [address, setAddress] = useState({});
    const [provinceSelected, setProvinceSelected] = useState(null);
    const [districtSelected, setDistrictSelected] = useState(null);
    const [wardSelected, setWardSelected] = useState(null);
    const [type, setType] = useState("");
    const hanldedType = (type: string) => {
        if (type === "Nhà") {
            setType("Nhà");
        } else {
            setType("Văn phòng");
        }
    }

    //Lay ra toan bo tinh thanh
    useEffect(() => {
        const getData = async () => {
            const p = await fetchData("https://provinces.open-api.vn/api/p/");
            setProvinces(p);
        }
        getData()
    }, [])

    //Lay ra quan huyen theo tinh thanh
    const getDistricts = async (provinceCode: string) => {
        const d = await fetchData(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        setDistricts(d.districts);

    }



    //Lay ra phuong xa theo quan huyen
    const getWards = async (districtCode: string) => {
        const w = await fetchData(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        setWards(w.wards);
    }

    const handleSelectedLocation = () => {
        if (provinceSelected && districtSelected && wardSelected) {
            setLocationInfo({
                ...locationInfo,
                address: {
                    province: provinceSelected.name,
                    district: districtSelected.name,
                    ward: wardSelected.name,
                    street: ""
                }
            })
            setModalVisible(false);
        }
    }

    // Hide/display modal
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            {/* header */}
            <View style={{ height: 70, width: '100%', backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => { navigation.goBack() }}>
                    <IconF5 name="chevron-left" size={30} style={{ color: Colors.secondary, }} />
                </TouchableOpacity>
                <Text style={[GlobalStyles.textStyle, { fontSize: 18, fontWeight: '700', color: Colors.secondary, textAlign: 'center', width: "80%" }]}>Thêm địa chỉ mới</Text>
            </View>

            {/* Thong tin lien he */}

            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, marginVertical: 10, marginHorizontal: 15 }]}>Thông tin liên hệ</Text>

            <TextInput
                label="Họ và tên"
                value={locate.name}
                onChangeText={text => setLocationInfo({ ...locationInfo, name: text })}
                // mode="outlined" // tạo border cho TextInput
                style={{ fontSize: 16, width: "95%", marginHorizontal: 'auto', height: 60, backgroundColor: '#fff', borderWidth: 1, borderRadius: 8, borderColor: '#c4c4c4', fontWeight: '700', marginVertical: 15 }} // tuỳ chỉnh font chữ bên trong
                theme={{
                    colors: {
                        primary: Colors.primary, // màu viền khi chọn vào input
                        text: '#000', // màu chữ
                    },
                }}

            />

            <TextInput
                label="Số điện thoại"
                value={locate.phone}
                onChangeText={text => setLocationInfo({ ...locationInfo, phone: text })}
                // mode="outlined" // tạo border cho TextInput
                style={{ fontSize: 16, width: "95%", marginHorizontal: 'auto', height: 60, backgroundColor: '#fff', borderWidth: 1, borderRadius: 8, borderColor: '#c4c4c4', fontWeight: '700', marginVertical: 15 }} // tuỳ chỉnh font chữ bên trong
                theme={{
                    colors: {
                        primary: Colors.primary, // màu viền khi chọn vào input
                        text: '#000', // màu chữ
                    },
                }}

            />

            {/* Chon dia chi */}

            <View style={{ width: "95%", marginHorizontal: 'auto', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#c4c4c4' }}>
                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, marginVertical: 10 }]}>Địa chỉ nhận hàng</Text>

                <View style={{
                    width: "100%", height: 60, backgroundColor: '#fff', borderWidth: 1, borderRadius: 8,
                    borderColor: '#c4c4c4', marginVertical: 15, flexDirection: 'row', paddingHorizontal: 15,
                }}>
                    <TouchableOpacity style={{
                        width: "100%", height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    }} onPress={() => { setModalVisible(true) }}>
                        <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription, fontWeight: 'medium', width: "75%", fontSize: 17 }]} numberOfLines={1}>
                            {
                                locationInfo.address.province !== "" ? `${locationInfo.address.province}, ${locationInfo.address.district}, ${locationInfo.address.ward}` : "Chọn tỉnh/thành phố, quận/huyện, phường/xã"
                            }
                        </Text>
                        <IconF5 name="chevron-right" size={20} style={{ color: Colors.textDecription }} />
                    </TouchableOpacity>
                </View>


                {/* Modal chon tinh, huyen, xa */}
                <ModalCustom
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    content={
                        <View style={{ width: '100%', height: 380, alignItems: 'center', }}>
                            <View style={{ height: 50, width: "100%", borderBottomWidth: 1, borderColor: "#C4C4C4", alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[GlobalStyles.textStyle, { textAlign: 'center', fontSize: 20, fontWeight: '700', }]}>
                                    Chọn địa chỉ
                                </Text>

                                <TouchableOpacity style={{ position: "absolute", right: 10 }} onPress={() => { setModalVisible(false) }}>
                                    <IconAnd name="close" size={30} style={{ color: "#000", }} />
                                </TouchableOpacity>
                            </View>

                            {/* Chon tinh thanh */}

                            <Text style={[GlobalStyles.textStyle, { width: '100%', marginVertical: 5, fontWeight: 'bold' }]}>Chọn Tỉnh/Thành phố</Text>
                            <SelectDropdown
                                data={provinces.length ? provinces : []}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    setProvinceSelected(selectedItem);
                                    getDistricts(selectedItem.code);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={{
                                            width: "100%", height: 45, borderWidth: 1, borderColor: "#c4c4c4", borderRadius: 8,
                                            paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                        }}>
                                            <Text style={{}}>
                                                {(provinceSelected && provinceSelected.name) || 'Tỉnh/Thành phố'}
                                            </Text>
                                            <IconF5 name={isOpened ? 'chevron-up' : 'chevron-down'} style={{}} />
                                        </View>
                                    );
                                }}

                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{marginHorizontal: 10, marginVertical: 10}}>
                                            <Text style={[GlobalStyles.textStyle, {fontSize: 15}]}>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={{}}

                            />

                            {/* Chon quan huyen */}
                            <Text style={[GlobalStyles.textStyle, { width: '100%', marginVertical: 5, fontWeight: 'bold' }]}>Chọn Quận/Huyện</Text>
                            <SelectDropdown
                                data={districts.length ? districts : []}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    setDistrictSelected(selectedItem);
                                    getWards(selectedItem.code);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={{
                                            width: "100%", height: 45, borderWidth: 1, borderColor: "#c4c4c4", borderRadius: 8,
                                            paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                        }}>
                                            <Text style={{}}>
                                                {(districtSelected && districtSelected.name) || 'Quận/Huyện'}
                                            </Text>
                                            <IconF5 name={isOpened ? 'chevron-up' : 'chevron-down'} style={{}} />
                                        </View>
                                    );
                                }}

                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{marginHorizontal: 10, marginVertical: 10}}>
                                            <Text style={[GlobalStyles.textStyle, {fontSize: 15}]}>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={{}}

                            />

                            {/* Chon phuong, xa */}
                            <Text style={[GlobalStyles.textStyle, { width: '100%', marginVertical: 5, fontWeight: 'bold' }]}>Chọn Phường/Xã</Text>
                            <SelectDropdown
                                data={wards.length ? wards : []}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    setWardSelected(selectedItem);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={{
                                            width: "100%", height: 45, borderWidth: 1, borderColor: "#c4c4c4", borderRadius: 8,
                                            paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                        }}>
                                            <Text style={{}}>
                                                {(wardSelected && wardSelected.name) || 'Phường/Xã'}
                                            </Text>
                                            <IconF5 name={isOpened ? 'chevron-up' : 'chevron-down'} style={{}} />
                                        </View>
                                    );
                                }}

                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{marginHorizontal: 10, marginVertical: 10}}>
                                            <Text style={[GlobalStyles.textStyle, {fontSize: 15}]}>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={{}}

                            />

                            <ButtonCustom title="Xong" onPress={() => { handleSelectedLocation() }} buttonStyle={{ width: "90%", marginHorizontal: 'auto', marginVertical: 15 }} />

                        </View>
                    }
                />

                <TextInput
                    value={locationInfo.address.street ? locationInfo.address.street : ""}
                    onChangeText={text => setLocationInfo({ ...locationInfo, address: { ...locationInfo.address, street: text } })}
                    // mode="outlined" // tạo border cho TextInput
                    style={{ fontSize: 16, width: "100%", marginHorizontal: 'auto', height: 60, backgroundColor: '#fff', borderWidth: 1, borderRadius: 8, borderColor: '#c4c4c4', fontWeight: '700', marginVertical: 15 }} // tuỳ chỉnh font chữ bên trong
                    theme={{
                        colors: {
                            primary: Colors.primary, // màu viền khi chọn vào input
                            text: '#000', // màu chữ
                        },
                    }}
                    placeholder="Nhập tên đường, toà nhà, số nhà"
                    placeholderTextColor={Colors.textDecription}

                />

                <View style={{ height: 60, width: "95%", marginHorizontal: 'auto', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, marginVertical: 10 }]}>Loại địa chỉ</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={{ width: 70, height: 35, borderWidth: 1, borderColor: '#c4c4c4', 
                            borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, 
                            backgroundColor: type === "Nhà" ? Colors.primary : "#fff" }} onPress={() => {setType("Nhà")}}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'medium', color: type === "Nhà" ? Colors.secondary : "#464A56", fontSize: 17 }]}>Nhà</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 115, height: 35, borderWidth: 1, borderColor: '#c4c4c4', 
                            borderRadius: 30, justifyContent: 'center', alignItems: 'center', 
                            backgroundColor: type === "Văn phòng" ? Colors.primary : "#fff" }} onPress={() => {setType("Văn phòng")}}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'medium', color: type === "Văn phòng" ? "#fff" : "#464A56", fontSize: 17 }]}>Văn phòng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Chon lam mac dinh */}
            <View style={{ width: '95%', height: 60, marginHorizontal: 'auto', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, }]}>Đặt làm địa chỉ mặc định</Text>

                <Switch
                    trackColor={{ false: "#767577", true: Colors.primary, }}
                    thumbColor={"#ffff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => { setLocationInfo({ ...locationInfo, default: !locationInfo.default }) }}
                    value={locationInfo.default}

                />
            </View>

            <ButtonCustom title="Thêm địa chỉ mới" onPress={() => { console.log(locationInfo) }}
                buttonStyle={{ margin: 20, borderRadius: 30, paddingVertical: 15, backgroundColor: Colors.primary, width: '90%', alignSelf: 'center',  position: "absolute", bottom: 15 }}
                textStyle={{ color: Colors.secondary, fontSize: 16, fontWeight: '700',  }}
            />

        </SafeAreaView>
    )
}