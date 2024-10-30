import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../pages/inapp/account/AccountScreen";
import { MyQrScreen } from "../pages/inapp/account/MyQrScreen";
import React from "react";
import { UserInfo } from "../pages/inapp/account/UserInfo";
import { UpdateUserInfo } from "../pages/inapp/account/UpdateUserInfo";
const Stack = createStackNavigator();
export const AccountNavigation = () => {
    return (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="accountScreen" component={AccountScreen} />
                <Stack.Screen name="MyQrScreen" component={MyQrScreen} />
                <Stack.Screen name="UserInfo" component={UserInfo} />
                <Stack.Screen name="UpdateUserInfo" component={UpdateUserInfo} />
            </Stack.Navigator>
        </>
    )
}