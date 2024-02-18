import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

//Import screen the Proyects
import HomeProyect from "../screens/Proyect/HomeProyect";
import NewProyect from "../screens/Proyect/NewProyect";

//Import screen the Settings
import HomeSttings from "../screens/Setting/HomeSttings";

const HomeStackNavigator = createNativeStackNavigator();
const SettingStackNavigator = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Esta es la navegación de la tap proyects
function MyStackProyects() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName='HomeProyects'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#094b4d',
            }}
        >
            <HomeStackNavigator.Screen
                name='HomeProyects'
                component={HomeProyect}
            />
            <HomeStackNavigator.Screen
                name='NewProyect'
                component={NewProyect}
                options={{
                    headerTitle: 'Nuevo Proyecto',
                    headerShown: true,
                }}
            />
        </HomeStackNavigator.Navigator>
    )
}

//Esta es la navegacion de la tap de setting
function MyStackSettings() {
    return (
        <SettingStackNavigator.Navigator
            initialRouteName='HomeSttings'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#094b4d',
            }}
        >
            <SettingStackNavigator.Screen
                name='HomeSettings'
                component={HomeSttings}
            />
        </SettingStackNavigator.Navigator>
    )
}

//Tap de navegación
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='ListProyects'
            screenOptions={{
                tabBarActiveBackgroundColor: '#094b4d',
            }}
        >
            <Tab.Screen
                name='ListProyects'
                component={MyStackProyects}
                options={{
                    tabBarLabel: 'Presupuestos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="file-document-multiple" size={size} color={color} />
                    ),
                    headerShown: false,
                    tabBarActiveBackgroundColor: '#094b4d',
                    tabBarActiveTintColor: '#fff'
                }}
            />
            <Tab.Screen
                name='Setting'
                component={MyStackSettings}
                options={{
                    tabBarLabel: 'Ajustes',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="brightness-5" size={size} color={color}/>
                    ),
                    headerShown: false,
                    tabBarActiveBackgroundColor: '#094b4d',
                    tabBarActiveTintColor: '#fff'
                }}
            />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    )
}