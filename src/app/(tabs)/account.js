import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Account() {
    const user = { name: 'Usuário' };

    return (
        <View style={styles.container}>
            <View style={styles.message}>
                <Ionicons name="person-circle-outline" size={54} color="#fff" />
                <Text style={styles.message_text}>{`Olá, ${user.name}`}</Text>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.links}>
                <View style={styles.link_container}>
                    <View style={styles.icone}>
                        <MaterialIcons
                            name="person"
                            size={40}
                            color="#C5CBD1"
                        />
                    </View>
                    <TouchableOpacity style={styles.link_text_container}>
                        <Text style={styles.link_text}>Meus pedidos</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={40}
                            color="#C5CBD1"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.link_container}>
                    <View style={styles.icone}>
                        <Foundation name="heart" size={40} color="#C5CBD1" />
                    </View>
                    <TouchableOpacity style={styles.link_text_container}>
                        <Text style={styles.link_text}>Meus favoritos</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={40}
                            color="#C5CBD1"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.link_container}>
                    <View style={styles.icone}>
                        <Ionicons name="cart" size={40} color="#C5CBD1" />
                    </View>
                    <TouchableOpacity style={styles.link_text_container}>
                        <Text style={styles.link_text}>Meu carrinho</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={40}
                            color="#C5CBD1"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.link_container}>
                    <View style={styles.icone}>
                        <FontAwesome5
                            name="map-marker-alt"
                            size={35}
                            color="#C5CBD1"
                        />
                    </View>
                    <TouchableOpacity style={styles.link_text_container}>
                        <Text style={styles.link_text}>Meus endereços</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={40}
                            color="#C5CBD1"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.link_container}>
                    <View style={styles.icone}>
                        <Ionicons name="clipboard" size={40} color={"#C5CBD1"} />
                    </View>
                    <TouchableOpacity style={styles.link_text_container}>
                        <Text style={styles.link_text}>Meus endereços</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={40}
                            color="#C5CBD1"
                        />
                    </TouchableOpacity>
                </View>
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
    message: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    message_text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: '#fff',
        marginTop: 5,
    },
    icone: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    links: {
        width: '100%',
        marginTop: 20,
        gap: 18,
    },
    link_container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    link_text_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link_text: {
        color: '#C5CBD1',
        fontSize: 18,
        fontWeight: '500',
    },
});
