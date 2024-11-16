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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"
import { getProductsByCategoryId } from "../../redux/slice/ProductSlice"
import { MedicineModel } from "../../../domain/models/MedicineModel"

export const ProductScreen = () => {
    const route = useRoute();
    const { category } = route.params as any;
    const navigation = useNavigation();

    const cart = useSelector((state: Store) => state.cart.value);

    const [productChoose, setProductChoose] = useState({} as MedicineModel);

    const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useDispatch();
    const [selectedLevel, setSelectedLevel] = useState(1);

    const handlerActionBackCategory = () => {
        const id = categoryChoose.parent;
        console.log("id", id);

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

    const [indexSubject, setIndexSubject] = useState(2);

    const [categoryChoose, setCategoryChoose] = useState(category);

    const [paging, setPaging] = useState({ categoryId: category.id, page: 0, size: 10 });

    const level1 = useSelector((state: Store) => state.categories.value.level1);

    const level2 = useSelector((state: Store) => state.categories.value.level2);

    const level3 = useSelector((state: Store) => state.categories.value.level3);

    const products = useSelector((state: Store) => state.product.value.products);

    const [productList, setProductList] = useState(products as MedicineModel[]);

    const handleClickCategory = (item: CategoryModel) => {
        setCategoryChoose(item);
        setPaging({ ...paging, categoryId: item.id });
        setIndexSubject(2);
    }

    useEffect(() => {
        const init = async () => {
            dispatch(setCategoryLevel1());
            dispatch(setCategoryLevel2());
            dispatch(setCategoryLevel3());
            dispatch(getProductsByCategoryId(paging));
            setSelectedLevel(categoryChoose.level);
            setProductList(products);
        }
        init();
    }, [navigation, categoryChoose]);

    const filterProductBySubject = () => {
        const productsFilter = [...products];
        if (indexSubject === 0) {
            productsFilter.sort((a, b) => a.price - b.price);
        } else if (indexSubject === 1) {
            productsFilter.sort((a, b) => b.price - a.price);
        }
        setProductList(productsFilter);
    }

    useEffect(() => {
        filterProductBySubject();
    }, [products]);

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
                                        ? <TouchableOpacity style={{ padding: 10, backgroundColor: '#fff', height: 80, width: 120, alignItems: 'center', justifyContent: 'center', borderTopWidth: 2, borderTopColor: Colors.primary }}
                                            onPress={() => {
                                                handleClickCategory(item);
                                            }}>
                                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary, textAlign: 'center' }]}>{item.title}</Text>
                                        </TouchableOpacity>
                                        : <TouchableOpacity style={{ padding: 10, height: 80, width: 120, alignItems: 'center', justifyContent: 'center' }}
                                            onPress={() => {
                                                handleClickCategory(item);
                                            }}>
                                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.textDecription, textAlign: 'center' }]}>{item.title}</Text>
                                        </TouchableOpacity>
                                }}
                                keyExtractor={(item) => item.id + ''}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: '#fff' }}>
                            <View>
                                {
                                    categoryChoose.parent
                                    && <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', paddingVertical: 15 }} onPress={
                                        () => { handlerActionBackCategory() }
                                    }>
                                        <IconF name="angle-left" size={30} style={{ marginRight: 20 }} onPress={() => {
                                            handlerActionBackCategory();
                                        }} />
                                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold' }]}>{categoryChoose.title}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            {
                                categoryChoose.children && categoryChoose.children.length > 0 &&
                                <View>
                                    {/**  Start Category Menu */}
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
                                                            onPress={() => {
                                                                handleClickCategory(item);
                                                            }}
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

                                </View>
                            }
                        </View>
                        {/** Start Product By Subject Component */}
                        <View style={{}}>
                            <View style={{ backgroundColor: '#fff' }}>
                                <Text style={[GlobalStyles.textStyle,
                                { fontWeight: 'bold', fontSize: 18,paddingHorizontal: 15, backgroundColor: '#fff', marginVertical: 20 }]}>
                                    Danh sách sản phẩm
                                </Text>

                            </View>
                            <View style={{ marginVertical: 20, paddingHorizontal: 15, }}>
                                <FlatList
                                    nestedScrollEnabled
                                    data={productList}

                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{
                                                width: "47%", marginHorizontal: (index + 1) % 2 === 0 ? 'auto' : 0,
                                            }}>
                                                <ProductCustom
                                                    data={item}
                                                    addToCart={() => { setProductChoose(item); setModalVisible(true); }}
                                                    onPress={() => { navigation.navigate('productDetailScreen' as never, { medicineId: item.id }) }}
                                                    styleContainer={{ width: "100%" }}
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
                        productList.length % 10 === 0 &&
                        <TouchableOpacity style={{ 
                            width: "40%", height: 40, marginHorizontal: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                            marginBottom: 20
                             }}
                            onPress={() => {
                                dispatch(getProductsByCategoryId({ ...paging, size: paging.size + 10 }));
                            }}>
                            <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription }]}>Xem thêm </Text>
                            <IconFT name="chevrons-down" size={20} color={Colors.textDecription} />
                        </TouchableOpacity>
                    }



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