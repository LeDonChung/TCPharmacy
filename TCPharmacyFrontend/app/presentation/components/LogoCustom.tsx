import { Image, Text, View } from "react-native"
import { GlobalStyles } from "../styles/GlobalStyles"
import React from "react"

type LogoCustomProps = {
    color: string
}
export const LogoCustom = (props: LogoCustomProps) => {
    return (
        <>
            <View style={{ height: 45, flexDirection: 'row', alignItems: "center", justifyContent: 'center'}}>
                <Image style={{height: 45, marginRight: 10}} source={require('././../../../assets/logo_90_90.png')}/>
                <View>
                    <Text style={[GlobalStyles.textStyle, {fontSize: 18, color: props.color, fontWeight: 'bold'}]}>NHÀ THUỐC</Text>
                    <Text style={[GlobalStyles.textStyle, {fontSize: 18, color: props.color, fontWeight: 'bold'}]}>THERA CARE</Text>
                </View>
            </View>
        </>
    )
}