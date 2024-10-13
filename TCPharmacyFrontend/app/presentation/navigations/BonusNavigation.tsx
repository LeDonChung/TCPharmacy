import { createStackNavigator } from "@react-navigation/stack";
import { MyQrScreen } from "../pages/inapp/account/MyQrScreen";
import React from "react";
import { BonusPointScreen } from "../pages/inapp/BonusPointScreen";
const Stack = createStackNavigator();
export const BonusNavigation = () => {
    return (
        <>
            <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {flex: 1}}}>
                <Stack.Screen name="bonusPoint" component={BonusPointScreen} />
            </Stack.Navigator>
        </>
    )
}