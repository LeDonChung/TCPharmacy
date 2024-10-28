import React, { useRef, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';

type CarouselCustomProps = {
    layout: 'default' | 'stack' | 'tinder';
    data: any,
    renderItem: any,
    sliderWidth?: number,
    itemWidth?: number,
    vertical: boolean,
    pagination: boolean
    sliderHeight?: number
    itemHeight?: number
}
export const CarouselCustom = (props: CarouselCustomProps) => {
    const isCarousel = useRef<null>(null)
    const [index, setIndex] = useState(0)
    const [data, setData] = useState(props.data)

    return (
        <>
            {!props.vertical ?
            (
                <Carousel
                layout={props.layout}
                layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={props.renderItem}
                sliderWidth={props.sliderWidth || 0}
                itemWidth={props.itemWidth || 0}
                inactiveSlideShift={1}
                useScrollView={false}
                vertical={false} 
                onSnapToItem={(index) => setIndex(index)} />
            )    :
            (
                <Carousel
                layout={props.layout}
                layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={props.renderItem}
                sliderHeight={props.sliderHeight || 0} // Provide a default value for sliderHeight
                itemHeight={props.itemHeight || 0} // Provide a default value for itemHeight
                inactiveSlideShift={1}
                useScrollView={false}
                vertical={true} 
                onSnapToItem={(index) => setIndex(index)} />
            )
        }
            {props.pagination &&
                <Pagination
                    dotsLength={data.length}
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
            }
        </>
    )
}