import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { ButtonCustom } from "../../components/ButtonCustom";
import { CarouselModel } from "../../../domain/models/CarouselModel";
import CarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from "../../components/CarouselItem";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from "react-redux";
import { findUserLogin } from "../../redux/slice/UserSlice";
import { Store } from "../../redux/store";
import { showToast } from "../../../api/AppUtils";
const initCarousels = [
    new CarouselModel('carouse01', 'Đủ thuốc theo đơn bệnh viện', 'Cam kết thuốc tốt, chính hãng & giá tốt', require('./../../../../assets/start/carousel01.png')),
    new CarouselModel('carouse02', 'Giao hàng tận nơi', 'Giao hàng nhanh chóng, tận tâm & đúng hẹn tại tất cả các tỉnh thành trên toàn quốc', require('./../../../../assets/start/carousel01.png')),
    new CarouselModel('carouse03', 'Đổi trả 30 ngày', 'Hỗ trợ đổi trả sản phẩm trong vòng 30 ngày kể từ ngày mua hàng', require('./../../../../assets/start/carousel01.png')),
];

export const StartScreen = () => {
    const [carousels, setCarousels] = useState(initCarousels);
    const isCarousel = useRef<Carousel<CarouselModel> | null>(null)
    const [index, setIndex] = useState(0)
    const navigation = useNavigation();
    const userError = useSelector((state: Store) => state.user.errorResponse);
    const dispatch = useDispatch();
    const checkToken = async () => {
        try {
            const token = await SecureStore.getItemAsync('token'); // Lấy token bằng cách sử dụng hàm bất đồng bộ
            if (token) {
                dispatch(findUserLogin());
                if (userError !== null) {
                    showToast("info", "bottom", "Thông báo", "Vui lòng đăng nhập để tiết tục.");
                } else {
                    navigation.navigate('inapp' as never);
                }
            } else {
                showToast("info", "bottom", "Thông báo", "Vui lòng đăng nhập để tiết tục.");
            }
        } catch (error) {
            console.error('Failed to get token', error);
        }
    };
    useEffect(() => {
        checkToken();
    }, []);
    return (
        <View style={[GlobalStyles.container, styles.container]}>
            <View style={{flex: 8}}>
            <Carousel
                layout="default"
                layoutCardOffset={9}
                ref={isCarousel}
                data={carousels}
                renderItem={CarouselItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={1} 
                useScrollView={false}
                vertical={false}
                onSnapToItem={(index) => setIndex(index)} />

            <Pagination
                dotsLength={carousels.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    marginHorizontal: 0,
                    backgroundColor: '#014BC4'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={1}
                tappableDots={true} />
            </View>
            <View style={{flex: 2}}>
                <ButtonCustom buttonStyle={[styles.buttonStyle, {marginBottom: 20}]} title="Tiếp tục" onPress={() => {
                    if(index == carousels.length - 1) {
                        navigation.navigate('login' as never);
                    }
                    if (isCarousel.current) {
                        isCarousel.current.snapToNext();
                    }
                }}/>
                <ButtonCustom buttonStyle={[styles.buttonStyle, {backgroundColor: '#fff'}]} textStyle={{color: '#000'}} title="Bỏ qua" onPress={() => checkToken()}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    buttonStyle: {
        width: Dimensions.get('window').width - 20,
        borderRadius: 50,
        paddingVertical: 15,
    }
});