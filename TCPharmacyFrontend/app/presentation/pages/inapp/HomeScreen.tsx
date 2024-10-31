import { Alert, BackHandler, Image, Text, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { DrawerLayout, ScrollView } from "react-native-gesture-handler";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawScreenLayout } from "../../components/DrawLayoutCustom";
import { LogoCustom } from "../../components/LogoCustom";
import { Colors } from "../../styles/Colors";
import IconE from "react-native-vector-icons/Entypo";
import IconF from "react-native-vector-icons/FontAwesome";
import IconFE from "react-native-vector-icons/Feather";
import IconAD from "react-native-vector-icons/AntDesign";
import { FlatList } from "react-native";
import { MenuItem } from "../../components/MenuItem";
import Carousel from "react-native-snap-carousel";
import { BannerCustom } from "../../components/BannerCustom";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { PurchasedProduct } from "../../components/PurchasedProductItem";
import { Dimensions } from "react-native";
import { CarouselCustom } from "../../components/CarouselCustom";
import { ButtonCustom } from "../../components/ButtonCustom";
import { ProductCustom } from "../../components/ProductCustom";
import { ModalCustom } from "../../components/ModalCustom";
import { TextInput } from "react-native-paper";
import { ChooseProductToCartModalCustom } from "../../components/ChooseProductToCartModalCustom";
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1.0);
const menus = [
    {
        id: 'menu1',
        icon: require('./../../../../assets/icon/menu/ic_need.png'),
        title: 'Cần mua thuốc',
        onPress: () => { },
    },
    {
        id: 'menu2',
        icon: require('./../../../../assets/icon/menu/ic_consult.png'),
        title: 'Tư vấn với Dược Sỹ',
        onPress: () => { },
    },
    {
        id: 'menu3',
        icon: require('./../../../../assets/icon/menu/ic_find_pharmacy.png'),
        title: 'Tìm nhà thuốc',
        onPress: () => { },
    },
    {
        id: 'menu4',
        icon: require('./../../../../assets/icon/menu/ic_my_order.png'),
        title: 'Đơn của tôi',
        onPress: () => { },
    },
    {
        id: 'menu5',
        icon: require('./../../../../assets/icon/menu/ic_vaccination.png'),
        title: 'Tiêm vắc xin',
        onPress: () => { },
    },
    {
        id: 'menu6',
        icon: require('./../../../../assets/icon/menu/ic_health_check.png'),
        title: 'Kiểm tra sức khỏe',
        onPress: () => { },
    },
    {
        id: 'menu7',
        icon: require('./../../../../assets/icon/menu/ic_remeber_medicine.png'),
        title: 'Nhắc uống thuốc',
        onPress: () => { },
    },
    { id: '8', icon: null, title: '', onPress: () => { } }

]

const purchasedProducts = [
    {
        id: 1,
        image: require('./../../../../assets/imgPurcharedProduct/1.png'),
        price: 300000,
        orderDate: '10/07/2024',
    },
    {
        id: 2,
        image: require('./../../../../assets/imgPurcharedProduct/2.png'),
        price: 100000,
        orderDate: '12/07/2024',
    },
    {
        id: 3,
        image: require('./../../../../assets/imgPurcharedProduct/3.png'),
        price: 200000,
        orderDate: '11/07/2024',
    }
]


