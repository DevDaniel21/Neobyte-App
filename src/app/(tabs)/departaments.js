import { View, Text, StyleSheet } from 'react-native';

export default function Departaments() {
    return (
        <View style={styles.container}>
            <Text>Departamentos</Text>
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
