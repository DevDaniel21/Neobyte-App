import { View, Text, StyleSheet } from 'react-native';

export default function Favorites() {
    return (
        <View style={styles.container}>
            <Text>Favoritos</Text>
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
