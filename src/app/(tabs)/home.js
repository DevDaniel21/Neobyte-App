import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import CardHome from "../../components/CardHome";

export default function Home() {
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.titulo}>Mais Pesquisados</Text>

            <View style={styles.container_card}>
                <CardHome />
                <CardHome />
                <CardHome />
                <CardHome />
                <CardHome />
                <CardHome />
            </View>
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
    container_card: {
        paddingHorizontal: 10,
        gap: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    card: {},
});
