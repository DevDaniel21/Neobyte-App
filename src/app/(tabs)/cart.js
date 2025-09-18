import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Cart() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.title_container}>
                <Ionicons name="cart" size={40} color="#fff" />
                <Text style={styles.title}>Meu Carrinho</Text>
            </View>

            <View style={styles.products}>
                <View style={styles.message_product}>
                    <Text style={styles.message_text}>
                        Seu carrinho está vazio
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.navigate('home')}
                    >
                        <Ionicons name="bag" size={24} color="#fff" />
                        <Text style={styles.button_text}>
                            Começar a comprar
                        </Text>
                    </TouchableOpacity>
                </View>
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
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    products: {
        marginTop: 20,
        width: '100%',
        flex: 1,
        alignItems: 'center',
    },
    message_product: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    message_text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#137969',
        gap: 10,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    button_text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
