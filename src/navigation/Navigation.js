import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from '@expo/vector-icons';

//Import screen the Proyects
import HomeProyect from "../screens/Proyect/HomeProyect";
import NewProyect from "../screens/Proyect/NewProyect";
import ListNote from "../screens/Proyect/Note/ListNote";
import NewNote from "../screens/Proyect/Note/NewNote";
import UpdateNote from "../screens/Proyect/Note/UpdateNote";
import NoteStack from "../components/Stack/NoteStack";

//Import screen the Settings
import HomeSttings from "../screens/Setting/HomeSttings";
import Profile from "../screens/Setting/EditUser/Profile";

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
            <HomeStackNavigator.Screen
                name='ListNote'
                component={ListNote}
                options={{
                    headerTitle: 'Notas',
                    headerShown: true,
                    headerRight : () => (
                        <NoteStack/>
                    )
                    
                }}
            />
            <HomeStackNavigator.Screen
                name='NewNote'
                component={NewNote}
                options={{
                    headerTitle: 'Nueva Nota',
                    headerShown: true,
                }}
            />
            <HomeStackNavigator.Screen
                name='UpdateNote'
                component={UpdateNote}
                options={{
                    headerTitle: 'Actualizar nota',
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
            <SettingStackNavigator.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerTitle: 'Perfil',
                    headerShown: true,
                }}
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
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                name='ListProyects'
                component={MyStackProyects}
                options={{
                    tabBarLabel: 'Presupuestos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="view-list" size={size} color={color} />
                    ),
                    headerShown: false,
                    tabBarActiveBackgroundColor: '#094b4d',
                    tabBarActiveTintColor: '#fff',
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