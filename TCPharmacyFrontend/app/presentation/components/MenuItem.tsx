import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from "react-native"
import React from "react"
import { ImageProps } from "react-native"
import { GlobalStyles } from "../styles/GlobalStyles"

type MenuItemProps = {
    icon: string | ImageSourcePropType,
    title: string,
    styleContainer?: any,
    styleIcon?: any,
    styleTitle?: any,
    onPress: () => void
}
export const MenuItem = (props: MenuItemProps) => {
    return (
        props.icon != null && props.icon !== '' ?
            (
                <TouchableOpacity style={[styles.container,props.styleContainer]} onPress={props.onPress}>
                    {props.icon != null && typeof props.icon === 'string' ?
                        <Image style={[styles.icon, props.styleIcon]} source={{ uri: String(props.icon) }} resizeMode="contain" />
                        :
                        <Image style={[styles.icon, props.styleIcon]} source={props.icon} resizeMode="contain" />
                    }
                    <Text style={[GlobalStyles.textStyle, styles.title, props.styleTitle]}> {props.title} </Text>
                </TouchableOpacity>
            )
            :

            (
                <TouchableOpacity style={[props.styleContainer, styles.containerEmpty]} onPress={props.onPress}>
                </TouchableOpacity>
            )

    )
}


const styles = StyleSheet.create({
    container: {
        width: "47%",
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 'auto'

    },
    containerEmpty: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    icon: {
        flex: 1,
        width: 47,
        height: 47
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        paddingHorizontal: 5,
    }
})