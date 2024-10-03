import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import React from "react";
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { StyleSheet, View } from "react-native";
import CarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from "./CarouselItem";
import { CarouselModel } from "../../domain/models/CarouselModel";
const initCarousels = [
    new CarouselModel('carouse01', 'Đủ thuốc theo đơn bệnh viện', 'Cam kết thuốc tốt, chính hãng & giá tốt', require('./../../../assets/start/carousel01.png')),
    new CarouselModel('carouse02', 'Giao hàng tận nơi', 'Giao hàng nhanh chóng, tận tâm & đúng hẹn tại tất cả các tỉnh thành trên toàn quốc', require('./../../../assets/start/carousel01.png')),
    new CarouselModel('carouse03', 'Đổi trả 30 ngày', 'Hỗ trợ đổi trả sản phẩm trong vòng 30 ngày kể từ ngày mua hàng', require('./../../../assets/start/carousel01.png')),
];

export const CarouselCustom = () => {
    const [carousels, setCarousels] = useState(initCarousels);
    const isCarousel = useRef(null)
    const [index, setIndex] = useState(0)
    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
})