import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { GlobalStyles } from "../styles/GlobalStyles"
import { Colors } from "../styles/Colors"
import { ButtonCustom } from "./ButtonCustom"
import { MedicineModel } from "../../domain/models/MedicineModel"
import { PriceUtils } from "../../domain/utils/PriceUtils"
type ProductCustomProps = {
    onPress: () => void,
    addToCart: () => void,
    data: MedicineModel,
    styleContainer?: any
}
export const ProductCustom = (props: ProductCustomProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.container, props.styleContainer]}>
            <Image style={styles.image} source={{uri: props.data.primaryImage}} />
            <View>
                <Text numberOfLines={2} style={[GlobalStyles.textStyle, styles.textStyleTitle]}>
                    {props.data.name}
                </Text>
                <Text style={[GlobalStyles.textStyle, styles.textStylePrice]}>
                    {PriceUtils.formatPrice(PriceUtils.calculateSalePrice(props.data.price, props.data.discount))}
                    <Text> / {props.data.init}</Text>
                </Text>
                <View style={[styles.boxStyleUnit]}>
                    <Text style={[GlobalStyles.textStyle, styles.textStyleUnit]}>{props.data.specifications}</Text>
                </View>
            </View>
            <ButtonCustom
                onPress={props.addToCart}
                title={"Chọn mua"}
                textStyle={[GlobalStyles.textStyle, { color: '#fff', fontWeight: 'bold' }]}
                buttonStyle={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 40, marginTop: 'auto', marginBottom: 10, width: '95%' }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 400,
        width: 150,
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 5,
    },
    textStyleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20
    },
    textStylePrice: {
        color: Colors.primary,
        fontWeight: 'bold',
        marginVertical: 10
    },
    textStyleUnit: {
        color: '#464A56',
        fontWeight: 'bold',
        paddingHorizontal: 5,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    boxStyleUnit: {
        backgroundColor: '#E5E5E5',
        borderRadius: 10,
    },
    image: {
        marginTop: 30,
        height: 137,
        width: 137,
    }
})