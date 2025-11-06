import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Pressable,
    Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import  AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        const response = await fetch(`http://localhost:3000/user/${email}`);
        const userData = await response.json();
        const profile = userData.profile;
        if (email == "" ) {
            console.log('email nao digitada');
        } else {
            if (profile.senha == senha) {
                router.navigate('/home');
                await AsyncStorage.setItem('logado', JSON.stringify(profile));
            }
            else {
                console.error('Usuário não existe ou senha incorreta.')
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.svg')}
            />
            <Text style={styles.titulo}>Bem Vindo de Volta!</Text>
            <View style={styles.form}>
                <View style={styles.primeiraInfo}>
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

                <Pressable style={styles.BtnLogin} onPress={handleLogin}>
                    <Text style={styles.BtnLoginText}>Entrar</Text>
                </Pressable>

                <View style={styles.linkCadastro_container}>
                    <Text style={styles.cadastroText}>Não possui uma conta?</Text>
                    <TouchableOpacity onPress={() => router.push('/singup')}>
                        <Text style={styles.linkCadastroText}>
                            Clique aqui para se cadastrar.
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '45%',
        height: '13%',
        resizeMode: 'contain',
    },
    titulo: {
        fontSize: 32,
        fontWeight: '900',
        marginBottom: 10,
        color: '#137969',
    },
    form: {
        flex: 0.55,
        width: '85%',
        alignItems: 'center',
        gap: 20,
        backgroundColor: '#137969',
        borderRadius: 10,
    },

    primeiraInfo: {
        marginTop: 60,
        width: '85%',
    },
    
    data_container: {
        width: '85%',
    },
    label: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    input: {
        justifyContent: 'center',
        alignContent: 'flex-start',
        fontWeight: '700',
        backgroundColor: '#fff',
        color: '#137969',
        width: '100%',
        fontSize: 12,
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },

    linkCadastro_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    cadastroText: {
        fontSize:16
    },

    linkCadastroText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    BtnLogin: {
        width: '55%',
        alignItems: 'center',
        color: '#fff',
        backgroundColor: '#137969',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 6,
    },

    BtnLoginText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 22,
    },
});
