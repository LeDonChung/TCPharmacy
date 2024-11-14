import { Image, TouchableOpacity, View } from "react-native"
import { ModalCustom } from "./ModalCustom"
import { Text } from "react-native"
import React, { useEffect, useReducer, useState } from 'react'
import { GlobalStyles } from "../styles/GlobalStyles"
import IconAD from "react-native-vector-icons/AntDesign";
import { Colors } from "../styles/Colors"
import { ButtonCustom } from "./ButtonCustom"
import { useDispatch } from "react-redux"
import { addProductToCart } from "../redux/slice/CartSlice"
import { CartDetailModel } from "../../domain/models/CartDetailModel"
import { useNavigation } from "@react-navigation/native"
import IconI from "react-native-vector-icons/Ionicons"
import { PriceUtils } from "../../domain/utils/PriceUtils"

type CartDetailCustomProps = {
    cartDetail: CartDetailModel,
    isChoose: boolean,
    setChoose: (value: boolean) => void;
    onUpdateQuantity: (quantity: number) => void;
    onDeleteCartDetail: (cartDetail: CartDetailModel) => void;
}

const quantityReducer = (state: number = 1, action: any) => {
    switch (action.type) {
        case 'increment':
            return state < 10 ? state + 1 : state;
        case 'decrement':
            return state > 0 ? state - 1 : state;
        case 'set': 
            return action.payload;
        default:
            return state;
    }
}
export const CartDetailCustom = (props: CartDetailCustomProps) => {

    const navigation = useNavigation();
    const [quantity, dispatchReducer] = useReducer(quantityReducer, props.cartDetail.quantity);
    const [price, setPrice] = useState(props.cartDetail.medicine.price);

    useEffect(() => {
        setPrice(props.cartDetail.medicine.price * quantity);
    }, [quantity])

     
    useEffect(() => {
        if(quantity === 0) {
            props.onDeleteCartDetail(props.cartDetail);
        } else {
            if(quantity !== props.cartDetail.quantity) {
                const cartDetail = {...props.cartDetail, quantity: quantity};
                props.onUpdateQuantity(quantity);
            }
        }
    }, [quantity])

    useEffect(() => {
        dispatchReducer({ type: 'set', payload: props.cartDetail.quantity });
    }, [props.cartDetail])


    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, paddingVertical: 15, width: '100%' }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                {props.isChoose ? 
                    <IconI size={24} name="checkmark-circle-sharp" color={Colors.primary} onPress={() => props.setChoose(!props.isChoose)}/>
                    : <IconI size={24} name="checkmark-circle-outline" color={Colors.textDecription} onPress={() => props.setChoose(!props.isChoose)}/>
                }
                <Image source={{uri: props.cartDetail.medicine.primaryImage}} resizeMode="center" style={{ width: 70, height: 70, borderWidth: 1, borderColor: '#BDC2C7', borderRadius: 10, margin: 10 }} />
                <View style={{flex: 1}}>
                    <View style={{marginLeft: 10, justifyContent: 'space-around' }}>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 15 }]} numberOfLines={2}>{props.cartDetail.medicine.name}</Text>
                        <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 14, color: Colors.primary, marginVertical: 10 }]}>
                            {formatPrice(PriceUtils.calculateSalePrice(props.cartDetail.medicine.price, props.cartDetail.medicine.discount))}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => dispatchReducer({ type: 'decrement' })}
                                style={{ height: 30, borderWidth: 1, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderColor: '#AFB0B3', justifyContent: 'center', paddingHorizontal: 5 }}>
                                <IconAD name="minus" size={24} color={Colors.primary} style={{ textAlign: 'center' }} />
                            </TouchableOpacity>
                            <View style={{ borderWidth: 1, borderColor: '#AFB0B3', justifyContent: 'center', height: 30 }}>
                                <Text style={{ textAlign: 'center', width: 30 }}>{quantity}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => dispatchReducer({ type: 'increment' })}
                                style={{ height: 30, borderWidth: 1, borderBottomRightRadius: 20, borderTopRightRadius: 20, borderColor: '#AFB0B3', justifyContent: 'center', paddingHorizontal: 5 }}>
                                <IconAD name="plus" size={24} color={Colors.primary} style={{ textAlign: 'center' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <TouchableOpacity
                                onPress={() => { }}
                                style={{ borderWidth: 1, borderColor: Colors.primary, borderRadius: 20, width: 90, height: 30, justifyContent: 'center' }}>
                                <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: '#3A4CB0', textAlign: 'center', fontSize: 14 }]}>{props.cartDetail.medicine.init}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ marginVertical: 5 }}>

            </View>
        </View >
    )
}