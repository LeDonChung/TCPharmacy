import { Dimensions, Image, ImageSourcePropType, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from "react-native"
import { View } from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductModel } from "../../../domain/models/ProductModel";

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1.0);
import IconF5 from "react-native-vector-icons/FontAwesome5"
import IconF6 from "react-native-vector-icons/FontAwesome6"
import { Colors } from "../../styles/Colors";
import PagerView from "react-native-pager-view";
import { GlobalStyles } from "../../styles/GlobalStyles";
import IconI from "react-native-vector-icons/Ionicons"
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../redux/store";
import { ChooseProductToCartModalCustom } from "../../components/ChooseProductToCartModalCustom";
import { ProductCustom } from "../../components/ProductCustom";
import { FlatList } from "react-native";
import { ButtonCustom } from "../../components/ButtonCustom";
import { getProductById, getProductsRelated, setProduct } from "../../redux/slice/ProductSlice";
import HTMLView from "react-native-htmlview";
import { ModalCustom } from "../../components/ModalCustom";
import { MedicineModel } from "../../../domain/models/MedicineModel";
import { PriceUtils } from "../../../domain/utils/PriceUtils";
import { PoitUtils } from "../../../domain/utils/PointUtils";

export const ProductDetailScreen = () => {
    const route = useRoute()

    const medicineId: number = (route.params as any).medicineId;

    const [index, setIndex] = useState(0);

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);

    const [productChoose, setProductChoose] = useState();

    const cart = useSelector((state: Store) => state.cart.value);

    const product = useSelector((state: Store) => state.product.value.product);

    const [showDetail, setShowDetail] = useState(false);

    const dispatch = useDispatch();


    const productRelated = useSelector((state: Store) => state.product.value.relatedProducts);

    const init = async () => {
        await dispatch(getProductById(medicineId));
        const tagsId = product.tags.map((tag) => tag.id);
        await dispatch(getProductsRelated(tagsId));
    }


    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        init();
    }, []);

    useEffect(() => {
        init();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <IconF6 name="angle-left" size={30} style={{ flex: 1 }} onPress={() => navigation.goBack()} />
                <IconF5 name="share-alt" size={24} style={{ marginRight: 20 }} color={Colors.primary} onPress={() => { }} />
                <View style={{ marginRight: 5 }}>
                    <IconF5 name="shopping-cart" size={24} color={Colors.primary} onPress={() => { navigation.navigate('cart') }} />
                    <View style={{ backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', height: 15, width: 15, borderRadius: 50, position: 'absolute', top: -5, right: -5 }}>
                        <Text style={[GlobalStyles.textStyle, { color: '#fff', fontSize: 12, textAlign: 'center' }]}>{cart.cartItems.length}</Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                <View>
                    <View style={{ height: 300, marginVertical: 20 }}>
                        <PagerView
                            style={{ flex: 1 }}
                            initialPage={index}
                            onPageSelected={(e) => setIndex(e.nativeEvent.position)}
                        >
                            {product.medicineImages.map((image, imgIndex) => (
                                <View key={imgIndex} style={styles.page}>
                                    <Image source={{ uri: image.url }} style={styles.image} />

                                </View>
                            ))}
                        </PagerView>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={[GlobalStyles.textStyle, {}]}>Thương hiệu: </Text>
                            <Text style={[GlobalStyles.textStyle, { color: Colors.primary }]}>{product.brand.title}</Text>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={[GlobalStyles.textStyle, { fontSize: 20, fontWeight: 'bold' }]}>{product.name} ({product.specifications})</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Text style={[GlobalStyles.textStyle]}>{product.star} ⭐</Text>
                            <View style={{ width: 5, height: 5, borderRadius: 50, backgroundColor: '#BBC4CC' }}></View>
                            <Text style={[GlobalStyles.textStyle]}>{product.reviews} đánh giá</Text>
                            <View style={{ width: 5, height: 5, borderRadius: 50, backgroundColor: '#BBC4CC' }}></View>
                            <Text style={[GlobalStyles.textStyle]}>{product.reviews} bình luận</Text>
                        </View>
                        <View>
                            <Text style={[GlobalStyles.textStyle, { color: Colors.primary, fontSize: 20, fontWeight: 'bold' }]}>{PriceUtils.formatPrice(PriceUtils.calculateSalePrice(product.price, product.discount))} / <Text style={{ fontWeight: 'normal' }}>{product.init}</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                            <Image source={require('./../../../../assets/icon/ic_point.png')} resizeMode="contain" />
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', marginHorizontal: 10 }]}> <Text style={{ color: 'orange', fontWeight: 'bold' }}>{PoitUtils.calculatePoints(PriceUtils.calculateSalePrice(product.price, product.discount))}</Text> </Text>
                            <IconI name="information-circle-sharp" size={22} color={Colors.textDecription} />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => { }}
                                style={{ borderWidth: 1, borderColor: Colors.primary, borderRadius: 20, width: 90 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: '#3A4CB0', padding: 10, textAlign: 'center' }]}>{product.init}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('./../../../../assets/icon/policy/ic_policy_2.png')} resizeMode="contain" style={{ width: 40, height: 40 }} />
                        <View>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, fontSize: 15 }]}>Đổi trả trong 30 ngày</Text>
                            <Text style={[GlobalStyles.textStyle, { fontSize: 14 }]}>kể từ ngày mua hàng</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                        <Image source={require('./../../../../assets/icon/policy/ic_policy_3.png')} resizeMode="contain" style={{ width: 40, height: 40 }} />

                        <View>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, fontSize: 15 }]}>Miễn phí 100%</Text>
                            <Text style={[GlobalStyles.textStyle, { fontSize: 14 }]}>đổi thuốc</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('./../../../../assets/icon/policy/ic_policy_4.png')} resizeMode="contain" style={{ width: 40, height: 40 }} />

                        <View >
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, fontSize: 15 }]}>Miễn phí vận chuyển</Text>
                            <Text style={[GlobalStyles.textStyle, { fontSize: 14 }]}>theo chính sách giao hàng</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20 }}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: '#000' }]}>
                            Thông tin sản phẩm
                        </Text>
                        <TouchableOpacity onPress={() => setShowDetail(true)}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <HTMLView value={product.desShort} textComponentProps={{ style: GlobalStyles.textStyle }} />
                    </View>
                </View>
                {/** Start Product By Category Component */}
                <View>
                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, marginTop: 50 }]}>Sản phẩm liên quan</Text>
                    <View style={{ marginVertical: 20 }}>
                        <FlatList
                            data={productRelated}
                            renderItem={({ item }) => {
                                return (
                                    <ProductCustom
                                        data={item}
                                        addToCart={() => { setProductChoose(item); setModalVisible(true); }}
                                        onPress={() => {
                                            navigation.push('productDetailScreen', { medicineId: item.id });
                                        }}
                                    />
                                )
                            }}
                            nestedScrollEnabled
                            keyExtractor={(item) => item.id + ''}
                            horizontal={true}
                            scrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                {/** End Product By Category Component */}

                {
                    productChoose && <ChooseProductToCartModalCustom
                        productChoose={productChoose}
                        visible={modalVisible}
                        setModalVisible={setModalVisible} />
                }
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                <TouchableOpacity onPress={() => navigation.navigate('consult')}>
                    <Image source={require('./../../../../assets/icon/LienHe1.png')} resizeMode="contain" style={{ width: 60, height: 60 }} />
                </TouchableOpacity>
                <ButtonCustom
                    onPress={() => { }}
                    title={"Tìm nhà thuốc"}
                    buttonStyle={{ backgroundColor: Colors.secondary, padding: 10, borderRadius: 40 }}
                    textStyle={{ color: Colors.primary, fontWeight: 'bold' }}
                />
                <ButtonCustom
                    onPress={() => { setProductChoose(product); setModalVisible(true); }}
                    title={"Chọn mua"}
                    buttonStyle={{ borderRadius: 40 }}
                />
            </View>
            <ModalCustom
                style={{ flex: 1, margin: 30 }} // Flex style
                content={
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true}>
                        <HTMLView value={product.des} textComponentProps={{ style: GlobalStyles.textStyle }} />
                    </ScrollView>
                }
                modalVisible={showDetail}
                setModalVisible={setShowDetail}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
    },
    pagerView: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: SLIDER_WIDTH,
        height: 300,
        resizeMode: 'contain',
    },
});