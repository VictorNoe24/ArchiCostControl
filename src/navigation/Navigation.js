import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from '@expo/vector-icons';
import {useAuth} from "../context/AuthContext";

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
import ExportImport from "../screens/Setting/ExportImport/ExportImport";

//Import screen the login
import Login from "../screens/auth/Login";
import Welcome from "../screens/auth/Welcome";
import Finish from "../screens/auth/Finish";

const HomeStackNavigator = createNativeStackNavigator();
const SettingStackNavigator = createNativeStackNavigator();
const AuthStackNavigation = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Esta es la navegación de la tap proyects
const MyStackProyects = () => {
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
const MyStackSettings = () => {

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
            <SettingStackNavigator.Screen
                name='ExportImport'
                component={ExportImport}
                options={{
                    headerTitle: 'Exportar y Importar',
                    headerShown: true,
                }}
            />
        </SettingStackNavigator.Navigator>
    )
}

//Tap de navegación
const MyTabs = () => {
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
                        component={MyTabs}
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