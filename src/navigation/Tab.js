import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MaterialIcons} from "@expo/vector-icons";

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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


//Esta es la navegación de la tap proyects
const MyStackProyects = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#094b4d',
            }}
        >
            <Stack.Screen
                name='NewProyects'
                component={NewProyect}
                options={{
                    headerTitle: 'Nuevo Proyecto',
                    headerShown: true,
                }}
            />
            <Stack.Screen
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
            <Stack.Screen
                name='NewNote'
                component={NewNote}
                options={{
                    headerTitle: 'Nueva Nota',
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name='UpdateNote'
                component={UpdateNote}
                options={{
                    headerTitle: 'Actualizar nota',
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}

//Esta es la navegacion de la tap de setting
const MyStackSettings = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#094b4d',
            }}
        >
            <Stack.Screen
                name='ProfileUser'
                component={Profile}
                options={{
                    headerTitle: 'Perfil',
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name='ExportImport'
                component={ExportImport}
                options={{
                    headerTitle: 'Exportar y Importar',
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}

//Tap de navegación
const MyTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: '#094b4d',
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                name='HomeProyects'
                component={HomeProyect}
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
                name='HomeSettings'
                component={HomeSttings}
                options={{
                    tabBarLabel: 'Ajustes',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="brightness-5" size={size} color={color}/>
                    ),
                    headerShown: false,
                    tabBarActiveBackgroundColor: '#094b4d',
                    tabBarActiveTintColor: '#fff',
                }}
            />
        </Tab.Navigator>
    )
}

export const HomeTabs = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeTab"
                component={MyTabs}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="NewProyect"
                component={MyStackProyects}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Profile"
                component={MyStackSettings}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}