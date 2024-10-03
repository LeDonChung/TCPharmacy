import { useNavigation } from "@react-navigation/native"
import { Pressable, SafeAreaView, Text } from "react-native"
import React from "react"

export const OTPScreen = () => {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView>
                <Text> OTP Screen </Text>
                <Pressable onPress={() => navigation.navigate('inapp' as never)}>
                    <Text> Login </Text>
                </Pressable>
            </SafeAreaView>
        </>
    )
}