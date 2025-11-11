import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Image } from 'expo-image';
import Header from '../../components/Header';
import CardHome from '../../components/CardHome';
import { use, useEffect, useState } from 'react';

export default function Home() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const listProdutos = async () => {
            const response = await fetch('http://localhost:4000/product');

            if (response.ok) {
                console.log('Lista carregada com sucesso!');
                const data = await response.json();
                setProdutos(data.products);
            } else {
                console.log('Erro ao carregar lista');
            }
        };

        listProdutos();
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.titulo}>Mais Pesquisados</Text>

            <View style={styles.container_card}>
                <FlatList
                    contentContainerStyle={styles.cards}
                    data={produtos}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <CardHome
                            key={item.id}
                            id={item.id}
                            nome={item.nome}
                            valor={item.valor}
                            imagem={item.imagem}
                        />
                    )}
                />
                {/* <Image
                    source={require('../../../assets/placa-de-video.png')}
                    style={{ width: 150, height: 200 }}
                />
                <Image
                    source={require('../../../assets/monitor.png')}
                    style={{ width: 150, height: 200 }}
                /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },

    titulo: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    container_card: {
        flex: 1,
        width: '100%'
    },
    cards: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        rowGap: 10,
    },
});
