import Carousel from "react-native-snap-carousel"
import { CarouselModel } from "../../domain/models/CarouselModel"
import { useRef, useState } from "react"
import { Dimensions, Image, View } from "react-native";
import React from "react";

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1.0);
const banners = [
    new CarouselModel('banner01', '', '', require('./../../../assets/banner/Vacxin_Viemnao_bannerweb_Homepage_Web_1610x492_34ba60a578 1.png')),
    new CarouselModel('banner02', '', '', require('./../../../assets/banner/Vacxin_Viemnao_bannerweb_Homepage_Web_1610x492_34ba60a578 1.png')),
    new CarouselModel('banner03', '', '', require('./../../../assets/banner/Vacxin_Viemnao_bannerweb_Homepage_Web_1610x492_34ba60a578 1.png')),
]
type BannerProps = {
    data: CarouselModel[]
}
export const BannerCustom = (props: BannerProps) => {
    const isCarousel = useRef<Carousel<CarouselModel> | null>(null)

    const [index, setIndex] = useState(0)
    const [carousels, setCarousels] = useState(props.data);



    return (
        <Carousel
            layout="default"
            layoutCardOffset={9}
            ref={isCarousel}
            data={carousels}
            renderItem={
                ({ item, index }) => {
                    return (
                            <Image source={{uri: item.image}} style={{ width: SLIDER_WIDTH, height: 150 }} resizeMode="contain" />
                    )
                }
            }
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={1}
            useScrollView={false}
            vertical={false}
            onSnapToItem={(index) => setIndex(index)} />

    )
}