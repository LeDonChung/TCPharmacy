import { Alert, BackHandler, Image, LogBox, RefreshControl, Text, View } from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { PurchasedProduct } from "../../components/PurchasedProductItem";
import { Dimensions } from "react-native";
import { CarouselCustom } from "../../components/CarouselCustom";
import { ButtonCustom } from "../../components/ButtonCustom";
import { ProductCustom } from "../../components/ProductCustom";
import { ModalCustom } from "../../components/ModalCustom";
import { TextInput } from "react-native-paper";
import { ChooseProductToCartModalCustom } from "../../components/ChooseProductToCartModalCustom";
import { ProductModel } from "../../../domain/models/ProductModel";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../redux/store";
import { getAllCategories, setDraw, setOutstanding } from "../../redux/slice/CategorySlice";
import { findUserLogin } from "../../redux/slice/UserSlice";
import * as SecureStore from 'expo-secure-store';

import { getProductById, getAllProducts } from "../../redux/slice/ProductSlice";

import { showToast } from "../../../api/AppUtils";
import { CategoryModel } from "../../../domain/models/CategoryModel";
import { BrandCustom } from "../../components/BrandCustom";
import { getBrandsFavorite } from "../../redux/slice/BrandSlice";
import { getTagGroupById, getTagGroups } from "../../redux/slice/TagGroupSlice";
import { MedicineModel } from "../../../domain/models/MedicineModel";
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

    const [refreshing, setRefreshing] = useState(false);


    const drawer = useRef(null);
    const closeDrawer = () => {
        (drawer.current as DrawerLayout | null)?.closeDrawer();
    }
    const [search, setSearch] = useState<string>('');

    const [productPurchaseds, setProductPurchaseds] = useState(purchasedProducts);

    const menuCategory = useSelector((state: Store) => state.categories.value.outstanding);

    const brandFavorite = useSelector((state: Store) => state.brand.brands);

    const [policies, setPolicies] = useState(policiesInit);

    const [modalVisible, setModalVisible] = useState(false);

    const [productChoose, setProductChoose] = useState(new MedicineModel());

    const userLogin = useSelector((state: Store) => state.user.userLogin);
    const dispatch = useDispatch();

    const banner = useSelector((state: Store) => state.banner);
    const tagGroupByObject = useSelector((state: Store) => state.tagGroup.value.tagGroupByObject);

    const [productsByObject, setProductsByObject] = useState([] as MedicineModel[]);
    const [indexSubject, setIndexSubject] = useState(0);

    const tagGroupSuggestions = useSelector((state: Store) => state.tagGroup.value.tagGroupSuggestions);

    const [sugg, setSugg] = useState([] as MedicineModel[]);
    const [indexSuggestion, setIndexSuggestion] = useState(0);

    const init = async () => {
        try {
            setRefreshing(true);
            await dispatch(getAllCategories());
            await dispatch(getBrandsFavorite());
            await dispatch(getTagGroups());
            dispatch(setDraw());
            dispatch(setOutstanding());
        } catch (error) {
            console.error("Initialization error:", error);
        } finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            dispatch(findUserLogin())
                .unwrap()
                .catch((error) => {
                    showToast('error', 'bottom', 'Lỗi', 'Vui lòng đăng nhập.');
                    SecureStore.deleteItemAsync('token');
                    navigation.navigate('authentication' as never);
                });
            init();
        }, [navigation])
    );

    const onRefresh = useCallback(() => {
        init();
    }, []);

    useEffect(() => {
        const checkTokenAndSetProducts = async () => {
            const token = await SecureStore.getItemAsync('token');
            if (token) {
                setProductsByObject(tagGroupByObject.tags[indexSubject].medicines);
            }
        };
        checkTokenAndSetProducts();
    }, [indexSubject]);

    useEffect(() => {
        const checkTokenAndSetSugg = async () => {
            const token = await SecureStore.getItemAsync('token');
            if (token) {
                setSugg(tagGroupSuggestions.tags[indexSuggestion].medicines);
            }
        };
        checkTokenAndSetSugg();
    }, [indexSuggestion]);

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
                <FlatList
                    data={[]}
                    keyExtractor={() => "key"}
                    renderItem={null}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListHeaderComponent={
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
                                        <TouchableOpacity onPress={() => (drawer.current as DrawerLayout | null)?.openDrawer()} >
                                            <IconE name="menu" size={34} color={"#fff"} />
                                        </TouchableOpacity>
                                        <LogoCustom color={"#fff"} />
                                        <TouchableOpacity onPress={() => showToast('info', "bottom", "Thông báo", "Chức năng đang được phát triển")} >
                                            <IconF name="bell" size={34} color={"#fff"} />
                                        </TouchableOpacity>

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
                                        <Text style={[GlobalStyles.textStyle]}>Xin chào, <Text style={{ fontWeight: 'bold' }}>
                                            {userLogin.fullName ? userLogin.fullName : 'Khách hàng'}
                                        </Text></Text>
                                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10 }} onPress={() => {
                                            navigation.navigate('bonusNavigation' as never);
                                        }} >
                                            <Image source={require('./../../../../assets/icon/ic_point.png')} resizeMode="contain" />
                                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'medium', marginStart: 10 }]}>{userLogin.currentPoint} điểm thưởng</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/** Start Menu Component */}
                                    <View style={{ height: 300 }}>
                                        <FlatList
                                            data={menus}
                                            renderItem={({ item }) => (
                                                <View
                                                    style={{
                                                        width: "20%", 
                                                        alignItems: "center",                                                         
                                                        marginVertical: 10, 
                                                        marginHorizontal: 'auto'
                                                    }}
                                                >
                                                    <MenuItem
                                                        styleContainer={{ height: 110, width: "100%" }}
                                                        icon={item.icon}
                                                        title={item.title}
                                                        onPress={() => showToast('info', "bottom", "Thông báo", "Chức năng đang được phát triển")}
                                                    />
                                                </View>
                                            )}
                                            keyExtractor={(item) => item.id}
                                            numColumns={4}
                                        />
                                    </View>
                                    {/** End Menu Component */}


                                    {/** Start Banner Carousel Component */}
                                    <View>
                                        <BannerCustom data={banner} />
                                    </View>
                                    {/** End Banner Carousel Component */}

                                    {/** Start Purchased Product Component */}
                                    <View style={{ paddingHorizontal: 15, marginVertical: 20 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18 }]}>Mua lại nhanh chóng</Text>
                                            <TouchableOpacity onPress={() => showToast('info', "bottom", "Thông báo", "Chức năng đang được phát triển")}>
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
                                    <View style={{ paddingHorizontal: 15, height: 520, marginTop: 20 }}>
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18 }]}>Danh mục nổi bật</Text>
                                        <FlatList
                                            nestedScrollEnabled
                                            data={menuCategory}
                                            scrollEnabled={true}
                                            renderItem={
                                                ({ item, index }) => {

                                                    const isFirstColumn = index % 2 === 0;
                                                    const isLastColumn = (index + 1) % 2 === 0;

                                                    return (
                                                        <MenuItem
                                                            styleIcon={{ width: 40, height: 40, flex: 0 }}
                                                            styleTitle={{ fontWeight: 'bold', fontSize: 14 }}
                                                            styleContainer={{ padding: 10, flexDirection: 'row', marginLeft: isFirstColumn ? 0 : 10, marginRight: isLastColumn ? 0 : 10, marginVertical: 10, height: 70 }}
                                                            icon={item.icon}
                                                            title={item.title}
                                                            onPress={() => { navigation.navigate('productScreen' as never, { category: item }) }}
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
                                            <ButtonCustom buttonStyle={{ width: 150, borderRadius: 50 }} title="Tìm hiểu thêm" onPress={() => { showToast('info', "bottom", "Thông báo", "Chức năng đang được phát triển") }} />
                                            <Image source={require('./../../../../assets/banner/Untitled dsign 1.png')} resizeMode="contain" />
                                        </View>
                                    </View>
                                    {/** End Info */}

                                    {/** Start Brand Component */}
                                    <View style={{ marginHorizontal: 15 }}>
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, marginTop: 50 }]}>Thương hiệu yêu thích</Text>
                                        <View style={{ marginHorizontal: -15, marginVertical: 20 }}>
                                            <FlatList
                                                data={brandFavorite}
                                                renderItem={({ item, index }) => {
                                                    return <BrandCustom index={index} item={item} />
                                                }}
                                                keyExtractor={(item) => item.id.toString()}
                                                horizontal={true}
                                                scrollEnabled={true}
                                                showsHorizontalScrollIndicator={false}
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
                                                data={tagGroupByObject.tags}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                scrollEnabled={true}
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
                                                    (item) => item.id.toString()
                                                }
                                            />
                                        </View>
                                        <View style={{ marginVertical: 20 }}>
                                            <FlatList
                                                nestedScrollEnabled
                                                data={productsByObject}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <ProductCustom
                                                            data={item}
                                                            addToCart={() => { setProductChoose(item); setModalVisible(true); }}
                                                            onPress={() => { navigation.navigate('productDetailScreen' as never, { medicineId: item.id }) }}
                                                        />
                                                    )
                                                }}
                                                keyExtractor={(item) => item.id + ''}
                                                horizontal={true}
                                                scrollEnabled={true}
                                                showsHorizontalScrollIndicator={false}
                                            />
                                        </View>
                                    </View>
                                    {/** End Product By Subject Component */}

                                    {/** Start Suggestion Component */}
                                    <View style={{ marginHorizontal: 15 }}>
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, marginTop: 50 }]}>Gợi ý hôm nay</Text>
                                        <View style={{ marginVertical: 20 }}>
                                            <FlatList
                                                nestedScrollEnabled
                                                data={tagGroupSuggestions.tags}
                                                scrollEnabled={true}
                                                showsHorizontalScrollIndicator={false}
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
                                                    (item) => item.id.toString()
                                                }
                                            />
                                        </View>
                                        <View style={{ marginVertical: 20 }}>
                                            <FlatList
                                                data={sugg}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <ProductCustom
                                                            data={item}
                                                            addToCart={() => { setProductChoose(item); setModalVisible(true); }}
                                                            onPress={() => { navigation.navigate('productDetailScreen' as never, { medicineId: 17 }) }}
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
                                            scrollEnabled={true}
                                        />
                                    </View>
                                    {/** End Policy*/}
                                </View>
                                {/** End Body  Component*/}
                            </SafeAreaView>
                        </ScrollView>
                    }
                />


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