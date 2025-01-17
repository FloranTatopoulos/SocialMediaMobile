import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthService from '../axios/auth.axios';
import isEmail  from 'validator/lib/isEmail';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigation = useNavigation();
  
    const isValidUrl = (url) => {
        const pattern = new RegExp(
          '^(https?:\\/\\/)?' +
            '((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\\.)+[a-zA-Z]{2,}|' +
            '((\d{1,3}\\.){3}\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-zA-Z\d%_.~+]*)*' +
            '(\\?[;&a-zA-Z\d%_.~+=-]*)?' + 
            '(\\#[-a-zA-Z\d_]*)?$',
          'i'
        );
        return !!pattern.test(url);
      };
    
    const handleRegister = async() => {
      if (!username || !email || !password ) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs");
        setLoading(false);
        return;
      }
      if (username.length < 3 || username.length > 20) {
        Alert.alert(
          "Erreur",
          "Le nom d'utilisateur doit comporter entre 3 et 20 caractères"
        );
        
        setLoading(false);
        return;
      }
      if (!isEmail(email)) {
        Alert.alert("Erreur", "L'e-mail n'est pas valide");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        Alert.alert(
          "Erreur",
          "Le mot de passe doit comporter minimum 6 caractères"
        );
        setLoading(false);
        return;
      }
      if (profileImage && !isValidUrl(profileImage)) {
        Alert.alert("Erreur", "L'URL de l'image n'est pas valide");
        return;
      }
      
      AuthService.register(username,email, password, profileImage)
        .then(() => {
          setUsername("");
          setEmail("");
          setPassword("");
          setProfileImage("");
          navigation.replace("Login");        
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            console(error)
          Alert.alert("Erreur", resMessage);
        });
    
      }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Photo de profil (facultatif)"
                value={profileImage}
                onChangeText={setProfileImage}
            />
            <Pressable style={styles.buttonRegister} onPress={handleRegister}>
            <Text>S'inscrire</Text></Pressable>
            <Text>Vous avez deja un compte ? <Pressable onPress={() => 
                    navigation.replace('Login')}><Text>Connectez vous</Text></Pressable></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default Register;