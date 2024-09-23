import { useNavigation } from "@react-navigation/native"
import { Pressable, SafeAreaView, Text } from "react-native"

export const LoginScreen = () => {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView>
                <Text> Login Screen </Text>
                <Pressable onPress={() => navigation.navigate('otp' as never)}>
                    <Text> Login </Text>
                </Pressable>
            </SafeAreaView>
        </>
    )
}