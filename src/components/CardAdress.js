import { View, StyleSheet, Text, Pressable } from 'react-native';

export default function CardFavorite({
    id,
    name,
    cep,
    numero,
    rua,
    bairro,
    cidade,
    estado,
}) {
    return (
        <View style={styles.card_container}>
            <Text style={styles.card_name}>{name}</Text>
            <Text style={styles.card_text}>{`${rua}, ${bairro}`}</Text>
            <Text style={styles.card_text}>{`Número: ${numero}`}</Text>
            <Text
                style={styles.card_text}
            >{`CEP ${cep}, ${cidade}, ${estado}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card_container: {
        width: '100%',
        justifyContent: 'center',
        height: 100,
        overflow: 'hidden',
        backgroundColor: '#71706E',
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 1,
        paddingLeft: 20,
        paddingVertical: 10
    },
    card_name: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 5
    },
    card_text: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
});
