import { Tabs } from 'expo-router';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#137969',
                tabBarInactiveTintColor: '#fff',
                tabBarLabelStyle: { fontSize: 8 },
                tabBarStyle: { backgroundColor: '#000', borderColor: '#000' },
                headerStyle: { backgroundColor: '#000', borderColor: '#000' },
                headerTitleStyle: { color: '#fff' },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Foundation name="home" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favoritos',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Foundation name="heart" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Carrinho',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Foundation
                            name="shopping-cart"
                            size={28}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="departaments"
                options={{
                    title: 'Departamentos',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Octicons name="stack" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Minha Conta',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={28} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
