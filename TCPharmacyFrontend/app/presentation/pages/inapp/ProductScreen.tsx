import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"
import IconF from "react-native-vector-icons/FontAwesome";
import IconF5 from "react-native-vector-icons/FontAwesome5"
import IconFT from "react-native-vector-icons/Feather"
import { Colors } from "../../styles/Colors"
import { GlobalStyles } from "../../styles/GlobalStyles"
import { useDispatch, useSelector } from "react-redux"
import { Store } from "../../redux/store"
import { MenuItem } from "../../components/MenuItem"
import { ProductCustom } from "../../components/ProductCustom"
import { ChooseProductToCartModalCustom } from "../../components/ChooseProductToCartModalCustom"
import IconI from "react-native-vector-icons/Ionicons"
import { ProductModel } from "../../../domain/models/ProductModel"
import { setCategoryLevel1, setCategoryLevel2, setCategoryLevel3 } from "../../redux/slice/CategorySlice"
import { CategoryModel } from "../../../domain/models/CategoryModel"

const categoryProductBySubjects = [
    {
        "id": "category1",
        "title": "Bán chạy"
    },
    {
        "id": "category2",
        "title": "Giá thấp"
    },
    {
        "id": "category3",
        "title": "Giá cao"
    }

]


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

export const ProductScreen = () => {
    const route = useRoute();
    const { category } = route.params as any;
    const navigation = useNavigation();

    const cart = useSelector((state: Store) => state.cart.value);

    const [productChoose, setProductChoose] = useState(productsInit[0]);

    const [products, setProducts] = useState(productsInit);

    const [modalVisible, setModalVisible] = useState(false);



    const dispatch = useDispatch();


    const handlerActionBackCategory = () => {
        const id = categoryChoose.parent;

        const level = selectedLevel - 1;
        if (level === 1) {
            setSelectedLevel(level);
            setCategoryChoose(level1.find(value => value.id === id));
            return;
        } else if (level == 2) {
            setSelectedLevel(level);
            setCategoryChoose(level2.find(value => value.id === id));
            return;
        } else if (level == 3) {
            setSelectedLevel(level);
            setCategoryChoose(level3.find(value => value.id === id));
            return;
        }
    }

    const [categoryProductBySubject, setCategoryProductBySubject] = useState(categoryProductBySubjects);

    const [indexSubject, setIndexSubject] = useState(0);

    const [selectedLevel, setSelectedLevel] = useState(1);

    const [categoryChoose, setCategoryChoose] = useState(category);

    const level1 = useSelector((state: Store) => state.categories.value.level1);

    const level2 = useSelector((state: Store) => state.categories.value.level2);

    const level3 = useSelector((state: Store) => state.categories.value.level3);

    useEffect(() => {
        const init = async () => {
            dispatch(setCategoryLevel1());
            dispatch(setCategoryLevel2());
            dispatch(setCategoryLevel3());
            setSelectedLevel(categoryChoose.level);
        }
        init();
    }, [categoryChoose])

    const findParent = (id: number, level: number) => {
        const parent = level2.find(value => value.id === id);
        return parent?.parent;
    }
    return (
        <FlatList
            data={[]}
            keyExtractor={() => "key"}
            renderItem={null}
            ListHeaderComponent={
                <SafeAreaView style={styles.container

                }>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, backgroundColor: '#fff' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('home' as never)}>
                            <IconF name="home" size={30} color={Colors.primary} style={{}} />
                        </TouchableOpacity>
                        <Text style={[GlobalStyles.textStyle, { margin: 'auto', fontWeight: 'bold', fontSize: 18 }]}>{"Tìm kiếm"}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ marginRight: 20 }}>
                                <IconFT name="search" size={30} onPress={() => { }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 5 }}>
                                <IconF5 name="shopping-cart" size={24} color={Colors.primary} onPress={() => { navigation.navigate('cart' as never) }} />
                                <View style={{ backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', height: 15, width: 15, borderRadius: 50, position: 'absolute', top: -5, right: -5 }}>
                                    <Text style={[GlobalStyles.textStyle, { color: '#fff', fontSize: 12, textAlign: 'center' }]}>{cart.cartItems.length}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView>
                        <View>
                            {/** Start Category Level 01 */}
                            <FlatList
                                horizontal={true}
                                data={level1}
                                renderItem={({ item }) => {
                                    return ((selectedLevel == 1 && item.id === categoryChoose.id) || (selectedLevel == 2 && item.id === categoryChoose.parent) || (selectedLevel == 3 && item.id === findParent(categoryChoose.parent, selectedLevel - 1)))
                                        ? <TouchableOpacity style={{ padding: 10, backgroundColor: '#fff', height: 80, width: 120, alignItems: 'center', justifyContent: 'center', borderTopWidth: 2, borderTopColor: Colors.primary }} onPress={() => { setCategoryChoose(item) }}>
                                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary, textAlign: 'center' }]}>{item.title}</Text>
                                        </TouchableOpacity>
                                        : <TouchableOpacity style={{ padding: 10, height: 80, width: 120, alignItems: 'center', justifyContent: 'center' }} onPress={() => { setCategoryChoose(item) }}>
                                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, textAlign: 'center' }]}>{item.title}</Text>
                                        </TouchableOpacity>
                                }}
                                keyExtractor={(item) => item.id + ''}
                            />
                        </View>
                        {
                            categoryChoose.children && categoryChoose.children.length > 0 &&
                            <View>
                                {/**  Start Category Menu */}
                                <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: '#fff' }}>
                                    <View>
                                        {
                                            categoryChoose.parent
                                            && <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', paddingVertical: 15 }} onPress={
                                                () => { handlerActionBackCategory() }
                                            }>
                                                <IconF name="angle-left" size={30} style={{ marginRight: 20 }} onPress={() => { }} />
                                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>{categoryChoose.title}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    <View>
                                        <FlatList
                                            nestedScrollEnabled
                                            data={categoryChoose.children}
                                            scrollEnabled={true}
                                            renderItem={
                                                ({ item, index }) => {

                                                    const isFirstColumn = index % 2 === 0;
                                                    const isLastColumn = (index + 1) % 2 === 0;
                                                    return (
                                                        <MenuItem
                                                            styleIcon={{ flex: 0 }}
                                                            styleTitle={{ fontWeight: 'bold', fontSize: 14 }}
                                                            styleContainer={{ padding: 10, flexDirection: 'row', justifyContent: "flex-start", alignTtem: 'center', marginLeft: isFirstColumn ? 0 : 10, marginRight: isLastColumn ? 0 : 10, marginVertical: 10, height: 70, borderWidth: item.icon ? 1 : 0, borderColor: '#BDC2C7' }}
                                                            icon={item.icon}
                                                            title={item.title}
                                                            onPress={() => { setCategoryChoose(item) }}
                                                        />
                                                    )
                                                }

                                            }
                                            keyExtractor={
                                                (item) => item.id.toString()
                                            }
                                            numColumns={2}
                                        />
                                    </View>
                                </View>
                                {/**  End Category Menu */}


                            </View>
                        }
                        {/** Start Product By Subject Component */}
                        <View style={{}}>
                            <View style={{ backgroundColor: '#fff' }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, marginTop: 50, paddingHorizontal: 15, backgroundColor: '#fff' }]}>Danh sách sản phẩm</Text>
                                <View style={{ marginVertical: 20, paddingVertical: 15, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <FlatList
                                        nestedScrollEnabled
                                        data={categoryProductBySubject}
                                        scrollEnabled={true}
                                        horizontal={true}
                                        renderItem={
                                            ({ item, index }) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => { setIndexSubject(index) }}
                                                        style={{ borderWidth: 1, borderColor: index == indexSubject ? Colors.primary : '#BDC2C7', borderRadius: 20, marginRight: 20 }}>
                                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 10, color: index == indexSubject ? Colors.primary : '#000' }]}>{"Thể loại"}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }

                                        }
                                        keyExtractor={
                                            (item) => item.id
                                        }
                                    />

                                    <TouchableOpacity>
                                        <IconI name="filter-sharp" size={24} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginVertical: 20, paddingHorizontal: 15 }}>
                                <FlatList
                                    nestedScrollEnabled
                                    data={products}

                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{ marginVertical: 10 }}>
                                                <ProductCustom
                                                    image={item.images[0]}
                                                    title={item.name}
                                                    salePrice={item.price}
                                                    unit={item.unit}
                                                    specifications={item.specifications}
                                                    addToCart={() => { setProductChoose(item); setModalVisible(true); }}
                                                    onPress={() => { navigation.navigate('productDetailScreen' as never, { product: item }) }}
                                                />
                                            </View>
                                        )
                                    }}
                                    keyExtractor={(item) => item.id + ''}
                                    horizontal={false}
                                    numColumns={2}
                                    scrollEnabled={true}
                                />
                            </View>
                        </View>
                        {/** End Product By Subject Component */}
                    </ScrollView>

                    {
                        productChoose && <ChooseProductToCartModalCustom
                            productChoose={productChoose}
                            visible={modalVisible}
                            setModalVisible={setModalVisible} />
                    }
                </SafeAreaView>
            }
        />
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
    }
})