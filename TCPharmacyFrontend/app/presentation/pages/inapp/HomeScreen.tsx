import { Alert, BackHandler, Text, View } from "react-native"
import React, { useEffect, useRef } from "react"
import { DrawerLayout } from "react-native-gesture-handler";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawScreenLayout } from "../../components/DrawLayoutCustom";

export const HomeScreen = () => {
    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                "Thoát!",
                "Bạn có chắc chắn muốn thoát?",
                [
                    {
                        text: "Không",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "Chắc chắn", onPress: () => BackHandler.exitApp() }
                ]
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);
    const drawer = useRef(null);
    const closeDrawer = () => {
        (drawer.current as DrawerLayout | null)?.closeDrawer();
    }
    return (
        <>
            <DrawerLayout
                ref={drawer}
                drawerWidth={310}
                drawerPosition="left"
                renderNavigationView={() => {
                    return (
                        <DrawScreenLayout onClose={closeDrawer}/>
                    )
                }}
            >
                <SafeAreaView style={GlobalStyles.container}>
                    
                    <Button 
                        title="Open Drawer"
                        onPress={() => (drawer.current as DrawerLayout | null)?.openDrawer()} // Mở Drawer khi nhấn
                    />
                </SafeAreaView>
            </DrawerLayout>

        </>

    )
}