import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavoriteStore } from '../store/useFavoriteStore';

export default function ProductDetails() {
    const router = useRouter();
    const params = useGlobalSearchParams();

    const { favorites, setFavorites } = useFavoriteStore();
    const [favorited, setFavorited] = useState('');
    const [color, setColor] = useState('');
    const [user_id, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    const [productData, setProductData] = useState({
        id: params.id,
        name: params.nome || 'Produto sem nome',
        price: params.valor || '0.00',
        image: params.imagem,
    });

    useEffect(() => {
        const getProductData = async () => {
            const response = await fetch(
                `http://localhost:4000/product/${productData.id}`
            );
            const data = await response.json();
            setProductData({
                ...productData,
                descricao: data.product.descricao,
                avaliacaoTotal: `${data.product.comentario.length} avaliações`,
            });
            setComments(data.product.comentario);
            console.log(data.product.comentario)
        };
        getProductData();
    }, []);

    useEffect(() => {
        const getUserId = async () => {
            const userLogged = await AsyncStorage.getItem('userLogged');
            const userData = JSON.parse(userLogged);
            setUserId(userData.id);
            setUserName(userData.nome);
        };
        getUserId();
    }, []);

    useEffect(() => {
        const listComments = async () => {
            const response = await fetch(
                `http://localhost:4000/comments/${productData.id}`
            );
            const data = await response.json();
            setComments(data.comments);
        }
    })

    const listComments = [
        {
            id: 1,
            user: { nome: 'João Silva' },
            comentario:
                'Produto excelente! Superou minhas expectativas. A qualidade é muito boa e chegou rápido.',
        },
        {
            id: 2,
            user: { nome: 'Maria Santos' },
            comentario:
                'Adorei a compra! Muito bonito e funcional. Recomendo para todos.',
        },
        {
            id: 3,
            user: { nome: 'Carlos Oliveira' },
            comentario:
                'Ótimo custo-benefício. Produto de qualidade por um preço justo. Voltaria a comprar.',
        },
    ];

    const checkIfFavorited = async () => {
        const response = await fetch(
            `http://localhost:4000/favorite/${user_id}`
        );
        const listfavorites = await response.json();
        const isFavorited = await listfavorites.favorites.some(
            (fav) => fav.produto_id === +params.id
        );
        if (isFavorited) {
            setFavorited('heart');
            setColor('#FF4444');
        } else {
            setFavorited('heart-o');
            setColor('#fff');
        }
    };

    const handleFavorite = async () => {
        if (favorited == 'heart-o') {
            const newFavorite = await fetch(`http://localhost:4000/favorite/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id,
                    produto_id: productData.id,
                }),
            });

            if (newFavorite.ok) {
                setFavorited('heart');
                setColor('#FF4444');
                if (favorites.length === 0) {
                    setFavorites([
                        {
                            user_id: user_id,
                            produto_id: productData.id,
                            produto: {
                                id: productData.id,
                                nome: productData.name,
                                valor: productData.price,
                                capa: productData.image,
                            },
                        },
                    ]);
                } else {
                    setFavorites([
                        ...favorites,
                        {
                            user_id: user_id,
                            produto_id: productData.id,
                            produto: {
                                id: productData.id,
                                nome: productData.name,
                                valor: productData.price,
                                capa: productData.image,
                            },
                        },
                    ]);
                }
            }
        } else {
            const deleteFavorite = await fetch(
                `http://localhost:4000/favorite/`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: user_id,
                        produto_id: productData.id,
                    }),
                }
            );

            if (deleteFavorite.ok) {
                setFavorited('heart-o');
                setColor('#fff');
                const updatedFavorites = favorites.filter(
                    (fav) => fav.produto_id != +productData.id
                );
                setFavorites(updatedFavorites);
                console.log(updatedFavorites);
            }
        }
    };

    useEffect(() => {
        if (user_id) {
            checkIfFavorited();
        }
    }, [user_id]);

    const renderStars = (rating = 3, total = 5) => {
        return Array.from({ length: total }, (_, index) => (
            <FontAwesome
                key={index}
                name={index < rating ? 'star' : 'star-o'}
                size={20}
                color="#FFD700"
            />
        ));
    };

    return (
        <ScrollView style={styles.container}>
            {/* Imagem do produto com botão de favorito */}
            <View style={styles.imageContainer}>
                <Image
                    style={styles.productImage}
                    source={{ uri: productData.image }}
                    contentFit="cover"
                    transition={300}
                />
                <Pressable
                    onPress={handleFavorite}
                    style={styles.favoriteButton}
                >
                    <FontAwesome name={favorited} size={28} color={color} />
                </Pressable>
            </View>

            {/* Informações do produto */}
            <View style={styles.infoSection}>
                <Text style={styles.productName}>{productData.name}</Text>

                {/* Avaliação com estrelas */}
                <View style={styles.ratingSection}>
                    <View style={styles.starsRow}>{renderStars(3, 5)}</View>
                    <Text style={styles.reviewCount}>
                        {productData.avaliacaoTotal}
                    </Text>
                </View>

                <View style={styles.priceSection}>
                    <Text style={styles.priceLabel}>Preço:</Text>
                    <Text style={styles.priceValue}>
                        R${' '}
                        {parseFloat(productData.price)
                            .toFixed(2)
                            .replace('.', ',')}
                    </Text>
                </View>

                {/* Descrição do produto */}
                <View style={styles.descriptionSection}>
                    <Text style={styles.sectionTitle}>Descrição</Text>
                    <Text style={styles.descriptionText}>
                        {productData.descricao}
                    </Text>
                </View>

                {/* Características */}
                <View style={styles.featuresSection}>
                    <Text style={styles.sectionTitle}>Características</Text>
                    <View style={styles.featureItem}>
                        <FontAwesome
                            name="check-circle"
                            size={18}
                            color="#137969"
                        />
                        <Text style={styles.featureText}>
                            Material de alta qualidade
                        </Text>
                    </View>
                    <View style={styles.featureItem}>
                        <FontAwesome
                            name="check-circle"
                            size={18}
                            color="#137969"
                        />
                        <Text style={styles.featureText}>
                            Garantia de 12 meses
                        </Text>
                    </View>
                    <View style={styles.featureItem}>
                        <FontAwesome
                            name="check-circle"
                            size={18}
                            color="#137969"
                        />
                        <Text style={styles.featureText}>
                            Entrega rápida e segura
                        </Text>
                    </View>
                    <View style={styles.featureItem}>
                        <FontAwesome
                            name="check-circle"
                            size={18}
                            color="#137969"
                        />
                        <Text style={styles.featureText}>Fácil manutenção</Text>
                    </View>
                </View>

                {/* Comentários */}
                <View style={styles.commentsSection}>
                    <Text style={styles.sectionTitle}>Comentários</Text>

                    {/* Formulário para adicionar comentário (apenas visual) */}
                    <View style={styles.addCommentContainer}>
                        <TextInput
                            style={[
                                styles.commentInput,
                                styles.commentTextArea,
                            ]}
                            placeholder="Escreva seu comentário..."
                            placeholderTextColor="#999"
                            value={commentText}
                            onChangeText={setCommentText}
                            multiline
                            numberOfLines={4}
                        />
                        <Pressable style={styles.addCommentButton} disabled>
                            <FontAwesome name="send" size={16} color="#fff" />
                            <Text style={styles.addCommentButtonText}>
                                Enviar Comentário
                            </Text>
                        </Pressable>
                    </View>

                    {/* Lista de comentários */}
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <View key={comment.id} style={styles.commentCard}>
                                <Text style={styles.commentName}>
                                    {comment.user?.nome || 'Usuário'}
                                </Text>
                                <Text style={styles.commentText}>
                                    {comment.texto}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noCommentsText}>
                            Nenhum comentário ainda. Seja o primeiro a comentar!
                        </Text>
                    )}
                </View>

                {/* Botões de ação */}
                <View style={styles.actionsContainer}>
                    <Pressable
                        style={[styles.actionButton, styles.buyButton]}
                        android_ripple={{ color: '#0d5f52' }}
                    >
                        <FontAwesome
                            name="shopping-bag"
                            size={20}
                            color="#fff"
                        />
                        <Text style={styles.buttonText}>Comprar Agora</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.actionButton, styles.cartButton]}
                        android_ripple={{ color: '#555' }}
                    >
                        <FontAwesome name="cart-plus" size={20} color="#fff" />
                        <Text style={styles.buttonText}>
                            Adicionar ao Carrinho
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    imageContainer: {
        width: '100%',
        height: 350,
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    favoriteButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 50,
        zIndex: 10,
    },
    infoSection: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 32,
        minHeight: 300,
    },
    productName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#222',
        marginBottom: 12,
        lineHeight: 32,
    },
    ratingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    starsRow: {
        flexDirection: 'row',
        gap: 4,
    },
    reviewCount: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    priceSection: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 24,
        gap: 8,
    },
    priceLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    priceValue: {
        fontSize: 32,
        fontWeight: '800',
        color: '#137969',
    },
    descriptionSection: {
        marginBottom: 24,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222',
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 15,
        color: '#555',
        lineHeight: 24,
    },
    featuresSection: {
        marginBottom: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    featureText: {
        fontSize: 15,
        color: '#555',
        flex: 1,
    },
    commentsSection: {
        marginBottom: 24,
    },
    addCommentContainer: {
        backgroundColor: '#137969',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        gap: 12,
    },
    commentInput: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 15,
        color: '#222',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    commentTextArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    addCommentButton: {
        backgroundColor: '#137969',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    addCommentButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    noCommentsText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        paddingVertical: 20,
        fontStyle: 'italic',
    },
    commentCard: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#137969',
    },
    commentName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    commentText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    actionsContainer: {
        gap: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 10,
    },
    buyButton: {
        backgroundColor: '#137969',
    },
    cartButton: {
        backgroundColor: '#444',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
    },
});
