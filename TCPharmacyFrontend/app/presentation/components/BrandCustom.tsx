import { Image, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { Colors } from "../styles/Colors"
import { GlobalStyles } from "../styles/GlobalStyles"
import { BrandModel } from "../../domain/models/BrandModel"
type BrandCustomProps = {
    item: BrandModel,
    index: number
}
export const BrandCustom = (props: BrandCustomProps) => {
    return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderRadius: 10, margin: 10 }}>
            <Image source={{uri: props.item.imageProduct}} resizeMode="contain" style={{ width: 150, height: 150, marginVertical: 20 }} />
            <View style={{ borderWidth: 1, borderColor: Colors.desciption, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 5  }}>
                <Image source={{uri: props.item.image}} resizeMode="cover" style={{ width: 100, height: 30 }} />
            </View>  
            <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18, color: Colors.primary, marginVertical: 10 }]}>Giảm đến 20%</Text>
        </TouchableOpacity>
    )
}