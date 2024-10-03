import { Dimensions, Image, Text } from "react-native";
import { CarouselModel } from "../../domain/models/CarouselModel";
import { LogoCustom } from "./LogoCustom";
import { View } from "react-native";
import { ImageBackground } from "react-native";
import React from "react"
import { GlobalStyles } from "../styles/GlobalStyles";

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1.0);


type CarouselItemProps = {
    item: CarouselModel,
    index: number
}
const CarouselItem = (props: CarouselItemProps) => {
    return (
        <View style={{flex: 1}}>
            <ImageBackground source={props.item.image} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 60, marginBottom: 40}}>
                <LogoCustom color="#fff"  />
            </ImageBackground>
            <View style={{paddingHorizontal: 20}}>
                <Text style={[GlobalStyles.textStyle, { marginBottom: 20 ,fontWeight: 'bold', fontSize: 20, textAlign: 'center' }]}>{props.item.title}</Text>
                <Text style={[GlobalStyles.textStyle, { color: '#000', textAlign: 'center' }]}>{props.item.description}</Text>
            </View>
        </View>
    )
}

export default CarouselItem;
