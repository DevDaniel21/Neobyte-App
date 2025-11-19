import { View, StyleSheet, Text, Pressable } from 'react-native';

export default function CardFavorite({
    id,
    nome,
    cep,
    numero,
    rua,
    bairro,
    cidade,
    estado,
    children,
}) {
    return (
        <View style={styles.card_container}>
            <Text style={styles.card_name}>{nome}</Text>
            <Text style={styles.card_text}>{`${rua}, ${bairro}`}</Text>
            <Text style={styles.card_text}>{`Número: ${numero}`}</Text>
            <Text
                style={styles.card_text}
            >{`CEP ${cep}, ${cidade}, ${estado}`}</Text>
            {children ? <View style={styles.actionsOverlay}>{children}</View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    card_container: {
        flex: 1,
        justifyContent: 'center',
        height: 100,
        overflow: 'hidden',
        backgroundColor: '#71706E',
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 1,
        paddingLeft: 20,
        paddingVertical: 10,
        paddingRight: 12,
    },

    actionsOverlay: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'column',
        alignItems: 'flex-end',
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
