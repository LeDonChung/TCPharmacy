import { useNavigation } from "@react-navigation/native"
import { Image, ImageBackground, Pressable, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { GlobalStyles } from "../../styles/GlobalStyles"
import { ButtonCustom } from "../../components/ButtonCustom"
import  Icon  from "react-native-vector-icons/FontAwesome"
export const StartScreen = () => {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={[GlobalStyles.container, styles.container]}>
                <Image style={{width: '100%'}} source={require('./../../../../assets/start/first.png')} />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0
    }
})