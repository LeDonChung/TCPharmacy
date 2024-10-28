import React from "react";

import { View, Text, Image } from "react-native";
import { ButtonCustom } from "./ButtonCustom";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Colors } from "../styles/Colors";
type PurchasedProductProps = {
    item: any,
    index: number
}

export const PurchasedProduct = (props: PurchasedProductProps) => {
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return ( 
        <View key={props.index} style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 15, borderRadius: 20}}>
            <Text style={[GlobalStyles.textStyle, {fontWeight: 'bold', textAlign: 'center'}]}>Đơn hàng {props.item.orderDate}</Text>
            <View style={{ alignItems: 'center' , justifyContent: 'center', width: 140, height: 140, borderWidth: 1, borderRadius: 10, borderColor: Colors.desciption, marginTop: 20}}>
                <Image resizeMode="contain" style={{ width: 110, height: 110}} source={props.item.image}/>
            </View>
            <Text style={[GlobalStyles.textStyle, {fontWeight: 'bold', textAlign: 'left', color: '#4E5661', marginVertical: 20}]}>{formatPrice(props.item.price)}đ</Text> 
            <ButtonCustom 
                buttonStyle={{flex: 1, backgroundColor: '#ECF0FB', borderRadius: 40, paddingHorizontal: 60}}
                title={"Mua lại"}
                textStyle={{color: Colors.primary}}
                onPress={() => {}}
            />
        </View>
    )
}