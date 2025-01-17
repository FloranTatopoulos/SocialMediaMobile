import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Profil = ({ user }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: user.profilePicture }} style={styles.image} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bio: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
});

export default Profil;