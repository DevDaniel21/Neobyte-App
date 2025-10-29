import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
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
                <Image
                    source={require("../../../assets/placa-de-video.png")}
                    style={{ width: 150, height: 200 }}
                />
                <Image
                    source={require("../../../assets/monitor.png")}
                    style={{ width: 150, height: 200 }}
                />
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
        rowGap: 10,
        columnGap: 6,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    card: {},
});
