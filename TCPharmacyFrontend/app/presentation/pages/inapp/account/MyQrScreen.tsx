import { SafeAreaView, Text } from "react-native"
import React, { useEffect } from "react"
import { useNavigation } from "@react-navigation/native";

export const MyQrScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: undefined
        });
      }, [navigation]); 
    return (
        <>
            <SafeAreaView>
                <Text> MyQrScreen </Text>
            </SafeAreaView>
        </>
    )
}