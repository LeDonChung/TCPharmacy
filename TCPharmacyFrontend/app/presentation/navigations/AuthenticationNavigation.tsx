import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StartScreen } from "../pages/authentication/StartScreen"
import { LoginScreen } from "../pages/authentication/LoginScreen"
import { OTPScreen } from "../pages/authentication/OTPScreen"
const Stack = createStackNavigator()
export const AuthenticationNavigation = () => {
    return (
        <>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="start" component={StartScreen} />
                    <Stack.Screen name="login" component={LoginScreen} />
                    <Stack.Screen name="otp" component={OTPScreen} />
                </Stack.Navigator>
        </>
    )
}