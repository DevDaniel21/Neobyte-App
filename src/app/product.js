import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

export default function Home() {
    const router = useRouter();
    const { id, nome, valor, imagem } = useGlobalSearchParams();
    
    const [useFavorite, setFavorite] = useState("heart-o");

    function handleFavorite() {
        if (useFavorite === "heart-o") {
            setFavorite("heart");
        } else {
            setFavorite("heart-o");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.product_rating_favorite}>
                <View style={styles.stars_container}>
                    <FontAwesome name="star" size={24} color="gold" />
                    <FontAwesome name="star" size={24} color="gold" />
                    <FontAwesome name="star" size={24} color="gold" />
                    <FontAwesome name="star-o" size={24} color="gold" />
                    <FontAwesome name="star-o" size={24} color="gold" />
                </View>
                <Text style={styles.product_rating_total}>(200)</Text>
                <Pressable onPress={handleFavorite}>
                    <FontAwesome name={useFavorite} size={36} color="#C30D0D" />
                </Pressable>
            </View>
            <Text style={styles.nome}>Nome:{nome}</Text>
            
            <Image style={styles.product_image} source={imagem} />
            
            <View style={styles.buy_container}>
                <Text style={styles.valor}>R$ {valor}</Text>
                <Pressable style={styles.buy_button}>
                    <Text style={styles.buy_button_text}>Comprar</Text>
                </Pressable>
                <Pressable style={styles.buy_button}>
                    <Text style={styles.buy_button_text}>
                        Adicionar ao carrinho
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },
    text: {
        color: '#fff',
    },
    product_image: {
        height: 300,
        width: '100%',
        alignContent: 'center',
        marginTop: 20,
    },
    product_rating_favorite: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 10,
        gap: 6,
    },
    product_rating_total: {
        fontSize: 20,
        color: 'white',
    },
    stars_container: {
        flexDirection: 'row',
    },
    nome: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
        textAlign: 'justify',
        paddingHorizontal: 16,
    },
    buy_container: {
        backgroundColor: '#fff',
        height: 300,
        paddingVertical: 10,
        paddingHorizontal: 10,
        gap: 10,
        marginTop: 20
    },
    valor: {
        color: '#137969',
        fontSize: 26,
        fontWeight: 700
    },
    buy_button: {
        width: '100%',
        backgroundColor: '#137969',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 8
    },
    buy_button_text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
});
