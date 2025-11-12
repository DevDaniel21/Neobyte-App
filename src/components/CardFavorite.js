import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Foundation from '@expo/vector-icons/Foundation';

export default function CardFavorite({ id, nome, valor, capa }) {
    return (
        <View style={styles.card_container}>
            <View style={styles.image_container}>
                <Image
                    style={styles.card_image}
                    contentFit="fill"
                    source={'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/g/5/g5090-32v3c1.jpg'}  
                />
            </View>
            <Text style={styles.card_name}>{nome}</Text>
            <Text style={styles.card_value}>{`R$ ${valor}`}</Text>
            <Pressable style={styles.card_delete}>
                <Foundation name="x" size={24} color="#C30D0D" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card_container: {
        flexDirection: 'row',
        width: '100%',
        height: 90,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#71706E',
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 10,
    },
    image_container: {
        width: 80,
        height: 90,
        padding: 5,
        backgroundColor: '#fff'
    },
    card_image: {
        width: "100%",
        height: "100%",
    },
    card_name: {
        height: '100%',
        flex: 1,
        paddingVertical: 15,
        alignContent: 'center',
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
        wordBreak: 'break-word',
    },
    card_value: {
        height: '100%',
        flex: 0.8,
        paddingVertical: 15,
        alignContent: 'center',
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
    },
    card_delete: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.3,
    },
});
