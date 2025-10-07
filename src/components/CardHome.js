import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";

export default function CardHome() {
    return (
        <View style={styles.container}>
         <View style={styles.card_container}>
            <Image
                style={styles.card_image}
                source="https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/g/5/g5090-32v3c1.jpg"
            />

            <Text style={styles.descricao_card}>
                Placa de Video MSI GeForce RTX 5090 Ventus 3X OC, 32GB, GDDR7,
                512-bit, G5090-32V3C.
            </Text>

            <Text style={styles.descricao_preco}>
                R$: 19.679,99.
                </Text>
        </View>
    </View>

    
    );
}

const styles = StyleSheet.create({

    container: {
        textAlign: "center",
    },

    card_container: {
        height: 218,
        width: 138,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: 'center',

    },
    card_image: {
        height: 100,
        width: 100,
        alignContent: 'center'
    },
    descricao_card: {
        fontSize: 13,
        color: "black",
        marginTop: 15,
        fontWeight: '700',
        textAlign: 'center'
        
    },
    descricao_preco: {
        color: "#137969"
    },
});
