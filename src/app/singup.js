import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Register() {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSignup = async () => {
        const profile = {
            nome,
            email,
            senha,
        };

        console.log(profile)

        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
        });

        if (response.ok) {
            console.log('Cadastrado com sucesso');
            router.navigate('/home');
        } else {
            console.log('Erro ao cadastrar');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo-branca.svg')}
            />
            <Text style={styles.titulo}>Cadastrar-se</Text>
            <View style={styles.form}>
                <View style={styles.data_container}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>
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
                        value={senha}
                        onChangeText={setSenha}
                    />
                </View>

                <View style={styles.button_container}>
                    <Pressable
                        style={styles.BtnCadastro}
                        onPress={handleSignup}
                    >
                        <Text style={styles.BtnCadastroText}>Cadastrar</Text>
                    </Pressable>
                </View>

                <View style={styles.linkCadastro_container}>
                    <Text>Já possui uma conta?</Text>
                    <Pressable onPress={() => router.navigate('/index')}>
                        <Text style={styles.linkCadastroText}>
                            Clique aqui para entrar.
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#137969',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '45%',
        height: '13%',
        objectFit: 'fit',
    },
    titulo: {
        fontSize: 26,
        fontWeight: '900',
        marginBottom: 10,
        color: '#ffffffff',
    },
    form: {
        flex: 0.65,
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        backgroundColor: '',
        borderRadius: 10,
        backgroundColor: '#ffffffff',
    },
    data_container: {
        width: '85%',
    },
    label: {
        color: '#137969',
        fontSize: 20,
        fontWeight: '700',
    },
    input: {
        justifyContent: 'center',
        alignContent: 'flex-start',
        fontWeight: '700',
        backgroundColor: '#137969',
        color: '#ffffffff',
        width: '100%',
        fontSize: 12,
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },
    button_container: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#137969',
        width: '55%',
    },
    linkCadastro_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkCadastroText: {
        color: '#137969',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    BtnCadastro: {
        backgroundColor: '#ffffffff',
        color: '#137969',
        alignItems: 'center',
        borderRadius: 8,
    },

    BtnCadastroText: {
        color: '#137969',
        fontWeight: '700',
        fontSize: 22,
    },
});
