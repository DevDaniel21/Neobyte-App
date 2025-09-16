import { Stack } from "expo-router"

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen   
                name="index"
                options={{ headerShown: false }}
            />
             <Stack.Screen   
                name="login"
                options={{ title: "Login", headerShown: false  }}
            />
             <Stack.Screen   
                name="singup"
                options={{ title: "Cadastrar", headerShown: false  }}
            />
            <Stack.Screen   
                name="(tabs)"
                options={{ headerShown: false }}
            />
        </Stack>
    )
}