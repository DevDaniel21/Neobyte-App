import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            const isLogged = await AsyncStorage.getItem('userLogged');

            if (isLogged != null) {
                router.replace('/home');
            } else {
                router.replace('/signin');
            }
        };

        setTimeout(checkLogin, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Text>Neobyte</Text>
            <ActivityIndicator size="large" color="#111111ff" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
