import { View, Text, StyleSheet } from 'react-native';
import CardFavorite from '../../components/CardFavorite'
import Foundation from '@expo/vector-icons/Foundation';

export default function Favorites() {
    const favorites = [
        {
            id: '1',
            name: 'Produto favorito com um nome bem extenso para ficar dificil de ler',
            price: '99,90',
            image: 'https://m.media-amazon.com/images/I/611drnhmwML._AC_SY450_.jpg',
        },
        {
            id: '2',
            name: 'Produto 2',
            price: '49,90',
            image: 'https://m.media-amazon.com/images/I/611drnhmwML._AC_SY450_.jpg',
        },
        {
            id: '3',
            name: 'Produto 3',
            price: '29,90',
            image: 'https://m.media-amazon.com/images/I/611drnhmwML._AC_SY450_.jpg',
        },
        {
            id: '4',
            name: 'Produto 4',
            price: '19,90',
            image: 'https://m.media-amazon.com/images/I/611drnhmwML._AC_SY450_.jpg',
        },
        {
            id: '5',
            name: 'Produto 5',
            price: '9,90',
            image: 'https://m.media-amazon.com/images/I/611drnhmwML._AC_SY450_.jpg',
        },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.title_container}>
                <Foundation name="heart" size={40} color="#fff" />
                <Text style={styles.title}>Favoritos</Text>
            </View>

            <View style={styles.favorites}>
                {favorites.map((favorite) => (
                    <CardFavorite
                        key={favorite.id}
                        id={favorite.id}
                        name={favorite.name} 
                        price={favorite.price}
                        image={favorite.image}
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
    favorites: {
        marginTop: 20,
        width: '100%',
        gap: 20,
        flex: 1,
        alignItems: 'center',
        overflow: 'scroll'
    },
});
