import { Image, Text, View } from 'react-native'
import { ButtonCustom } from './ButtonCustom'
import { Colors } from '../styles/Colors'
import { GlobalStyles } from '../styles/GlobalStyles'

export const ItemChangePoint = ({props}) => {
    //ham chuyen doi tu so sang tien te
    const formatPrice = (price, style) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + style;
    };
    return(
        <View style={{
            width: "45%", height: 335,
            backgroundColor: '#fff',
            borderRadius: 8,
            justifyContent: 'space-between',
            margin: 10
        }}>

            <Image source={props.image}
                resizeMode="contain" style={{ width: "150", height: 150 }} />
            <View style={{ padding: 10 }}>
                <Text style={[GlobalStyles.textStyle, { fontSize: 15, fontWeight: 'bold', color: "#000000" }]} numberOfLines={3}>
                    {props.name}
                </Text>
                <Text style={[GlobalStyles.textStyle, { fontSize: 14, color: Colors.primary }]}>{formatPrice(props.price, "đ")} / goi</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('./../../../assets/icon/ic_point.png')} resizeMode="contain" style={{width: 14, height: 20}} />
                    <Text style={[GlobalStyles.textStyle, { fontSize: 18, color: "#FFC700", fontWeight: 'bold', marginHorizontal: 5 }]}>{props.point}</Text>
                </View>
                <ButtonCustom title={"Đổi ngay"}
                    buttonStyle={{ width: "90%", height: 40, borderRadius: 30, backgroundColor: Colors.primary, marginVertical: 10 }}
                    textStyle={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}
                    onPress={() => { }} />
            </View>

        </View>
    )
}