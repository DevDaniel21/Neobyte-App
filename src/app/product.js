import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavoriteStore } from '../store/useFavoriteStore';
import { useCartStore } from '../store/useCartStore';

export default function ProductDetails() {
    const router = useRouter();
    const params = useGlobalSearchParams();

    const { favorites, setFavorites } = useFavoriteStore();
    const { cart, setCart } = useCartStore();
    const [canAddToCart, setcanAddToCart] = useState(true);
    const [favorited, setFavorited] = useState('');
    const [color, setColor] = useState('');
    const [user_id, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(5); // Estado para controlar a avaliação

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

    const checkIfInCart = async () => {
        const response = await fetch(`http://localhost:4000/cart/${user_id}`);

        const cartData = await response.json();
        const cartList = cartData.produtoAdicionado;

        if (cartList.length !== 0) {
            const isInCart = cartList.some(
                (item) => item.produto_id === +params.id
            );
            setcanAddToCart(!isInCart);
        } else {
            setcanAddToCart(true);
        }
    };

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
            }
        }
    };

    const handleSubmitComment = async () => {
        if (!commentText.trim()) {
            Alert.alert('Atenção', 'Por favor, escreva um comentário.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/comment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: +user_id,
                    produto_id: +productData.id,
                    texto: commentText,
                    estrela: rating, // Usa a avaliação selecionada
                }),
            });

            if (response.ok) {
                const commentData = await response.json();
                setComments([
                    ...comments,
                    {
                        id: commentData.comment.id,
                        user: { id: user_id, nome: userName },
                        user_id: +user_id,
                        produto_id: +productData.id,
                        texto: commentText,
                        estrela: rating,
                    },
                ]);
                setCommentText(''); // Limpa o campo de texto
                setRating(5); // Reseta a avaliação para 5 estrelas
            }
        } catch (error) {
            console.error('Houve um erro ao tentar enviar comentário:', error);
            Alert.alert('Erro', 'Não foi possível enviar o comentário.');
        }
    };

    const handleDeleteComment = async (commentId) => {
        const response = await fetch(
            `http://localhost:4000/comment/${commentId}`,
            {
                method: 'DELETE',
            }
        );

        if (response.ok) {
            const commentData = await response.json();
            const commentDelete = commentData.comment;
            setComments(
                comments.filter(
                    (comentario) => comentario.id !== commentDelete.id
                )
            );
        }
    };

    const handleAddToCart = async () => {
        try {
            const response = await fetch(`http://localhost:4000/cart/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: +user_id,
                    produto_id: +productData.id,
                    quantidade: 1,
                }),
            });

            if (response.ok) {
                const cartData = await response.json();
                const produtoAdicionado = cartData.produtoAdicionado;

                if (cart.length === 0) {
                    setCart([produtoAdicionado]);
                } else {
                    setCart([...cart, produtoAdicionado]);
                }
                setcanAddToCart(false);
            }
        } catch (error) {
            console.error('Erro ao tentar adicionar ao carrinho: ', error);
            Alert.alert('Erro', 'Não foi possível adicionar ao carrinho.');
        }
    };

    useEffect(() => {
        if (user_id) {
            checkIfFavorited();
            checkIfInCart();
        }
    }, [user_id]);

    const renderStars = (currentRating = 3, total = 5) => {
        return Array.from({ length: total }, (_, index) => (
            <FontAwesome
                key={index}
                name={index < currentRating ? 'star' : 'star-o'}
                size={20}
                color="#FFD700"
            />
        ));
    };

    // Componente para selecionar estrelas (editável)
    const renderSelectableStars = () => {
        return (
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Sua avaliação:</Text>
                <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Pressable
                            key={star}
                            onPress={() => setRating(star)}
                            style={styles.starButton}
                        >
                            <FontAwesome
                                name={star <= rating ? 'star' : 'star-o'}
                                size={28}
                                color="#FFD700"
                            />
                        </Pressable>
                    ))}
                </View>
            </View>
        );
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

                    <View style={styles.addCommentContainer}>
                        {/* Seletor de estrelas */}
                        {renderSelectableStars()}

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
                        <Pressable
                            style={styles.addCommentButton}
                            onPress={handleSubmitComment}
                        >
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
                                <View style={styles.commentHeader}>
                                    <View style={styles.commentUserInfo}>
                                        <Text style={styles.commentName}>
                                            {comment.user?.nome || 'Usuário'}
                                        </Text>
                                        <View style={styles.commentStars}>
                                            {renderStars(comment.estrela, 5)}
                                        </View>
                                    </View>
                                    {/* Botão de excluir (só aparece para o autor) */}
                                    {comment.user_id === +user_id && (
                                        <Pressable
                                            onPress={() =>
                                                handleDeleteComment(comment.id)
                                            }
                                            style={styles.deleteButton}
                                        >
                                            <FontAwesome
                                                name="trash"
                                                size={18}
                                                color="#FF4444"
                                            />
                                        </Pressable>
                                    )}
                                </View>
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
                        style={[
                            styles.actionButton,
                            styles.cartButton,
                            !canAddToCart && styles.cartButtonDisabled,
                        ]}
                        android_ripple={{ color: '#555' }}
                        onPress={handleAddToCart}
                        disabled={!canAddToCart}
                    >
                        <FontAwesome name="cart-plus" size={20} color="#fff" />
                        <Text style={styles.buttonText}>
                            {canAddToCart
                                ? 'Adicionar ao carrinho'
                                : 'Já está no carrinho'}
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
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        gap: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    ratingContainer: {
        gap: 8,
    },
    ratingLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
    },
    starButton: {
        padding: 4,
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
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    commentUserInfo: {
        flex: 1,
        gap: 6,
    },
    commentName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    commentStars: {
        flexDirection: 'row',
        gap: 2,
    },
    deleteButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#ffe5e5',
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
        backgroundColor: '#137969',
    },
    cartButtonDisabled: {
        backgroundColor: '#444',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
    },
});
