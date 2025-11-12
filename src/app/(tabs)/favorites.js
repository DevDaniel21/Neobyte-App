import { View, Text, StyleSheet, FlatList } from 'react-native';
import CardFavorite from '../../components/CardFavorite';
import Foundation from '@expo/vector-icons/Foundation';
import { useEffect, useState } from 'react';
import { useFavoriteStore } from '../../store/useFavoriteStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favorites() {
    const { favorites, setFavorites } = useFavoriteStore();
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const getUserId = async () => {
            try {
                const userLogged = await AsyncStorage.getItem('userLogged');
                const id = JSON.parse(userLogged).id;
                setUserId(id);
            } catch (error) {
                console.log('Erro ao obter userId:', error);
            }
        };
        getUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            const listFavorites = async () => {
                const response = await fetch(
                    `http://localhost:4000/favorite/${userId}`
                );

                if (response.ok) {
                    const data = await response.json();
                    setFavorites(await data.favorites);
                } else {
                    console.log('Erro ao carregar lista');
                }
            };
            listFavorites();
        }
    }, [userId, setFavorites]);

    console.log('Favorites:', favorites);

    return (
        <View style={styles.container}>
            <View style={styles.title_container}>
                <Foundation name="heart" size={40} color="#fff" />
                <Text style={styles.title}>Favoritos</Text>
            </View>

            <View style={styles.favorites}>
                <FlatList
                    data={favorites}
                    renderItem={({ item }) => (
                        <CardFavorite
                            key={item.produto.id}
                            id={item.produto.id}
                            nome={item.produto.nome}
                            valor={item.produto.valor}
                            capa={item.produto.capa}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <View style={{ padding: 20 }}>
                            <Text style={{ color: '#fff' }}>
                                Nenhum favorito encontrado
                            </Text>
                        </View>
                    )}
                />
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
    favorites: {
        marginTop: 20,
        width: '100%',
        gap: 20,
        flex: 1,
        alignItems: 'center',
        overflow: 'scroll',
    },
});
