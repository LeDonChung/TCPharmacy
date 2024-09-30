import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: Colors.secondary,
    },
    textStyle: {
        fontFamily: 'Roboto',
        fontWeight: 'normal',
        fontSize: 16,
        color: '#000',
    },
})