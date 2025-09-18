import { View, Text, StyleSheet } from 'react-native';

export default function Filter() {
    return (
        <View style={styles.container}>
            <Text>Pagina de Filtros</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
