import IconF5 from "react-native-vector-icons/FontAwesome5"
import IconA from "react-native-vector-icons/AntDesign"
import React from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyles } from "../../styles/GlobalStyles";
import { Colors } from "../../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import IconI from "react-native-vector-icons/Ionicons"
import { ScrollView } from "react-native-gesture-handler";
import { ButtonCustom } from "../../components/ButtonCustom";
export const CheckoutScreen = () => {
    const navigation = useNavigation();
    const [isEnabledOrder, setIsEnabledOrder] = React.useState(false);
    const toggleSwitchOrder = () => setIsEnabledOrder(previousState => !previousState);
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    const [isEnabledCode, setIsEnabledCode] = React.useState(false);
    const toggleSwitCode = () => setIsEnabledCode(previousState => !previousState);
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                    <View style={{ height: 60, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
                        <TouchableOpacity style={{ marginHorizontal: 15, justifyContent: "center", alignContent: "center" }} onPress={() => { navigation.goBack() }}>
                            <IconF5 name="chevron-left" size={20} style={{ color: Colors.secondary }} />
                        </TouchableOpacity>
                        <Text style={[GlobalStyles.textStyle, { flex: 1, fontSize: 18, fontWeight: '700', color: Colors.secondary, textAlign: 'center' }]}>
                            Xác nhận đơn hàng
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 15, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>Hình thức giao hàng</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => { }}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]} >Giao hàng tận nơi</Text>
                            <IconF5 name="chevron-right" size={16} style={{ color: Colors.primary, marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>Giao hàng tới</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => { }}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]} >Thay đổi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 15, backgroundColor: '#fff', paddingVertical: 20 }}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: '#000', fontSize: 20 }]}>44/10 Lê Lai</Text>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, fontSize: 16, paddingVertical: 20 }]}>Phường 4, Quận Gò Vấp, Hồ Chí Minh</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={[GlobalStyles.textStyle, { fontSize: 16, marginRight: 20 }]}>LÊ ĐÔN CHỦNG</Text>
                            <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription, fontSize: 16 }]}>0901234567</Text>
                        </View>
                        <View style={{ paddingVertical: 20 }}>
                            <TextInput
                                placeholder="Ghi chú"
                                style={{ backgroundColor: '#fff', textAlignVertical: 'top', height: 100 }}
                                mode="outlined"
                                outlineStyle={{ borderRadius: 10, borderWidth: 1, borderColor: '#BDC2C7' }}
                                numberOfLines={4}
                                multiline={true}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <IconA name="clockcircle" size={20} color={Colors.primary} />
                            <View style={{ marginHorizontal: 20 }}>
                                <Text style={[GlobalStyles.textStyle, { fontSize: 16, color: Colors.textDecription, marginRight: 20 }]}>Thời gian nhận hàng dự kiến</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => { }}>
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]} >Cập nhật thời gian nhận hàng</Text>
                                    <IconF5 name="chevron-right" size={16} style={{ color: Colors.primary, marginLeft: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <View style={{ marginTop: 20, paddingHorizontal: 15, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>Yêu cầu xuất hóa đơn điện tử</Text>
                        <Switch
                            style={{ flex: 1, transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabledOrder ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor={Colors.textDecription}
                            onValueChange={toggleSwitchOrder}
                            value={isEnabledOrder}
                        />
                    </View>


                    <View>
                        <View style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}>
                            <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription, fontWeight: 'bold' }]}>Danh sách sản phẩm</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigation.navigate('home' as never) }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]} >Thêm sản phẩm khác</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 15, backgroundColor: '#fff' }}>
                            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: '#fff', paddingVertical: 10 }}>
                                <Image source={require('./../../../../assets/imgPurcharedProduct/1.png')} resizeMode="contain" style={{ width: 100, height: 100, borderWidth: 1, borderColor: '#BDC2C7', borderRadius: 10, padding: 5 }} />
                                <View style={{ flex: 1, marginLeft: 10, justifyContent: 'space-around' }}>
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 15 }]} numberOfLines={2}>Viên uống Multivitamin +Zn +D3 Royal Care hỗ trợ tăng cường sức ...</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 14, color: Colors.primary }]}>
                                            {formatPrice(20000)}
                                        </Text>
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 14, color: Colors.textDecription }]}>
                                            x1 hộp
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#fff',marginTop: 30, padding: 15 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.secondary, padding: 10, borderRadius: 10 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]}>Áp dụng ưu đãi để được giảm giá</Text>
                                <IconF5 name="chevron-right" size={20} color={Colors.primary} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('./../../../../assets/icon/ic_point.png')} resizeMode="contain" />
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', marginHorizontal: 10 }]}>Đổi <Text style={{ color: 'orange', fontWeight: 'bold' }}>0</Text> điểm(=0đ)</Text>
                                    <IconI name="information-circle-sharp" size={22} color={Colors.textDecription} />
                                </View>

                                <Switch
                                    style={{ flex: 1, transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isEnabledCode ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor={Colors.textDecription}
                                    onValueChange={toggleSwitCode}
                                    value={isEnabledCode}
                                />
                            </View>
                        </View>

                    </View>
                    
                    <View style={{}}>
                        <Text style={[GlobalStyles.textStyle, { paddingHorizontal: 15,marginVertical: 15, fontWeight: 'bold', color:  Colors.textDecription }]}>Thông tin thanh toán</Text>
                        <View style={{backgroundColor: '#fff', paddingHorizontal: 15}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5}}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color:  Colors.textDecription }]}>Tổng tiền</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>175.000đ</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5}}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color:  Colors.textDecription }]}>Giảm giá trực tiếp</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: 'orange' }]}>0đ</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5}}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color:  Colors.textDecription }]}>Giảm giá voucher</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: 'orange'  }]}>0đ</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5}}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color:  Colors.textDecription }]}>Phí vận chuyển</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary  }]}>Miễn phí</Text>
                            </View>
                            
                            <View style={{backgroundColor: Colors.textDecription, height: 1, marginVertical: 10}}></View>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5}}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color:  Colors.textDecription }]}>Thành tiền</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, color: Colors.primary  }]}>175.000đ</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5}}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color:  Colors.textDecription }]}>Tiết kiệm được</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary  }]}>0đ</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5}}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color:  Colors.textDecription }]}>Điểm thưởng</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary  }]}>+1750</Text>
                            </View>
                            
                        </View>
                    </View>
                    <View style={{paddingHorizontal: 15, borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: '#fff', marginTop: 50, height: 100, justifyContent: 'center'}}>
                        <ButtonCustom 
                            title={"Mua ngay"}
                            onPress={() => { }}
                            buttonStyle={{ borderRadius: 50, backgroundColor: Colors.primary }}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </>
    )
}