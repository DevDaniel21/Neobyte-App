import { Tabs } from 'expo-router';
import Foundation from '@expo/vector-icons/Foundation';

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#137969',
                tabBarInactiveTintColor: '#2b2b2bff',
                tabBarLabelStyle: { fontSize: 8 },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    //tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Foundation name="home" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
