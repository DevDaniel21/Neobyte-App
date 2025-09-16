import { Tabs } from 'expo-router';
import Foundation from '@expo/vector-icons/Foundation';

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#137969',
                tabBarInactiveTintColor: '#fff',
                tabBarLabelStyle: { fontSize: 8 },
                tabBarStyle: { backgroundColor: '#000' },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Foundation name="home" size={32} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favoritos',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Foundation name="heart" size={32} color={color} />
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
                            size={32}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
