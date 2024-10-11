import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../pages/inapp/account/AccountScreen";
import { MyQrScreen } from "../pages/inapp/account/MyQrScreen";
import React from "react";
const Stack = createStackNavigator();
export const AccountNavigation = () => {
    return (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="MyQrScreen" component={MyQrScreen} />
            </Stack.Navigator>
        </>
    )
}