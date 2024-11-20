import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import React from "react"
import { AccountNavigation } from "./AccountNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { PageNavigation } from "./PageNavigation";
import { BonusNavigation } from "./BonusNavigation";
import { CheckoutScreen } from "../pages/inapp/CheckoutScreen";
import { ProductDetailScreen } from "../pages/inapp/ProductDetailScreen";
import { ProductScreen } from "../pages/inapp/ProductScreen";

const Stack = createStackNavigator();


export const InAppNavigation = () => {

    return (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="pageNavigation" component={PageNavigation} />
                <Stack.Screen name="accountNavigation" component={AccountNavigation} />
                <Stack.Screen name="bonusNavigation" component={BonusNavigation} />
                <Stack.Screen name="checkoutScreen" component={CheckoutScreen} />
                <Stack.Screen name="productDetailScreen" component={ProductDetailScreen} />
                <Stack.Screen name="productScreen" component={ProductScreen} />
            </Stack.Navigator>
            
        </>
    )
}