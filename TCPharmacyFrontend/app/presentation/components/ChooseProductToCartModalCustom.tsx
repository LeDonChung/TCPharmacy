import { Image, TouchableOpacity, View } from "react-native"
import { ModalCustom } from "./ModalCustom"
import { Text } from "react-native"
import React, { useEffect, useState } from 'react'
import { GlobalStyles } from "../styles/GlobalStyles"
import IconAD from "react-native-vector-icons/AntDesign";
import { Colors } from "../styles/Colors"
import { ButtonCustom } from "./ButtonCustom"


type ChooseProductToCartProps = {
    productChoose: any,
    visible: boolean,
    onClose?: () => void
    setModalVisible: (value: boolean) => void;
}

const quantityReducer = (state: number, action: any) => {
    switch (action.type) {
        case 'increment':
            return state < 10 ? state + 1: state;
        case 'decrement':
            return state > 1 ? state - 1: state;
        default:
            return state;
    }
}
export const ChooseProductToCartModalCustom = (props: ChooseProductToCartProps) => {

    const [quantity, dispatch] = React.useReducer(quantityReducer, 1);

    const [price, setPrice] = useState(props.productChoose.price);

    useEffect(() => {
        setPrice(props.productChoose.price * quantity);
    }, [quantity])


    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    return (
        <ModalCustom
            modalVisible={props.visible}
            setModalVisible={props.setModalVisible}
            content={
                <View style={{ height: 520, alignItems: 'center' }}>
                    <View style={{ height: 50, justifyContent: 'center', borderBottomWidth: 1, borderColor: '#BDC2C7', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', flex: 1, textAlign: 'center' }]}>Chọn số lượng, đơn vị</Text>
                    </View>
                    <View style={{ flex: 1, marginVertical: 20 }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Image source={props.productChoose.images[0]} resizeMode="center" style={{ width: 100, height: 100, borderWidth: 1, borderColor: '#BDC2C7', borderRadius: 10, padding: 5 }} />
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'space-around' }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 15 }]} numberOfLines={2}>{props.productChoose.name}</Text>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 14, color: Colors.primary }]}>
                                    {formatPrice(props.productChoose.price)}
                                    <Text style={{ fontWeight: 'medium' }}>
                                        {' / ' + props.productChoose.unit}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 15, color: '#464A56', marginVertical: 10 }]}>Đơn vị</Text>
                            <TouchableOpacity
                                onPress={() => { }}
                                style={{ borderWidth: 1, borderColor: Colors.primary, borderRadius: 20, width: 90 }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: '#3A4CB0', padding: 10, textAlign: 'center' }]}>{props.productChoose.unit}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 15, color: '#464A56', marginVertical: 10 }]}>Số lượng</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => dispatch({ type: 'decrement' }) }
                                    style={{ borderWidth: 1, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderColor: '#AFB0B3', justifyContent: 'center', paddingHorizontal: 5 }}>
                                    <IconAD name="minus" size={30} color={Colors.primary} style={{ textAlign: 'center' }} />
                                </TouchableOpacity>
                                <View style={{ borderWidth: 1, borderColor: '#AFB0B3', justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', padding: 12, width: 40 }}>{quantity}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => dispatch({ type: 'increment' })}
                                    style={{ borderWidth: 1, borderBottomRightRadius: 20, borderTopRightRadius: 20, borderColor: '#AFB0B3', justifyContent: 'center', paddingHorizontal: 5 }}>
                                    <IconAD name="plus" size={30} color={Colors.primary} style={{ textAlign: 'center' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 15, color: '#464A56', marginVertical: 10 }]}>Tạm tính</Text>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 15, color: '#000', marginVertical: 10 }]}>{formatPrice(price)}đ</Text>
                        </View>
                        <View style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 15, color: '#464A56', marginVertical: 10 }]}>Tiết kiệm được</Text>
                            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 15, color: '#000', marginVertical: 10 }]}>0đ</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <ButtonCustom title="Thêm vào giỏ" onPress={() => { }} buttonStyle={{ borderRadius: 50, width: '45%', backgroundColor: '#EAF0F3' }} textStyle={{ fontSize: 14, color: Colors.primary }} />
                            <ButtonCustom title="Mua ngay" buttonStyle={{ borderRadius: 50, width: '45%' }} textStyle={{ fontSize: 14 }} onPress={() => { }} />
                        </View>
                    </View>
                </View>
            }
        />
    )
}