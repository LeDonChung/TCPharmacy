import IconF from "react-native-vector-icons/FontAwesome";
import IconF5 from "react-native-vector-icons/FontAwesome5";
import { HomeScreen } from "../pages/inapp/HomeScreen";
import { ConsultScreen } from "../pages/inapp/ConsultScreen";
import { CartScreen } from "../pages/inapp/CartScreen";
import { AccountScreen } from "../pages/inapp/account/AccountScreen"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import React from "react";
import { useSelector } from "react-redux";
import { Store } from "../redux/store";
export const PageNavigation = () => {
    const cart = useSelector((state: Store) => state.cart);
    return (
        <>
            <Tab.Navigator screenOptions={({ route }) => {
            return {
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'home') {
                        iconName = 'home'
                    } else if (route.name === 'consult') {
                        iconName = 'headset'
                    } else if (route.name === 'cart') {
                        iconName = 'shopping-cart'
                    } else if (route.name === 'account') {
                        iconName = 'user'
                    } else {
                        iconName = 'home'
                    }
                    return iconName ==='headset' ? <IconF5 name={iconName} size={22} color={color} /> : <IconF name={iconName} size={22} color={color} />
                },
                size: 30,
                headerShown: false,
                tabBarActiveTintColor: '#2261E2',
                tabBarInactiveTintColor: '#717D8D',
            }
        }}
        >
            <Tab.Screen name="home" component={HomeScreen} options={{
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontFamily: 'Roboto'
                }, title: 'Trang chủ'
            }} />
            <Tab.Screen name="consult" component={ConsultScreen} options={{
                        tabBarLabelStyle: {
                            fontSize: 14,
                            fontFamily: 'Roboto'
                        },
                        title: 'Tư vấn',
            }} />
                    
            <Tab.Screen name="cart" component={CartScreen} options={{
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontFamily: 'Roboto'
                },
                title: 'Giỏ hàng',
                tabBarBadge: cart.value.cartItems.length > 0 ? cart.value.cartItems.length : undefined,
            }} />
            <Tab.Screen name="account" component={AccountScreen} options={{
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontFamily: 'Roboto'
                },
                title: 'Tài khoản'
            }} />
        </Tab.Navigator>
        </>
    )
}