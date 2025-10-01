import { View, Text, StyleSheet } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import CardOrder from '../components/CardOrder';
import { useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

export default function Order() {
    const orders = [
        {
            id: '1',
            image: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/g/5/g5090-32v3c1.jpg',
            name: 'Placa de Video 5060',
            quantidade: '1',
            status: 'Em rota',
           
        },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.title_container}>
                 <Entypo name="clipboard" size={24} color="white" />
                <Text style={styles.title}>Meus Pedidos</Text>
            </View>

            <View style={styles.adresses}>
                {orders.map((order) => (
                    <CardOrder
                        key={order.id}
                        id={order.id}
                        image={order.image}
                        name={order.name}
                        quantidade={order.quantidade}
                        status={order.status}
                    />
                ))}
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
    adresses: {
        marginTop: 20,
        width: '100%',
        gap: 20,
        flex: 1,
        alignItems: 'center',
        overflow: 'scroll',
    },
});