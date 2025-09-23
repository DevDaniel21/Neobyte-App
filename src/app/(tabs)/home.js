import { View, Text, StyleSheet } from "react-native";
import Header from '../../components/Header'

export default function Home() {
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.titulo}>Mais Pesquisados</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
    },

    titulo: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        paddingHorizontal: 15,
        marginTop: 10,
    },

    
});
