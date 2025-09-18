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
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#303030',
    },
});
