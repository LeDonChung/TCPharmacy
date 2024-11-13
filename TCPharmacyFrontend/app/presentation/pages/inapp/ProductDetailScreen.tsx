import { Dimensions, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from "react-native"
import { View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
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
import { CartModel } from "../../../domain/models/CartModel";
import { Store } from "../../redux/store";
import { ChooseProductToCartModalCustom } from "../../components/ChooseProductToCartModalCustom";
import { ProductCustom } from "../../components/ProductCustom";
import { FlatList } from "react-native";
import { ButtonCustom } from "../../components/ButtonCustom";
import { MedicineModel } from "../../../domain/models/MedicineModel";
import { BrandModel } from "../../../domain/models/BrandModel";
import { CategoryModel } from "../../../domain/models/CategoryModel";
import { getProductById } from "../../redux/slice/ProductSlice";
import RenderHTML from "react-native-render-html";
import HTMLView from "react-native-htmlview";
import { ModalCustom } from "../../components/ModalCustom";

const productsInit: ProductModel[] = [
    {
        id: 1,
        images: [
            require('./../../../../assets/products/1.webp'),
            require('./../../../../assets/products/2.webp'),
        ],
        price: 300000,
        unit: 'Hộp',
        specifications: 'Hộp 60 viên',
        category: 'Vitamin',
        desShort: 'Bột điện giải vị chanh dây Kamizol giúp cung cấp năng lượng và chất điện giải cho cơ thể.',
        name: 'Bột điện giải vị chanh dây Kamizol Sports Drink Powder 25g (5 gói)',
        brand: 'Kamizol',
        star: 4.5,
        reviews: 100,
        discount: 20,
        des: ''
    },
    {
        id: 2,
        images: [
            require('./../../../../assets/products/3.webp'),
        ],
        price: 250000,
        unit: 'Chai',
        specifications: 'Chai 500ml',
        category: 'Thực phẩm chức năng',
        desShort: 'Nước uống bổ sung Collagen vị dâu Berry giúp da căng mịn và giảm nếp nhăn.',
        name: 'Nước uống bổ sung Collagen Berry Drink 500ml',
        brand: 'Berry Collagen',
        star: 4.7,
        reviews: 220,
        discount: 15,
        des: ''
    },
    {
        id: 3,
        images: [
            require('./../../../../assets/products/2.webp'),
            require('./../../../../assets/products/1.webp'),
            require('./../../../../assets/products/3.webp'),
        ],
        price: 180000,
        unit: 'Tuýp',
        specifications: 'Tuýp 100g',
        category: 'Chăm sóc da',
        desShort: 'Kem dưỡng ẩm Vitamin E cung cấp độ ẩm và phục hồi da khô ráp.',
        name: 'Kem dưỡng ẩm Vitamin E Moisturizing Cream 100g',
        brand: 'Natural Care',
        star: 4.3,
        reviews: 150,
        discount: 10,
        des: ''
    },
    {
        id: 4,
        images: [
            require('./../../../../assets/products/4.webp'),
            require('./../../../../assets/products/2.webp'),
        ],
        price: 120000,
        unit: 'Lọ',
        specifications: 'Lọ 30 viên',
        category: 'Vitamin',
        desShort: 'Viên uống bổ sung vitamin D3 giúp hỗ trợ sức khỏe xương và tăng cường miễn dịch.',
        name: 'Viên uống bổ sung vitamin D3 30 viên',
        brand: 'Health Plus',
        star: 4.6,
        reviews: 180,
        discount: 5,
        des: ''
    },
    {
        id: 5,
        images: [
            require('./../../../../assets/products/1.webp'),
            require('./../../../../assets/products/2.webp'),
            require('./../../../../assets/products/3.webp'),
            require('./../../../../assets/products/4.webp'),
        ],
        price: 400000,
        unit: 'Hộp',
        specifications: 'Hộp 120 viên',
        category: 'Dược mỹ phẩm',
        desShort: 'Viên uống trắng da Beauty Skin giúp cải thiện độ sáng da và giảm sạm nám.',
        name: 'Viên uống trắng da Beauty Skin Complex 120 viên',
        brand: 'BeautyPro',
        star: 4.8,
        reviews: 300,
        discount: 25,
        des: ''
    },
    {
        id: 6,
        images: [
            require('./../../../../assets/products/1.webp'),
            require('./../../../../assets/products/4.webp'),
        ],
        price: 150000,
        unit: 'Lọ',
        specifications: 'Lọ 50 viên',
        category: 'Chăm sóc sức khỏe',
        desShort: 'Viên bổ sung Omega-3 giúp hỗ trợ sức khỏe tim mạch và mắt.',
        name: 'Viên dầu cá Omega-3 50 viên',
        brand: 'Heart Health',
        star: 4.4,
        reviews: 120,
        discount: 10,
        des: ''
    },
    {
        id: 7,
        images: [
            require('./../../../../assets/products/1.webp'),
        ],
        price: 210000,
        unit: 'Tuýp',
        specifications: 'Tuýp 150ml',
        category: 'Chăm sóc da',
        desShort: 'Gel rửa mặt Gentle Cleanser làm sạch sâu và duy trì độ ẩm cho da.',
        name: 'Gel rửa mặt Gentle Cleanser 150ml',
        brand: 'PureSkin',
        star: 4.2,
        reviews: 75,
        discount: 5,
        des: ''
    },
    {
        id: 8,
        images: [
            require('./../../../../assets/products/2.webp'),
            require('./../../../../assets/products/3.webp'),
        ],
        price: 320000,
        unit: 'Lọ',
        specifications: 'Lọ 90 viên',
        category: 'Vitamin',
        desShort: 'Viên bổ sung vitamin tổng hợp cho nam giới, giúp tăng cường sức khỏe và sinh lực.',
        name: 'Vitamin tổng hợp cho nam 90 viên',
        brand: 'Men’s Health',
        star: 4.6,
        reviews: 200,
        discount: 20,
        des: ''
    },
    {
        id: 9,
        images: [
            require('./../../../../assets/products/1.webp'),
            require('./../../../../assets/products/2.webp'),
        ],
        price: 190000,
        unit: 'Gói',
        specifications: 'Gói 30g',
        category: 'Thực phẩm chức năng',
        desShort: 'Bột protein vị vani giúp cung cấp năng lượng và protein cho cơ thể.',
        name: 'Bột protein vị vani 30g',
        brand: 'FitPro',
        star: 4.1,
        reviews: 80,
        discount: 15,
        des: ''
    },
    {
        id: 10,
        images: [
            require('./../../../../assets/products/1.webp'),
            require('./../../../../assets/products/2.webp'),
            require('./../../../../assets/products/3.webp'),
        ],
        price: 500000,
        unit: 'Hộp',
        specifications: 'Hộp 100 viên',
        category: 'Dược mỹ phẩm',
        desShort: 'Viên uống chống lão hóa với chiết xuất thiên nhiên, giúp duy trì vẻ tươi trẻ cho làn da.',
        name: 'Viên uống chống lão hóa 100 viên',
        brand: 'Youthful',
        star: 4.9,
        reviews: 320,
        discount: 30,
        des: ''
    }
];

type Props = {
    product: ProductModel
}
export const ProductDetailScreen = () => {
    const route = useRoute()

    const medicineId: number = (route.params as any).medicineId;

    const [index, setIndex] = useState(0);

    const navigation = useNavigation();

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    const [modalVisible, setModalVisible] = useState(false);

    const [productChoose, setProductChoose] = useState(productsInit[0]);

    const cart = useSelector((state: Store) => state.cart.value);

    const [products, setProducts] = useState(productsInit);

    const product = useSelector((state: Store) => state.product.value.product);

    const { width } = useWindowDimensions();

    const [showDetail, setShowDetail] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductById(medicineId));
    }, [])
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
            <ScrollView showsVerticalScrollIndicator={false}>

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
                            <Text style={[GlobalStyles.textStyle, { color: Colors.primary, fontSize: 20, fontWeight: 'bold' }]}>{formatPrice(product.price)} / <Text style={{ fontWeight: 'normal' }}>{product.init}</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                            <Image source={require('./../../../../assets/icon/ic_point.png')} resizeMode="contain" />
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', marginHorizontal: 10 }]}> <Text style={{ color: 'orange', fontWeight: 'bold' }}>+175 điểm thưởng</Text> </Text>
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
                            data={products}
                            renderItem={({ item }) => {
                                return (
                                    <ProductCustom
                                        image={item.images[0]}
                                        title={item.name}
                                        salePrice={item.price}
                                        unit={item.unit}
                                        specifications={item.specifications}
                                        addToCart={() => { setProductChoose(item); setModalVisible(true); }}
                                        onPress={() => { navigation.navigate('productDetailScreen' as never, { product: item }) }}
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