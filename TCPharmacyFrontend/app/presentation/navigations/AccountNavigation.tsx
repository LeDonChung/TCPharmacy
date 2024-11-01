import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../pages/inapp/account/AccountScreen";
import { MyQrScreen } from "../pages/inapp/account/MyQrScreen";
import React from "react";
import { UserInfo } from "../pages/inapp/account/UserInfo";
import { UpdateUserInfo } from "../pages/inapp/account/UpdateUserInfo";
import { Location } from "../pages/inapp/account/Location";
import { EditLocation } from "../pages/inapp/account/EditLocation";
const Stack = createStackNavigator();
export const AccountNavigation = () => {
    return (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="accountScreen" component={AccountScreen} />
                <Stack.Screen name="MyQrScreen" component={MyQrScreen} />
                <Stack.Screen name="UserInfo" component={UserInfo} />
                <Stack.Screen name="UpdateUserInfo" component={UpdateUserInfo} />
                <Stack.Screen name="LocationScreen" component={Location} />
                <Stack.Screen name="EditLocationScreen" component={EditLocation} />
            </Stack.Navigator>
        </>
    )
}