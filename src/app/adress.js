import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    Modal,
    TextInput,
} from 'react-native';
import CardAdress from '../components/CardAdress';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useGlobalSearchParams } from 'expo-router';

export default function Adress() {
    const params = useGlobalSearchParams();

    const [adresses, setAdresses] = useState([]);

    useEffect(() => {
        const getAdresses = async () => {
            const response = await fetch(
                `http://localhost:4000/adress/user/${params.id}`
            );

            if (response.ok) {
                const adressData = await response.json();
                setAdresses(adressData.adress);
                console.log(adressData);
            }
        };
        getAdresses();
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        cep: '',
        numero: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
    });

    const resetForm = () => {
        setFormData({
            nome: '',
            cep: '',
            numero: '',
            rua: '',
            bairro: '',
            cidade: '',
            estado: '',
        });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        try {
            console.log('Tentou atualizar');
            const response = await fetch(`http://localhost:4000/adress`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    user_id: Number(params.id),
                }),
            });

            if (response.ok) {
                console.log(await response.json());
                setAdresses(adresses.filter((addr) => addr.id !== id));
                Alert.alert('Sucesso', 'Endereço excluído!');
            }
        } catch (error) {
            console.error('Houve um erro, ', error);
        }
    };

    const handleEdit = (id) => {
        const addressToEdit = adresses.find((addr) => addr.id === id);
        if (addressToEdit) {
            setFormData({
                nome: addressToEdit.nome,
                cep: addressToEdit.cep.toString(),
                numero: addressToEdit.numero.toString(),
                rua: addressToEdit.rua,
                bairro: addressToEdit.bairro,
                cidade: addressToEdit.cidade,
                estado: addressToEdit.estado,
            });
            setEditingId(id);
            setModalVisible(true);
        }
    };

    const handleAdd = () => {
        resetForm();
        setModalVisible(true);
    };

    const handleSave = async () => {
        // Validação básica
        if (
            !formData.nome ||
            !formData.cep ||
            !formData.numero ||
            !formData.rua
        ) {
            Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
            return;
        }

        if (editingId) {
            try {
                console.log('Tentou atualizar');
                const response = await fetch(`http://localhost:4000/adress`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: editingId,
                        user_id: Number(params.id),
                        nome: formData.nome,
                        cep: formData.cep,
                        numero: Number(formData.numero),
                        rua: formData.rua,
                        bairro: formData.bairro,
                        cidade: formData.cidade,
                        estado: formData.estado,
                    }),
                });

                if (response.ok) {
                    console.log(await response.json());
                }
            } catch (error) {
                console.error('Houve um erro, ', error);
            }

            setAdresses(
                adresses.map((addr) =>
                    addr.id === editingId
                        ? {
                              ...addr,
                              nome: formData.nome,
                              cep: parseInt(formData.cep),
                              numero: parseInt(formData.numero),
                              rua: formData.rua,
                              bairro: formData.bairro,
                              cidade: formData.cidade,
                              estado: formData.estado,
                          }
                        : addr
                )
            );
            Alert.alert('Sucesso', 'Endereço atualizado!');
        } else {
            try {
                const response = await fetch(`http://localhost:4000/adress`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: Number(params.id),
                        nome: formData.nome,
                        cep: formData.cep,
                        numero: Number(formData.numero),
                        rua: formData.rua,
                        bairro: formData.bairro,
                        cidade: formData.cidade,
                        estado: formData.estado,
                    }),
                });

                if (response.ok) {
                    const adressData = await response.json()
                    const newAdress = adressData.adress
                    setAdresses([...adresses, newAdress]);
                    Alert.alert('Sucesso', 'Endereço adicionado!');
                }
            } catch (error) {
                console.log('Houve um erro: ', error);
            }
        }

        setModalVisible(false);
        resetForm();
    };

    return (
        <View style={styles.container}>
            <View style={styles.title_container}>
                <AntDesign name="form" size={24} color="white" />
                <Text style={styles.title}>Meus Endereços</Text>
            </View>

            <ScrollView
                style={styles.adresses}
                contentContainerStyle={styles.adressesContent}
            >
                {adresses.map((favorite) => (
                    <View key={favorite.id} style={styles.addressRow}>
                        <CardAdress
                            id={favorite.id}
                            nome={favorite.nome}
                            cep={favorite.cep}
                            numero={favorite.numero}
                            rua={favorite.rua}
                            bairro={favorite.bairro}
                            cidade={favorite.cidade}
                            estado={favorite.estado}
                        >
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleEdit(favorite.id)}
                                accessibilityLabel={`Editar ${favorite.nome}`}
                            >
                                <AntDesign name="edit" size={18} color="#fff" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.actionButton,
                                    styles.deleteButton,
                                ]}
                                onPress={() => handleDelete(favorite.id)}
                                accessibilityLabel={`Remover ${favorite.nome}`}
                            >
                                <AntDesign
                                    name="delete"
                                    size={18}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </CardAdress>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.bottomButton} onPress={handleAdd}>
                <AntDesign name="plus" size={16} color="white" />
                <Text style={styles.bottomButtonText}>Adicionar endereço</Text>
            </TouchableOpacity>

            {/* Modal do Formulário */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                    resetForm();
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {editingId
                                    ? 'Editar Endereço'
                                    : 'Novo Endereço'}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
                                    resetForm();
                                }}
                            >
                                <AntDesign
                                    name="close"
                                    size={24}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.formContainer}>
                            <Text style={styles.label}>Nome do Endereço *</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.nome}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, nome: text })
                                }
                                placeholder="Ex: Casa, Trabalho"
                                placeholderTextColor="#999"
                            />

                            <Text style={styles.label}>CEP *</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.cep}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, cep: text })
                                }
                                placeholder="00000000"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                            />

                            <Text style={styles.label}>Rua *</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.rua}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, rua: text })
                                }
                                placeholder="Nome da rua"
                                placeholderTextColor="#999"
                            />

                            <Text style={styles.label}>Número *</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.numero}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, numero: text })
                                }
                                placeholder="000"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                            />

                            <Text style={styles.label}>Bairro</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.bairro}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, bairro: text })
                                }
                                placeholder="Nome do bairro"
                                placeholderTextColor="#999"
                            />

                            <Text style={styles.label}>Cidade</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.cidade}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, cidade: text })
                                }
                                placeholder="Nome da cidade"
                                placeholderTextColor="#999"
                            />

                            <Text style={styles.label}>Estado</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.estado}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, estado: text })
                                }
                                placeholder="SP"
                                placeholderTextColor="#999"
                                maxLength={2}
                            />
                        </ScrollView>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.cancelButton,
                                ]}
                                onPress={() => {
                                    setModalVisible(false);
                                    resetForm();
                                }}
                            >
                                <Text style={styles.modalButtonText}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.modalButtonText}>
                                    {editingId ? 'Atualizar' : 'Adicionar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#303030',
    },
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    adresses: {
        marginTop: 20,
        width: '100%',
        flex: 1,
    },
    adressesContent: {
        gap: 20,
        paddingBottom: 120,
        alignItems: 'center',
    },
    addressRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        paddingVertical: 6,
    },
    actionButton: {
        backgroundColor: '#505050',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        marginBottom: 8,
    },
    deleteButton: {
        backgroundColor: '#8B0000',
    },
    bottomButton: {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 20,
        height: 54,
        backgroundColor: '#137969',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff20',
        paddingHorizontal: 16,
        gap: 8,
    },
    bottomButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#404040',
        borderRadius: 16,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    formContainer: {
        marginBottom: 20,
    },
    label: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#505050',
        borderRadius: 8,
        padding: 12,
        color: '#fff',
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#666',
    },
    saveButton: {
        backgroundColor: '#137969',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
