import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert,
} from 'react-native';
import { useState, useEffect, useId } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import CartCard from '../../components/CardCar';
import { useCartStore } from '../../store/useCartStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
    const router = useRouter();

    const { cart, setCart } = useCartStore();
    const [cartItems, setCartItems] = useState(cart);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const getUserId = async () => {
            try {
                const userLogged = await AsyncStorage.getItem('userLogged');
                const id = JSON.parse(userLogged).id;
                setUserId(id);
            } catch (error) {
                console.log('Erro ao obter userId:', error);
            }
        };
        getUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            const listCart = async () => {
                const response = await fetch(
                    `http://localhost:4000/cart/${userId}`
                );

                const data = await response.json();
                if (response.ok) {
                    setCart(data.produtoAdicionado);
                    setCartItems(data.produtoAdicionado);
                } else {
                    console.log('Erro ao carregar carrinho');
                }
            };
            listCart();
            return;
        }
    }, [userId]);

    const handleRemove = async (user_id, produto_id) => {
        try {
            const response = await fetch(`http://localhost:4000/cart/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    produto_id: produto_id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const updatedCart = cartItems.filter(
                    (item) =>
                        !(
                            item.user_id === user_id &&
                            item.produto_id === produto_id
                        )
                );
                setCart(updatedCart);
                setCartItems(updatedCart);
            }

            Alert.alert('Remover', `Remover produto do carrinho?`, [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Remover',
                    style: 'destructive',
                    onPress: () => {
                        // Remove from state
                        const updatedCart = cartItems.filter(
                            (item) => item.id !== id
                        );
                        console.log('Updated Cart:', updatedCart);
                        setCartItems(updatedCart);
                        setCart(updatedCart);
                        Alert.alert('Produto removido do carrinho!');
                    },
                },
            ]);
        } catch (error) {
            console.log('Erro ao remover do carrinho:', error);
        }
    };

    const handleUpdateQuantity = async (user_id, produto_id, newQuantity) => {
        try {
            const response = await fetch('http://localhost:4000/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: +user_id,
                    produto_id: +produto_id,
                    quantidade: +newQuantity,
                }),
            });

            if (response.ok) {
                setCartItems(
                    cartItems.map((item) =>
                        item.user_id === user_id &&
                        item.produto_id === produto_id
                            ? { ...item, quantidade: newQuantity }
                            : item
                    )
                );
            }
        } catch (error) {
            console.log('Erro, ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.title_container}>
                <Ionicons name="cart" size={40} color="#fff" />
                <Text style={styles.title}>Meu Carrinho</Text>
            </View>

            {cartItems.length === 0 ? (
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
            ) : (
                <>
                    <ScrollView style={styles.products_list}>
                        <FlatList
                            data={cartItems}
                            renderItem={({ item }) => (
                                <CartCard
                                    key={item.id}
                                    product={item}
                                    onRemove={handleRemove}
                                    onUpdateQuantity={handleUpdateQuantity}
                                />
                            )}
                        />
                    </ScrollView>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#303030',
    },
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    products: {
        flex: 1,
        width: '100%',
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
    products_list: {
        flex: 1,
        marginBottom: 10,
    },
    footer: {
        backgroundColor: '#404040',
        borderRadius: 12,
        padding: 16,
        gap: 16,
    },
    total_container: {
        gap: 8,
    },
    total_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    total_label: {
        color: '#aaa',
        fontSize: 16,
        fontWeight: '500',
    },
    total_items: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    total_price: {
        color: '#4CAF50',
        fontSize: 24,
        fontWeight: '700',
    },
    checkout_button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#137969',
        borderRadius: 8,
        paddingVertical: 14,
        gap: 10,
    },
    checkout_text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});
