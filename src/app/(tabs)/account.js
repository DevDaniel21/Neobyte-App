import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { use, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Account() {
    const user = { name: 'Usuário' };
    const router = useRouter();

    const [id, setId] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userLogged');
                if (userData) {
                    setId(JSON.parse(userData).id);
                }
            } catch (error) {
                console.log('Algo deu errado, ', error);
            }
        };
        getUserData();
    }, []);

    async function handleLogout() {
        Alert.alert(
            'Sair',
            'Deseja realmente sair da sua conta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Explicitly remove the stored logged user
                            await AsyncStorage.removeItem('userLogged');

                            // Also attempt to remove common auth/session keys
                            const allKeys = await AsyncStorage.getAllKeys();
                            const authKeyPatterns = [
                                /token/i,
                                /auth/i,
                                /session/i,
                                /refresh/i,
                                /access/i,
                            ];
                            const keysToRemove = allKeys.filter((k) =>
                                authKeyPatterns.some((pat) => pat.test(k))
                            );

                            if (keysToRemove.length > 0) {
                                await AsyncStorage.multiRemove(keysToRemove);
                            }
                        } catch (e) {
                            console.warn(
                                'Failed to clear auth/user keys on logout',
                                e
                            );
                        } finally {
                            try {
                                // Use replace to avoid back navigation
                                router.replace('/signin');
                            } catch (err) {
                                router.push('/signin');
                            }
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.message}>
                <Ionicons name="person-circle-outline" size={54} color="#fff" />
                <Text style={styles.message_text}>{`Olá, ${user.name}`}</Text>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.links}>
                <View style={styles.link_container}>
                    <View style={styles.icone}>
                        <MaterialIcons
                            name="person"
                            size={40}
                            color="#C5CBD1"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.link_text_container}
                        onPress={() => router.push('/edituser')}
                    >
                        <Text style={styles.link_text}>Meus dados</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={40}
                            color="#C5CBD1"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.link_container}>
                    <View style={styles.icone}>
                        <FontAwesome5
                            name="map-marker-alt"
                            size={35}
                            color="#C5CBD1"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.link_text_container}
                        onPress={() =>
                            router.push({
                                pathname: '/adress',
                                params: { id },
                            })
                        }
                    >
                        <Text style={styles.link_text}>Meus endereços</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={40}
                            color="#C5CBD1"
                        />
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.link_container}>
                    <View style={styles.icone}>
                        <Ionicons
                            name="clipboard"
                            size={40}
                            color={'#C5CBD1'}
                        />
                    </View>
                    <TouchableOpacity style={styles.link_text_container} onPress={() => router.push('/order')}>
                        <Text style={styles.link_text}>Meus pedidos</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={40}
                            color="#C5CBD1"
                        />
                    </TouchableOpacity>
                </View> */}
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 30,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={styles.exit_account}
                    onPress={handleLogout}
                >
                    <Text style={styles.exit_text}>Sair da conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#303030',
    },
    message: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    message_text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: '#fff',
        marginTop: 5,
    },
    icone: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    links: {
        width: '100%',
        marginTop: 20,
        gap: 18,
    },
    link_container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    link_text_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link_text: {
        color: '#C5CBD1',
        fontSize: 18,
        fontWeight: '500',
    },
    exit_account: {
        padding: 10,
    },
    exit_text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FF3B30',
        textAlign: 'center',
    },
});