const brandFavorites = [
    {
        id: "brand1",
        logo: require('./../../../../assets/brand/ic_brand_biok.png'),
        image: require('./../../../../assets/imgPurcharedProduct/1.png'),
        discount: 20,
    },
    {
        id: "brand2",
        logo: require('./../../../../assets/brand/ic_brand_japanwell.png'),
        image: require('./../../../../assets/imgPurcharedProduct/2.png'),
        discount: 30,
    },
    {
        id: "brand3",
        logo: require('./../../../../assets/brand/ic_brand_biok.png'),
        image: require('./../../../../assets/imgPurcharedProduct/3.png'),
        discount: 20,
    }
]
const menuCategories = [
    {
        id: 'menuCategory1',
        icon: require('./../../../../assets/icon/menuCategories/vitamin 1.png'),
        title: 'Vitamin & Khoáng chất',
        onPress: () => { },
    },
    {
        id: 'menuCategory2',
        icon: require('./../../../../assets/icon/menuCategories/SinhLy-NoiTiet 1.png'),
        title: 'Sinh lý - Nội tiết tố',
        onPress: () => { },
    },
    {
        id: 'menuCategory3',
        icon: require('./../../../../assets/icon/menuCategories/CaiThienTangCuong 1.png'),
        title: 'Cải thiện tăng cường',
        onPress: () => { },
    },
    {
        id: 'menuCategory4',
        icon: require('./../../../../assets/icon/menuCategories/HoTroDieuTri 1.png'),
        title: 'Hỗ trợ điều trị',
        onPress: () => { },
    },
    {
        id: 'menuCategory5',
        icon: require('./../../../../assets/icon/menuCategories/HoTroTieuHoa 1.png'),
        title: 'Hỗ trợ tiêu hóa',
        onPress: () => { },
    },
    {
        id: 'menuCategory6',
        icon: require('./../../../../assets/icon/menuCategories/ThanKinhNao 1.png'),
        title: 'Thần kinh não',
        onPress: () => { },
    },
    {
        id: 'menuCategory7',
        icon: require('./../../../../assets/icon/menuCategories/1.png'),
        title: 'Sức khỏe tim mạch',
        onPress: () => { },
    },
    {
        id: 'menuCategory8',
        icon: require('./../../../../assets/icon/menuCategories/4.png'),
        title: 'Hỗ trợ làm đẹp',
        onPress: () => { },
    },
    {
        id: 'menuCategory9',
        icon: require('./../../../../assets/icon/menuCategories/2.png'),
        title: 'Dinh dưỡng',
        onPress: () => { },
    },
    {
        id: 'menuCategory10',
        icon: require('./../../../../assets/icon/menuCategories/6.png'),
        title: 'Hỗ trợ tình dục',
        onPress: () => { },
    },
    {
        id: 'menuCategory11',
        icon: require('./../../../../assets/icon/menuCategories/3.png'),
        title: 'Giải pháp làn da',
        onPress: () => { },
    },
    {
        id: 'menuCategory12',
        icon: require('./../../../../assets/icon/menuCategories/5.png'),
        title: 'Chăm sóc da mặt',
        onPress: () => { },
    }
]
const categoryProductBySubjects = [
    {
        "id": "category1",
        "title": "Trẻ em"
    },
    {
        "id": "category2",
        "title": "Mẹ và bé"
    },
    {
        "id": "category3",
        "title": "Người cao tuổi"
    }

]

const categorySuggestion = [
    {
        "id": "category1",
        "title": "Tìm kiếm nhiều"
    },
    {
        "id": "category2",
        "title": "Sản phẩm mới"
    },
    {
        "id": "category3",
        "title": "Vitamin tổng hợp"
    }
]

