import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import React from "react"
import { AccountNavigation } from "./AccountNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { PageNavigation } from "./PageNavigation";
import { BonusNavigation } from "./BonusNavigation";

const Stack = createStackNavigator();


export const InAppNavigation = () => {

    return (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="pageNavigation" component={PageNavigation} />
                <Stack.Screen name="accountMavigation" component={AccountNavigation} />
                <Stack.Screen name="bonusNavigation" component={BonusNavigation} />
            </Stack.Navigator>
            
        </>
    )
}