import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen
                name="login"
                options={{ title: 'Login', headerShown: false }}
            />

            <Stack.Screen
                name="singup"
                options={{ title: 'Cadastrar', headerShown: false }}
            />

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen
                name="edituser"
                options={{
                    title: 'Conta',
                    headerTintColor: '#fff',
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomColor: '#000',
                    },
                }}
            />
            <Stack.Screen
                name="adress"
                options={{
                    title: 'Endereços',
                    headerTintColor: '#fff',
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomColor: '#000',
                    },
                }}
            />

            <Stack.Screen
                name="order"
                options={{
                    title: 'Pedidos',
                    headerTintColor: '#fff',
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomColor: '#000',
                    },
                }}
            />
        </Stack>
    );
}