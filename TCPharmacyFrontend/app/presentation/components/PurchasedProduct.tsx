import React from "react";

import { View, Text, Image } from "react-native";
import { ButtonCustom } from "./ButtonCustom";
export const PurchasedProduct = () => {
    return (
        <View>
            <Text>Đơn hàng 10/07/2024</Text>
            <Image />
            <Text>136.000 đ</Text>
            <ButtonCustom 
                title={"Mua lại"}
                onPress={() => {}}
            />
        </View>
    )
}