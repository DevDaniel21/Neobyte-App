import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("./assets/logo-branca.svg")} />
            <Text style={styles.titulo}>Cadastrar-se</Text>
            <View style={styles.form}>
                <View style={styles.data_container}>
             
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.data_container}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        value={pass}
                        onChangeText={setPass}
                    />
                </View>

                <View style={styles.button_container}>
                   <TouchableOpacity style={styles.BtnCadastro} onPress="">
                        <Text style={styles.BtnCadastroText}>
                            Cadastrar
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.linkCadastro_container}>
                    <Text>Já possui uma conta?</Text>
                    <TouchableOpacity style={styles.linkCadastro} onPress="">
                        <Text style={styles.linkCadastroText}>
                            Clique aqui para entrar.
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#137969",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: "38%",
        height: "13%",
        objectFit: "fit",
    },
    titulo: {
        fontSize: 26,
        fontWeight: "900",
        marginBottom: 10,
        color: "#ffffffff",
    },
    form: {
        flex: 0.65,
        width: "85%",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        backgroundColor: "",
        borderRadius: 10,
        backgroundColor: "#ffffffff",
    },
    data_container: {
        width: "85%",
    },
    label: {
        color: "#137969",
        fontSize: 20,
        fontWeight: "700",
    },
    input: {
        justifyContent: "center",
        alignContent: "flex-start",
        fontWeight: "700",
        backgroundColor: "#137969",
        color: "#ffffffff",   
        width: "100%",
        fontSize: 12,
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },
    button_container: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#137969",
        width: "55%",
    },
    linkCadastro_container: {
        alignItems: "center",
        justifyContent: "center",
    },
    linkCadastroText: {
        color: "#137969",
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
        textDecorationLine: "underline",
    },
    BtnCadastro: {
        backgroundColor: "#ffffffff",
        color: "#137969",
        alignItems: "center",
        borderRadius: 8,
    },

    BtnCadastroText: {
        color: "#137969",
        fontWeight: "700",
        fontSize: 22,  
    },
});
