import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
    const [search, setSearch] = useState("");

    return (
        <View style={styles.header}>
            <View style={styles.botaoContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquisando o que te faz feliz..."
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
                <Ionicons name="search" size={24} color="gray" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        backgroundColor: "#000",
    },

    botaoContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        borderRadius: 30,
        paddingHorizontal: 10,
        marginTop: 15,
    },

    input: {
        width: "100%",
    },
});
