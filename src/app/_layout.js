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
                name="cart"
                options={{ title: 'Carrinho', headerShown: true }}
            />
            <Stack.Screen
                name="edituser"
                options={{
                    title: 'Conta',
                    headerTintColor: '#fff',
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        borderBottomColor: '#000',
                        color: '#fff',
                    },
                }}
            />
        </Stack>
    );
}
