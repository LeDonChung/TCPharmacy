import IconF5 from "react-native-vector-icons/FontAwesome5"
import IconA from "react-native-vector-icons/AntDesign"
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyles } from "../../styles/GlobalStyles";
import { Colors } from "../../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import IconI from "react-native-vector-icons/Ionicons"
import { ScrollView } from "react-native-gesture-handler";
import { ButtonCustom } from "../../components/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../redux/store";
import { setCart } from "../../redux/slice/CartSlice";
import { PoitUtils } from "../../../domain/utils/PointUtils";
import { PriceUtils } from "../../../domain/utils/PriceUtils";
import { AddressModel } from "../../../domain/models/AddressModel";
import { ModalCustom } from "../../components/ModalCustom";
import { showToast } from "../../../api/AppUtils";
import { OrderDetailModel } from "../../../domain/models/OrderDetailModel";
import { OrderModel } from "../../../domain/models/OrderModel";
import { createOrder, setOrder } from "../../redux/slice/OrderSlice";
import { CartModel } from "../../../domain/models/CartModel";

export const CheckoutScreen = () => {
    const cart = useSelector((state: Store) => state.cart.value);

    const navigation = useNavigation();

    const userLogin = useSelector((state: Store) => state.user.userLogin);

    const [address, setAddress] = useState(() => {
        const userAddress = userLogin.addresses.filter((address: AddressModel) => address._default)[0];
        return new AddressModel(
            userAddress?.id, userAddress?.province, userAddress?.district, userAddress?.ward, userAddress?.street, userAddress?.addressType, userAddress?._default, userAddress?.fullName, userAddress?.phoneNumber
        );
    });
    const dispatch = useDispatch();

    const [selectAddress, setSelectAddress] = useState(0);

    useEffect(() => {
        // dispatch(setCart({...cart, address: userLogin.addresses.filter((address: AddressModel) => address._default)[0] || new AddressModel()}));
    }, []);

    const [modalVisible, setModalVisible] = useState(false);

    const handlerActionChooseAddressNew = () => {
        setAddress(userLogin.addresses[selectAddress]);
        setModalVisible(false);
    }

    const order = useSelector((state: Store) => state.order.order);

    const errorResponse = useSelector((state: Store) => state.order.errorResponse);

    
    const handlerActionCheckout = async () => {
        if (!address.fullName || !address.phoneNumber || !address.street || !address.province || !address.district || !address.ward) {
            showToast('info', 'bottom', 'Thông báo', 'Vui lòng chọn địa chỉ giao hàng');
            return;
        } 

        const orderDetails: OrderDetailModel[] = cart.cartItems.map(item => {
            return new OrderDetailModel(0, item.medicine.id, item.quantity, item.price, item.discount);
        });



        const order = new OrderModel(
            PoitUtils.calculatePoints(cart.totalPrices()),
            cart.usePoint,
            cart.feeShip,
            cart.exportInvoice,
            userLogin.id,
            cart.note,
            orderDetails,
            address
        );


        await dispatch(createOrder(order));

        if (!errorResponse) {
            dispatch(setCart(new CartModel()));
            dispatch(setOrder(new OrderModel()));
            showToast('success', 'bottom', 'Thông báo', 'Đặt hàng thành công');
        }
    }
    return (
        <>
            <SafeAreaView>
                <View style={{ height: 60, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
                    <TouchableOpacity style={{ marginHorizontal: 15, justifyContent: "center", alignContent: "center" }} onPress={() => { navigation.goBack() }}>
                        <IconF5 name="chevron-left" size={20} style={{ color: Colors.secondary }} />
                    </TouchableOpacity>
                    <Text style={[GlobalStyles.textStyle, { flex: 1, fontSize: 18, fontWeight: '700', color: Colors.secondary, textAlign: 'center' }]}>
                        Xác nhận đơn hàng
                    </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>


                    <View style={{ paddingHorizontal: 15, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>Hình thức giao hàng</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => { }}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]} >Giao hàng tận nơi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>Giao hàng tới</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => { setModalVisible(true) }}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]} >Thay đổi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 15, backgroundColor: '#fff', paddingVertical: 20 }}>
                        {
                            address.fullName && address.phoneNumber && address.street && address.province && address.district && address.ward
                                ?
                                <>
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: '#000', fontSize: 20 }]}>{address.street}</Text>
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, fontSize: 16, paddingVertical: 20 }]}>
                                        {address.ward}, {address.district}, {address.province}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Text style={[GlobalStyles.textStyle, { fontSize: 16, marginRight: 20 }]}>{address.fullName}</Text>
                                        <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription, fontSize: 16 }]}>{address.phoneNumber}</Text>
                                    </View>
                                </>
                                :
                                <>
                                    <Text style={[GlobalStyles.textStyle, { color: 'red', fontSize: 16 }]}>Vui lòng chọn địa chỉ giao hàng</Text>
                                </>
                        }



                        <View style={{ paddingVertical: 20 }}>
                            <TextInput
                                placeholder="Ghi chú"
                                style={{ backgroundColor: '#fff', textAlignVertical: 'top', height: 100 }}
                                mode="outlined"
                                outlineStyle={{ borderRadius: 10, borderWidth: 1, borderColor: '#BDC2C7' }}
                                numberOfLines={4}
                                value={cart.note}
                                onChangeText={(text) => dispatch(setCart({ ...cart, note: text }))}
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
                            thumbColor={cart.exportInvoice ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor={Colors.textDecription}
                            onValueChange={(value) => dispatch(setCart({ ...cart, exportInvoice: value }))}
                            value={cart.exportInvoice}
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
                            {cart.cartItems.map((cartItem, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'row', width: '100%', backgroundColor: '#fff', paddingVertical: 10 }}>
                                        <Image source={{ uri: cartItem.medicine.primaryImage }} resizeMode="contain" style={{ width: 100, height: 100, borderWidth: 1, borderColor: '#BDC2C7', borderRadius: 10, padding: 5 }} />
                                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'space-around' }}>
                                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 15 }]} numberOfLines={2}>{cartItem.medicine.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 14, color: Colors.primary }]}>
                                                    {PriceUtils.formatPrice(PriceUtils.calculateSalePrice(cartItem.medicine.price, cartItem.medicine.discount) * cartItem.quantity)}đ
                                                </Text>
                                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 14, color: Colors.textDecription }]}>
                                                    x{cartItem.quantity} {cartItem.medicine.init}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>

                        <View style={{ backgroundColor: '#fff', marginTop: 30, padding: 15 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.secondary, padding: 10, borderRadius: 10 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]}>Áp dụng ưu đãi để được giảm giá</Text>
                                <IconF5 name="chevron-right" size={20} color={Colors.primary} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('./../../../../assets/icon/ic_point.png')} resizeMode="contain" />
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', marginHorizontal: 10 }]}>Đổi <Text style={{ color: 'orange', fontWeight: 'bold' }}>{userLogin.currentPoint}</Text> điểm(={PoitUtils.calculatePrice(userLogin.currentPoint)}đ)</Text>
                                    <IconI name="information-circle-sharp" size={22} color={Colors.textDecription} />
                                </View>

                                <Switch
                                    style={{ flex: 1, transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={cart.usePoint ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor={Colors.textDecription}
                                    onValueChange={(value) => dispatch(setCart({ ...cart, usePoint: value }))}
                                    value={cart.usePoint}
                                />
                            </View>
                        </View>

                    </View>

                    <View style={{ marginBottom: 190 }}>
                        <Text style={[GlobalStyles.textStyle, { paddingHorizontal: 15, marginVertical: 15, fontWeight: 'bold', color: Colors.textDecription }]}>Thông tin thanh toán</Text>
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription }]}>Tổng tiền</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>{PriceUtils.formatPrice(
                                    cart.cartItems.reduce((total, cartItem) => total + cartItem.medicine.price * cartItem.quantity, 0)
                                )}đ</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription }]}>Giảm giá trực tiếp</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: 'orange' }]}>{PriceUtils.formatPrice(
                                    cart.cartItems.reduce((total, cartItem) => total + cartItem.medicine.price * cartItem.quantity, 0) - cart.totalPrices()
                                )}đ</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription }]}>Giảm giá voucher</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: 'orange' }]}>0đ</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription }]}>Phí vận chuyển</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]}>Miễn phí</Text>
                            </View>

                            <View style={{ backgroundColor: Colors.textDecription, height: 1, marginVertical: 10 }}></View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription }]}>Thành tiền</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, color: Colors.primary }]}>{PriceUtils.formatPrice(cart.totalPrices())}đ</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription }]}>Tiết kiệm được</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]}>0đ</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription }]}>Điểm thưởng</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]}>+{PoitUtils.calculatePoints(cart.totalPrices())}</Text>
                            </View>

                        </View>
                    </View>

                    <ModalCustom
                        modalVisible={modalVisible}
                        style={{ backgroundColor: '#fff', width: '85%' }}
                        setModalVisible={setModalVisible}
                        content={
                            <SafeAreaView style={{ height: 600, width: '100%' }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <Text style={[GlobalStyles.textStyle, { fontSize: 18, fontWeight: 'bold', color: Colors.textDecription, textAlign: 'center', paddingVertical: 10 }]}>Chọn địa chỉ nhận hàng</Text>
                                </View>

                                <View>
                                    <FlatList
                                        data={userLogin.addresses}
                                        keyExtractor={item => item.id.toString()}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity style={{ height: 80, backgroundColor: '#fff', marginVertical: 5, borderTopWidth: 1, borderColor: '#BDC2C7', flexDirection: 'row', alignItems: 'center' }} onPress={() => { setSelectAddress(index); }}>
                                                <View style={{ paddingRight: 10, marginBottom: 38 }}>
                                                    {
                                                        selectAddress === index ?
                                                            <TouchableOpacity>
                                                                <IconI size={24} name="checkmark-circle-sharp" color={Colors.primary} />
                                                            </TouchableOpacity>
                                                            : <TouchableOpacity>
                                                                <IconI size={24} name="checkmark-circle-outline" color={Colors.textDecription} />
                                                            </TouchableOpacity>
                                                    }
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={[GlobalStyles.textStyle, { fontWeight: '700' }]}>{item.fullName}</Text>
                                                        <TouchableOpacity>
                                                            <Text style={[GlobalStyles.textStyle, { color: Colors.primary }]}
                                                                onPress={() => { navigation.navigate('EditLocationScreen' as never) }}>Sửa</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <Text style={[GlobalStyles.textStyle, { textAlign: 'left', color: Colors.textDecription }]} numberOfLines={2}>
                                                        {item.phoneNumber} | {item.street}, {item.ward}, {item.district}, {item.province}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>

                                <View style={{ height: 90, width: "100%", position: 'absolute', bottom: 0, backgroundColor: '#fff', borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
                                    <ButtonCustom title="Chọn" onPress={() => { handlerActionChooseAddressNew() }}
                                        buttonStyle={{ margin: 20, borderRadius: 30, paddingVertical: 15, backgroundColor: Colors.primary, width: '90%', alignSelf: 'center' }}
                                        textStyle={{ color: Colors.secondary, fontSize: 16, fontWeight: '700' }}
                                    />
                                </View>
                            </SafeAreaView>
                        }
                    />
                </ScrollView>
                <View style={{ paddingHorizontal: 15, borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: '#fff', height: 180, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <ButtonCustom
                        title={"Mua ngay"}
                        onPress={() => { handlerActionCheckout() }}
                        buttonStyle={{ borderRadius: 50, backgroundColor: Colors.primary, marginTop: 30 }}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}