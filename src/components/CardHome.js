import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

export default function CardHome({ id, nome, valor, imagem }) {
    const hadleProduct = async () => {
        router.push({
            pathname: '/product',
            params: { id, nome, valor, imagem },
        });
    };

    return (
        <Pressable onPress={hadleProduct}>
            <View style={styles.container}>
                <View style={styles.card_container}>
                    <Image
                        style={styles.card_image}
                        source={imagem}
                    />
                    <Text style={styles.descricao_card}>{nome}</Text>
                    <Text style={styles.descricao_preco}>R$: {valor}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
    },

    card_container: {
        height: 218,
        width: 138,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    card_image: {
        height: 100,
        width: 100,
        alignContent: 'center',
    },
    descricao_card: {
        fontSize: 13,
        minHeight: 40,
        color: 'black',
        marginTop: 15,
        fontWeight: '700',
        textAlign: 'center',
    },
    descricao_preco: {
        color: '#137969',
    },
});
