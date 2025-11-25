import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditUser() {
    const router = useRouter();
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setPass] = useState('');
    const [avatar, setAvatar] = useState('');
    const [nasc, setNasc] = useState();
    const [telefone, setTel] = useState();
    const [cpf, setCpf] = useState();

    useEffect(() => {
        const carregarUser = async () => {
            const data = await AsyncStorage.getItem('userLogged');
            const profile = JSON.parse(data);
            setId(profile.id);
            setNome(profile.nome);
            setEmail(profile.email);
            setPass(profile.senha);

            profile.telefone ? setTel(profile.telefone) : setTel(undefined);
            profile.cpf ? setCpf(profile.cpf) : setCpf(undefined);
            profile.avatar ? setAvatar(profile.avatar) : setAvatar(undefined);
        };
        carregarUser();
    }, []);

    const handleEdit = async () => {
        const updatedUser = {
            nome,
            email,
            senha,
            telefone,
            cpf,
        };

        const response = await fetch(`http://localhost:4000/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            const updatedProfile = { id: id, ...updatedUser };
            await AsyncStorage.setItem(
                'userLogged',
                JSON.stringify(updatedProfile)
            );
            console.log('Perfil editado com sucesso');
        } else {
            console.log('Erro ao editar');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/user/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await AsyncStorage.removeItem('userLogged');
                console.log('Perfil deletado com sucesso!');
                router.navigate('/signin');
            } else {
                console.log('Erro ao deletar perfil');
            }
        } catch (err) {
            console.error('Houve um erro: ', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus dados</Text>
            <View>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    value={telefone}
                    onChangeText={setTel}
                />

                <Text style={styles.label}>CPF</Text>
                <TextInput
                    style={styles.input}
                    value={cpf}
                    onChangeText={setCpf}
                />
            </View>

            <Pressable onPress={handleDelete}>
                <Text style={styles.delete_text}>Excluir minha conta</Text>
            </Pressable>

            <Pressable onPress={handleEdit} style={styles.save_button}>
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
