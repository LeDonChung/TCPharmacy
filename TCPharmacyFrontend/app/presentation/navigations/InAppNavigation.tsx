import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import React from "react"
import { AccountNavigation } from "./AccountNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { PageNavigation } from "./PageNavigation";
import { BonusNavigation } from "./BonusNavigation";
import { ChatScreen } from "../pages/inapp/ChatScreen";
import { CartScreen } from "../pages/inapp/CartScreen";
import { CheckoutScreen } from "../pages/inapp/CheckoutScreen";

const Stack = createStackNavigator();


export const InAppNavigation = () => {

    return (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="pageNavigation" component={PageNavigation} />
                <Stack.Screen name="accountNavigation" component={AccountNavigation} />
                <Stack.Screen name="bonusNavigation" component={BonusNavigation} />
                <Stack.Screen name="chatScreen" component={ChatScreen} />
                <Stack.Screen name="checkoutScreen" component={CheckoutScreen} />
            </Stack.Navigator>
            
        </>
    )
}