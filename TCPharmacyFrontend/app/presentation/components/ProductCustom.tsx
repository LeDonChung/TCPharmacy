import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { GlobalStyles } from "../styles/GlobalStyles"
import { Colors } from "../styles/Colors"
import { ButtonCustom } from "./ButtonCustom"
type ProductCustomProps = {
    onPress: () => void,
    title: string,
    salePrice: number,
    specifications: string,
    image: any,
    unit: string
}
export const ProductCustom = (props: ProductCustomProps) => {
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <TouchableOpacity onPress={() => { }} style={[styles.container]}>
            <Image style={styles.image} source={props.image} />
            <View>
                <Text numberOfLines={2} style={[GlobalStyles.textStyle, styles.textStyleTitle]}>
                    {props.title}
                </Text>
                <Text style={[GlobalStyles.textStyle, styles.textStylePrice]}>
                    {formatPrice(props.salePrice)}
                    <Text> / {props.unit}</Text>
                </Text>
                <View style={[styles.boxStyleUnit]}>
                    <Text style={[GlobalStyles.textStyle, styles.textStyleUnit]}>{props.specifications}</Text>
                </View>
            </View>
            <ButtonCustom
                onPress={props.onPress}
                title={"Chọn mua"}
                textStyle={[GlobalStyles.textStyle, { color: '#fff', fontWeight: 'bold' }]}
                buttonStyle={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 40, marginTop: 'auto', marginBottom: 10, width: '100%' }}
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
        marginRight: 20,
        borderRadius: 10,
        paddingHorizontal: 5
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