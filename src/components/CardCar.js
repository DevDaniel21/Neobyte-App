import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CartCard({ product, onRemove, onUpdateQuantity }) {
    const handleDecrease = () => {
        if (product.quantidade > 1) {
            onUpdateQuantity(product.id, product.quantidade - 1);
        }
    };

    const handleIncrease = () => {
        onUpdateQuantity(product.id, product.quantity + 1);
    };

    return (
        <View style={styles.card}>
            <Image 
                source={{ uri: product.produto.capa }} 
                style={styles.image}
                resizeMode="cover"
            />
            
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>
                    {product.produto.nome}
                </Text>
                
                <Text style={styles.price}>
                    R$ {product.produto.valor}
                </Text>
                
                <View style={styles.actions}>
                    <View style={styles.quantity_container}>
                        <TouchableOpacity 
                            style={styles.quantity_button}
                            onPress={handleDecrease}
                        >
                            <Ionicons name="remove" size={18} color="#fff" />
                        </TouchableOpacity>
                        
                        <Text style={styles.quantity_text}>
                            {product.quantidade}
                        </Text>
                        
                        <TouchableOpacity 
                            style={styles.quantity_button}
                            onPress={handleIncrease}
                        >
                            <Ionicons name="add" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.remove_button}
                        onPress={() => onRemove(product.produto.id)}
                    >
                        <Ionicons name="trash-outline" size={20} color="#ff4444" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#404040',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        gap: 12,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#505050',
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    price: {
        color: '#4CAF50',
        fontSize: 18,
        fontWeight: '700',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantity_container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#505050',
        borderRadius: 8,
        gap: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    quantity_button: {
        padding: 4,
    },
    quantity_text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        minWidth: 24,
        textAlign: 'center',
    },
    remove_button: {
        padding: 8,
    },
});