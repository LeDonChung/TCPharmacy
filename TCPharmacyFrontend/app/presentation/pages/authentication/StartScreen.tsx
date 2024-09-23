import { useNavigation } from "@react-navigation/native"
import { Pressable, SafeAreaView, Text } from "react-native"
export const StartScreen = () => {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView>
                <Text> Start Screenn </Text>
                <Pressable onPress={() => navigation.navigate('login' as never)}>
                    <Text> Login </Text>
                </Pressable>
            </SafeAreaView>
        </>
    )
}