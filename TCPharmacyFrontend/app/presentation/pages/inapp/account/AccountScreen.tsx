import { Text } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"

export const AccountScreen = () => {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView>
                <Text> AccountScreen </Text> 
                <Text onPress={() => {console.log('hi') ;navigation.navigate('account' as never);}}> QRScreen </Text>
            </SafeAreaView>
        </>
    )
}