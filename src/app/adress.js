import { View, Text, StyleSheet } from 'react-native';
import CardAdress from '../components/CardAdress';
import Foundation from '@expo/vector-icons/Foundation';

export default function Adress() {
    const adresses = [
        {
            id: '1',
            name: 'Minha Casa',
            cep: 11669400,
            numero: 100,
            rua: 'Ana justina Ferreira Neri',
            bairro: 'Travessão',
            cidade: 'Caraguatatuba',
            estado: 'SP',
        },
        {
            id: '2',
            name: 'Trabalho',
            cep: 11669400,
            numero: 100,
            rua: 'Ana justina Ferreira Neri',
            bairro: 'Travessão',
            cidade: 'Caraguatatuba',
            estado: 'SP',
        },
        {
            id: '3',
            name: 'Outra Casa',
            cep: 11669400,
            numero: 100,
            rua: 'Ana justina Ferreira Neri',
            bairro: 'Travessão',
            cidade: 'Caraguatatuba',
            estado: 'SP',
        },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.title_container}>
                <Foundation name="marker" size={40} color="#fff" />
                <Text style={styles.title}>Meus Endereços</Text>
            </View>

            <View style={styles.adresses}>
                {adresses.map((favorite) => (
                    <CardAdress
                        key={favorite.id}
                        id={favorite.id}
                        name={favorite.name}
                        cep={favorite.cep}
                        numero={favorite.numero}
                        rua={favorite.rua}
                        bairro={favorite.bairro}
                        cidade={favorite.cidade}
                        estado={favorite.estado}
                    />
                ))}
            </View>
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
        gap: 20,
        flex: 1,
        alignItems: 'center',
        overflow: 'scroll',
    },
});
