import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useAuth} from "../context/AuthContext";

//Import screen the login
import Login from "../screens/auth/Login";
import Welcome from "../screens/auth/Welcome";
import Finish from "../screens/auth/Finish";
import {HomeTabs} from "./Tab";

const AuthStackNavigation = createNativeStackNavigator();

const AuthAplication = () => {

    const { state } = useAuth();

    return (
        <AuthStackNavigation.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#094b4d',
            }}
        >
            { state == null
                ? (
                    <>
                        <AuthStackNavigation.Screen
                            name='Welcome'
                            component={Welcome}
                        />
                        <AuthStackNavigation.Screen
                            name='Login'
                            component={Login}
                        />
                        <AuthStackNavigation.Screen
                            name='Finish'
                            component={Finish}
                        />
                    </>
                )
                :
                (
                    <AuthStackNavigation.Screen
                        name='Home'
                        component={HomeTabs}
                    />
                )
            }
        </AuthStackNavigation.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <AuthAplication/>
        </NavigationContainer>
    )
}