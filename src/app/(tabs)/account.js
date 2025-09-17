import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
                    <MaterialIcons name="person" size={40} color="#C5CBD1" />
                    <TouchableOpacity style={styles.link_text_container}>
                        <Text style={styles.link_text}>Meus Pedidos</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={40}
                            color="#C5CBD1"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.link_container}>
                    <MaterialIcons name="person" size={40} color="#C5CBD1" />
                    <TouchableOpacity style={styles.link_text_container}>
                        <Text style={styles.link_text}>Meus Pedidos</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={40}
                            color="#C5CBD1"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.link_container}>
                    <MaterialIcons name="person" size={40} color="#C5CBD1" />
                    <TouchableOpacity style={styles.link_text_container}>
                        <Text style={styles.link_text}>Meus Pedidos</Text>
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
    links: {
        width: '100%',
        marginTop: 20,
        gap: 15,
    },
    link_container: {
        width: '100%',
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