const productsInit = [
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


const policiesInit = [
    {
        id: "policy1",
        logo: require('./../../../../assets/icon/policy/ic_policy_1.png'),
        title: 'Thuốc chính hãng',
        des: "đa dạng và chuyên sâu"
    },
    {
        id: "policy2",
        logo: require('./../../../../assets/icon/policy/ic_policy_2.png'),
        title: 'Đổi trả trong 30 ngày',
        des: "kể từ ngày mua hàng"

    },
    {
        id: "policy3",
        logo: require('./../../../../assets/icon/policy/ic_policy_3.png'),
        title: 'Cam kết 100%',
        des: "chất lượng sản phẩm"

    },
    {
        id: "policy4",
        logo: require('./../../../../assets/icon/policy/ic_policy_4.png'),
        title: 'Miễn phí vận chuyển',
        des: "theo chính sách giao hàng"

    }
]
export const HomeScreen = () => {
    const navigation = useNavigation();
    // useEffect(() => {
    //     const backAction = () => {
    //         Alert.alert(
    //             "Thoát!",
    //             "Bạn có chắc chắn muốn thoát?",
    //             [
    //                 { 
    //                     text: "Không",
    //                     onPress: () => null,
    //                     style: "cancel"
    //                 },
    //                 { text: "Chắc chắn", onPress: () => BackHandler.exitApp() }
    //             ]
    //         );
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );
    //     return () => backHandler.remove();
    // }, []);

    const drawer = useRef(null);
    const closeDrawer = () => {
        (drawer.current as DrawerLayout | null)?.closeDrawer();
    }
    const [search, setSearch] = useState<string>('');

    const [productPurchaseds, setProductPurchaseds] = useState(purchasedProducts);

    const [menuCategory, setMenuCategory] = useState(menuCategories);
    const [brandFavorite, setBrandFavorites] = useState(brandFavorites);
    const [categoryProductBySubject, setCategoryProductBySubject] = useState(categoryProductBySubjects);

    const [indexSubject, setIndexSubject] = useState(0);

    const [sugg, setSugg] = useState(categorySuggestion);
    const [indexSuggestion, setIndexSuggestion] = useState(0);

    const [products, setProducts] = useState(productsInit);

    const [policies, setPolicies] = useState(policiesInit);

    const [modalVisible, setModalVisible] = useState(false);

    const [productChoose, setProductChoose] = useState(productsInit[0]);

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <>
            <DrawerLayout
                ref={drawer}
                drawerWidth={310}
                drawerPosition="left"
                renderNavigationView={() => {
                    return (
                        <DrawScreenLayout onClose={closeDrawer} />
                    )
                }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <SafeAreaView style={GlobalStyles.container}>

                        {/* <Button 
    title="Open Drawer"
    onPress={() => (drawer.current as DrawerLayout | null)?.openDrawer()} // Mở Drawer khi nhấn
/> */}
                        {/** Start Header Component */}
                        <View style={{ backgroundColor: Colors.primary, height: 200, marginHorizontal: -15 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                                <IconE name="menu" size={34} color={"#fff"} onPress={() => (drawer.current as DrawerLayout | null)?.openDrawer()} />
                                <LogoCustom color={"#fff"} />
                                <IconF name="bell" size={34} color={"#fff"} />
                            </View>
                            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                                <TextInput
                                    value={search}
                                    onChangeText={setSearch}
                                    placeholder="Tìm tên thuốc, bệnh lý, TPCN, ..."
                                    mode="outlined"
                                    outlineColor={Colors.primary}
                                    activeOutlineColor={Colors.primary}
                                    placeholderTextColor="gray"
                                    outlineStyle={{ borderRadius: 30 }}
                                    style={[GlobalStyles.textStyle, { backgroundColor: '#fff' }]}
                                    left={<TextInput.Icon icon={() => <IconFE name="search" size={30} color="gray" />} />}  // Biểu tượng bên trái
                                />
                            </View>
                        </View>
                        {/** End Header Component */}
                        {/** Start Body  Component*/}
                        <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, marginHorizontal: -15, marginTop: -30, backgroundColor: Colors.secondary }}>
                            <View style={{ paddingHorizontal: 15, paddingVertical: 30 }}>
                                <Text style={[GlobalStyles.textStyle]}>Xin chào, <Text style={{ fontWeight: 'bold' }}>ĐÔN CHỦNG</Text></Text>
                                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10 }} onPress={() => {
                                    navigation.navigate('bonusNavigation' as never);
                                }} >
                                    <Image source={require('./../../../../assets/icon/ic_point.png')} resizeMode="contain" />
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'medium', marginStart: 10 }]}>494 điểm thưởng</Text>
                                </TouchableOpacity>
                            </View>

                            {/** Start Menu Component */}
                            <View style={{ paddingHorizontal: 15, height: 300 }}>
                                <FlatList
                                    nestedScrollEnabled
                                    data={menus}
                                    scrollEnabled={false}
                                    renderItem={
                                        ({ item, index }) => {

                                            const isFirstColumn = index % 4 === 0;
                                            const isLastColumn = (index + 1) % 4 === 0;
                                            return (
                                                <MenuItem
                                                    styleContainer={{ marginLeft: isFirstColumn ? 0 : 10, marginRight: isLastColumn ? 0 : 10, marginVertical: 10, height: 110 }}
                                                    icon={item.icon}
                                                    title={item.title}
                                                    onPress={item.onPress}
                                                />
                                            )
                                        }

                                    }
                                    keyExtractor={
                                        (item) => item.id
                                    }
                                    numColumns={4}
                                />
                            </View>
                            {/** End Menu Component */}


                            {/** Start Banner Carousel Component */}
                            <View>
                                <BannerCustom />
                            </View>
                            {/** End Banner Carousel Component */}

                            {/** Start Purchased Product Component */}
                            <View style={{ paddingHorizontal: 15, marginVertical: 20 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18 }]}>Mua lại nhanh chóng</Text>
                                    <TouchableOpacity>
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary }]}>Xem tất cả</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <CarouselCustom
                                        data={productPurchaseds}
                                        layout="default"
                                        pagination={false}
                                        renderItem={PurchasedProduct}
                                        vertical={false}
                                        itemWidth={250}
                                        sliderWidth={SLIDER_WIDTH}
                                    />
                                </View>
                            </View>
                            {/** End Purchased Product Component */}
                            {/**  Start Category Menu */}
                            <View style={{ paddingHorizontal: 15, height: 600 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18 }]}>Danh mục nổi bật</Text>
                                <FlatList
                                    nestedScrollEnabled
                                    data={menuCategory}
                                    scrollEnabled={false}
                                    renderItem={
                                        ({ item, index }) => {

                                            const isFirstColumn = index % 2 === 0;
                                            const isLastColumn = (index + 1) % 2 === 0;
                                            return (
                                                <MenuItem
                                                    styleIcon={{ flex: 0 }}
                                                    styleTitle={{ fontWeight: 'bold', fontSize: 14 }}
                                                    styleContainer={{ padding: 10, flexDirection: 'row', justifyContent: "flex-start", alignTtem: 'center', marginLeft: isFirstColumn ? 0 : 10, marginRight: isLastColumn ? 0 : 10, marginVertical: 10, height: 70 }}
                                                    icon={item.icon}
                                                    title={item.title}
                                                    onPress={item.onPress}
                                                />
                                            )
                                        }

                                    }
                                    keyExtractor={
                                        (item) => item.id
                                    }
                                    numColumns={2}
                                />
                            </View>
                            {/**  End Category Menu */}
                            {/** Start Info */}
                            <View style={{ backgroundColor: '#fff' }}>
                                <View style={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EEF2FD', height: 370, margin: 15, borderRadius: 10, padding: 20 }}>
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, color: '#4E5661', textAlign: 'center' }]}>
                                        HIỂU THÊM UNG THƯ TỪ A - Z
                                    </Text>
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>
                                        Thông tin được biên soạn và kiểm duyệt bởi đội ngũ chuyên gia y tế hàng đầu
                                    </Text>
                                    <ButtonCustom buttonStyle={{ width: 150, borderRadius: 50 }} title="Tìm hiểu thêm" onPress={() => { }} />
                                    <Image source={require('./../../../../assets/banner/Untitled dsign 1.png')} resizeMode="contain" />
                                </View>
                            </View>
                            {/** End Info */}

                            {/** Start Brand Component */}
                            <View style={{ marginHorizontal: 15 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, marginTop: 50 }]}>Thương hiệu yêu thích</Text>
                                <View style={{ marginHorizontal: -15, marginVertical: 20 }}>
                                    <CarouselCustom
                                        data={brandFavorite}
                                        layout="default"
                                        pagination={false}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderRadius: 10, margin: 10 }}>
                                                    <Image source={item.image} resizeMode="contain" style={{ width: 150, height: 150, marginVertical: 20 }} />
                                                    <View style={{ borderWidth: 1, borderColor: Colors.desciption, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 5 }}>
                                                        <Image source={item.logo} resizeMode="contain" style={{ width: 100 }} />
                                                    </View>
                                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, color: Colors.primary, marginVertical: 10 }]}>Giảm đến {item.discount}%</Text>
                                                </TouchableOpacity>
                                            )
                                        }}
                                        vertical={false}
                                        itemWidth={250}
                                        sliderWidth={SLIDER_WIDTH}
                                    />
                                </View>
                            </View>
                            {/** End Brand Component */}

                            {/** Start Product By Subject Component */}
                            <View style={{ marginHorizontal: 15 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, marginTop: 50 }]}>Sản phẩm theo đối tượng</Text>
                                <View style={{ marginVertical: 20 }}>
                                    <FlatList
                                        nestedScrollEnabled
                                        data={categoryProductBySubject}
                                        horizontal={true}
                                        scrollEnabled={false}
                                        renderItem={
                                            ({ item, index }) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => { setIndexSubject(index) }}
                                                        style={{ borderWidth: 1, borderColor: index == indexSubject ? Colors.primary : '#BDC2C7', borderRadius: 20, marginRight: 20 }}>
                                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 10, color: index == indexSubject ? Colors.primary : '#000' }]}>{item.title}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }

                                        }
                                        keyExtractor={
                                            (item) => item.id
                                        }
                                    />
                                </View>
                                <View style={{ marginVertical: 20 }}>
                                    <FlatList
                                        nestedScrollEnabled
                                        data={products}
                                        renderItem={({ item }) => {
                                            return (
                                                <ProductCustom
                                                    image={item.images[0]}
                                                    title={item.name}
                                                    salePrice={item.price}
                                                    unit={item.unit}
                                                    specifications={item.specifications}
                                                    onPress={() => { () => { setProductChoose(item); setModalVisible(true) } }}
                                                />
                                            )
                                        }}
                                        keyExtractor={(item) => item.id + ''}
                                        horizontal={true}
                                        scrollEnabled={false}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                            </View>
                            {/** End Product By Subject Component */}

                            {/** Start Suggestion Component */}
                            <View style={{ marginHorizontal: 15 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, marginTop: 50 }]}>Sản phẩm theo đối tượng</Text>
                                <View style={{ marginVertical: 20 }}>
                                    <FlatList
                                        nestedScrollEnabled
                                        data={sugg}
                                        scrollEnabled={false}
                                        horizontal={true}
                                        renderItem={
                                            ({ item, index }) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => { setIndexSuggestion(index) }}
                                                        style={{ borderWidth: 1, borderColor: index == indexSuggestion ? Colors.primary : '#BDC2C7', borderRadius: 20, marginRight: 20 }}>
                                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 10, color: index == indexSuggestion ? Colors.primary : '#000' }]}>{item.title}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }

                                        }
                                        keyExtractor={
                                            (item) => item.id
                                        }
                                    />
                                </View>
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
                                                    onPress={() => { setProductChoose(item); setModalVisible(true); }}
                                                />
                                            )
                                        }}
                                        nestedScrollEnabled
                                        keyExtractor={(item) => item.id + ''}
                                        horizontal={true}
                                        scrollEnabled={false}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                            </View>
                            {/** End Suggestion Component */}

                            {/** Start Policy*/}
                            <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
                                <FlatList
                                    data={policies}
                                    renderItem={({ item }) => {
                                        return <View style={{ justifyContent: 'center', alignItems: 'center', width: '50%', marginVertical: 10 }}>
                                            <Image source={item?.logo} />
                                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }]}>
                                                {item?.title}
                                            </Text>
                                            <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription, textAlign: 'center', fontSize: 14 }]}>
                                                {item?.des}
                                            </Text>
                                        </View>
                                    }}
                                    keyExtractor={(item) => item.id}
                                    nestedScrollEnabled
                                    numColumns={2}
                                    scrollEnabled={false}
                                />
                            </View>
                            {/** End Policy*/}
                        </View>
                        {/** End Body  Component*/}
                    </SafeAreaView>
                </ScrollView>

                {
                    productChoose && <ChooseProductToCartModalCustom
                        productChoose={productChoose}
                        visible={modalVisible}
                        setModalVisible={setModalVisible} />
                }
            </DrawerLayout>

        </>

    )
}