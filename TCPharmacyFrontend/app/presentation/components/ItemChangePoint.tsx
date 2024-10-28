
import { ButtonCustom } from './ButtonCustom'
import { Colors } from '../styles/Colors'
import { GlobalStyles } from '../styles/GlobalStyles'
import { Image, Text, View, StyleSheet } from 'react-native';
import React from 'react';

type ItemChangePointProps = {
    item: {
        id: any,
        image: any,
        name: string|any,
        price: number,
        point: number|any
    }
}

export const ItemChangePoint = (props: ItemChangePointProps) => {
    //ham chuyen doi tu so sang tien te
    const formatPrice = (pr:number, st:any) => {
        return pr.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + st;
    };
    return(
        <View style={{
            width: "45%", height: 335,
            backgroundColor: '#fff',
            borderRadius: 8,
            justifyContent: 'space-between',
            margin: 10
        }}>

            <Image source={props.item.image}
                resizeMode="contain" style={{ width: 150, height: 150, marginHorizontal: 'auto' }} />
            <View style={{ padding: 10 }}>
                <Text style={[GlobalStyles.textStyle, { fontSize: 15, fontWeight: 'bold', color: "#000000" }]} numberOfLines={3}>
                    {props.item.name}
                </Text>
                <Text style={[GlobalStyles.textStyle, { fontSize: 14, color: Colors.primary }]}>{formatPrice(props.item.price, "đ")} / goi</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('./../../../assets/icon/ic_point.png')} resizeMode="contain" style={{width: 14, height: 20}} />
                    <Text style={[GlobalStyles.textStyle, { fontSize: 18, color: "#FFC700", fontWeight: 'bold', marginHorizontal: 5 }]}>{props.item.point}</Text>
                </View>
                <ButtonCustom title={"Đổi ngay"}
                    buttonStyle={{ width: "90%", height: 40, borderRadius: 30, backgroundColor: Colors.primary, marginVertical: 10 }}
                    textStyle={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}
                    onPress={() => { }} />
            </View>

        </View>
    )
}