import { FlatList, Image, RefreshControl, Switch, Text, TouchableOpacity, View } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import IconF5 from "react-native-vector-icons/FontAwesome5"
import { GlobalStyles } from "../../styles/GlobalStyles"
import { Colors } from "../../styles/Colors"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import IconI from "react-native-vector-icons/Ionicons"
import { Store } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { ButtonCustom } from "../../components/ButtonCustom"
import { removeCartDetailFromCart, setCart, updateCartDetail } from "../../redux/slice/CartSlice"
import { CartDetailCustom } from "../../components/CartDetailCustom"
import { PriceUtils } from "../../../domain/utils/PriceUtils"
import { PoitUtils } from "../../../domain/utils/PointUtils"
import { getRecommendationsByUserId } from "../../redux/slice/ProductSlice"
import { ProductCustom } from "../../components/ProductCustom"
import { ChooseProductToCartModalCustom } from "../../components/ChooseProductToCartModalCustom"

export const CartScreen = () => {
    const navigation = useNavigation();
    const cart = useSelector((state: Store) => state.cart.value);
    const dispatch = useDispatch();
    const [selectedAll, setSelectedAll] = useState(true);
    useEffect(() => {
        navigation.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.setOptions({
            tabBarStyle: undefined
        });
    }, [navigation]);

    useEffect(() => {
        const isSeletedAll = cart.cartItems.every((cartDetail) => cartDetail.isChoose);
        setSelectedAll(isSeletedAll);
    }, [cart])

    const handlerUpdateCartDetailAll = (isChoose: boolean) => {
        cart.cartItems.forEach((cartDetail) => {
            cartDetail = { ...cartDetail, isChoose: isChoose };
            dispatch(updateCartDetail({ cartDetail: cartDetail }));
        });
    }
    const userLogin = useSelector((state: Store) => state.user.userLogin);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        dispatch(getRecommendationsByUserId(userLogin.id));
    }, []);
    useEffect(() => {
        dispatch(getRecommendationsByUserId(userLogin.id));
        console.log(recommendations)
    }, []);

    const recommendations = useSelector((state: Store) => state.product.value.recommendations);
    const [modalVisible, setModalVisible] = useState(false);

    const [productChoose, setProductChoose] = useState();
    return (
        <> 
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ height: 60, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
                    <TouchableOpacity style={{ marginHorizontal: 15, justifyContent: "center", alignContent: "center" }} onPress={() => { navigation.goBack() }}>
                        <IconF5 name="chevron-left" size={20} style={{ color: Colors.secondary }} />
                    </TouchableOpacity>
                    <Text style={[GlobalStyles.textStyle, { flex: 1, fontSize: 18, fontWeight: '700', color: Colors.secondary, textAlign: 'center' }]}>
                        Giỏ hàng
                    </Text>
                </View>

                {
                    cart.cartItems.length > 0 ?
                        <View style={{ flex: 1 }}>
                            <View style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}>
                                {selectedAll ?
                                    <TouchableOpacity onPress={() => { setSelectedAll(false); handlerUpdateCartDetailAll(false) }}>
                                        <IconI size={24} name="checkmark-circle-sharp" color={Colors.primary} />
                                    </TouchableOpacity>
                                    : <TouchableOpacity onPress={() => { setSelectedAll(true); handlerUpdateCartDetailAll(true) }}>
                                        <IconI size={24} name="checkmark-circle-outline" color={Colors.textDecription} />
                                    </TouchableOpacity>
                                }
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>Chọn tất cả ({cart.cartItems.length})</Text>
                                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]} >Tiếp tục mua sắm</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            >
                                <View style={{ paddingHorizontal: -15, marginBottom: 260 }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        data={cart.cartItems}
                                        scrollEnabled={false}
                                        keyExtractor={item => item.medicine.id.toString()}
                                        renderItem={({ item, index }) => {
                                            return <View style={{ backgroundColor: '#fff', paddingHorizontal: 15, borderTopWidth: index == 0 ? 0 : 1, borderColor: '#BDC2C7' }}>
                                                <CartDetailCustom cartDetail={item} isChoose={item.isChoose}
                                                    setChoose={(isChoose) => {
                                                        item = { ...item, isChoose: isChoose };
                                                        console.log(item)
                                                        dispatch(updateCartDetail({ cartDetail: item }));
                                                    }}
                                                    onUpdateQuantity={(quantity) => {
                                                        item = { ...item, quantity: quantity };
                                                        dispatch(updateCartDetail({ cartDetail: item }));
                                                    }}

                                                    onDeleteCartDetail={(cartDetail) => {
                                                        dispatch(removeCartDetailFromCart({ cartDetail: cartDetail }));
                                                    }} />

                                            </View>
                                        }}
                                    />
                                    <View style={{ paddingHorizontal: 15, marginVertical: 20 }}>
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]}>Gợi ý sản phẩm</Text>
                                        {recommendations.length > 0 ? (
                                            <FlatList
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                data={recommendations}
                                                keyExtractor={(item) => item.id.toString()}
                                                renderItem={({ item }) => (
                                                    <ProductCustom
                                                        data={item}
                                                        addToCart={() => { setProductChoose(item); setModalVisible(true); }}
                                                        onPress={() => { navigation.push('productDetailScreen', { medicineId: item.id }); }}
                                                    />
                                                )}
                                            />
                                        ) : (
                                            <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription }]}>Chưa có gợi ý sản phẩm</Text>
                                        )}
                                    </View>
                                </View>

                            </ScrollView>
                            <View style={{ backgroundColor: '#fff', position: 'absolute', left: 0, right: 0, bottom: 0, marginTop: 30, padding: 15, height: 250, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
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
                                        onValueChange={(value) => dispatch(setCart({ ...cart, usePoint: value }))} // Update the onValueChange prop
                                        value={cart.usePoint}
                                    />
                                </View>

                                <View style={{ borderTopWidth: 1, borderColor: '#BDC2C7' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 }}>
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}></Text>
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary, fontSize: 20 }]}>{PriceUtils.formatPrice(cart.totalPrices())}đ</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}><Text style={{ color: 'orange', fontWeight: 'bold' }}>+{PoitUtils.calculatePoints(cart.totalPrices())}</Text> điểm</Text>
                                        <ButtonCustom title="Mua hàng" buttonStyle={{ borderRadius: 50 }} onPress={() => { navigation.navigate('checkoutScreen' as never) }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', textAlign: 'center' }]}>Chưa có sản phẩm nào trong giỏ</Text>
                            <Text style={[GlobalStyles.textStyle, { textAlign: 'center', marginVertical: 20 }]}>Cùng mua sắm hàng ngàn sản phẩm tại nhà thuốc TC Pharmacy nhé!</Text>
                            <ButtonCustom buttonStyle={{ borderRadius: 50 }} title="Mua sắm ngay" onPress={() => { navigation.goBack() }} />
                        </View>
                }
                {
                    productChoose && <ChooseProductToCartModalCustom
                        productChoose={productChoose}
                        visible={modalVisible}
                        setModalVisible={setModalVisible} />
                }
            </SafeAreaView >
        </>
    )
}