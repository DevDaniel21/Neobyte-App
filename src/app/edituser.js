import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function EditUser() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [avatar, setAvatar] = useState('');
    const [nasc, setNasc] = useState('');
    const [tel, setTel] = useState('');
    const [cpf, setCpf] = useState('');

    const handleEdit = async () => {
        const user = {
            name,
            email,
            pass,
            avatar,
        };

        const response = await fetch(`http://localhost:3000/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            console.log('Perfil editado com sucesso');
            router.navigate('/contact');
        } else {
            console.log('Erro ao editar');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus dados</Text>
            <View>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Data de Nascimento</Text>
                <TextInput
                    style={styles.input}
                    value={nasc}
                    onChangeText={setNasc}
                />

                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    value={tel}
                    onChangeText={setTel}
                />

                <Text style={styles.label}>CPF</Text>
                <TextInput
                    style={styles.input}
                    value={cpf}
                    onChangeText={setCpf}
                />
            </View>

            <Pressable onPress={() => router.navigate('login')}>
                <Text style={styles.delete_text}>Exluir minha conta</Text>
            </Pressable>

            <Pressable style={styles.save_button}>
                <Text style={styles.save_text}>Salvar alterações</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#303030',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#fff',
        backgroundColor: '#71706E',
        fontSize: 16,
        color: '#C5CBD1',
    },
    delete_text: {
        fontSize: 16,
        marginTop: 15,
        fontWeight: '500',
        color: '#FF3B30',
    },
    save_button: {
        marginTop: 15,
        borderRadius: 8,
        padding: 8,
        backgroundColor: '#137969',
    },
    save_text: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
    },
});
