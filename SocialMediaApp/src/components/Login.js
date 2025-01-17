import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import AuthService from '../axios/auth.axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);
  
    const navigation = useNavigation();
  
    const handleLogin = async () => {
  
      if (!email || !password) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs");
        setLoading(false);
        return;
      }
      try{
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        AuthService.login(email, password)
        .then(() => {
          setEmail("");
          setPassword("");
          navigation.replace("Welcome");        
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
      } catch (error) {
        Alert.alert("Erreur", "Une erreur s'est produite lors du stockage des donnÃ©es.");
      }
    };

    return (
        <View style={styles.container}>
        <View>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Pressable onPress={handleLogin} >
            <Text style={styles.title}>Login</Text></Pressable>
            <Text>Vous n'avez pas encore de compte ? <Pressable onPress={() => 
                navigation.replace('Register')}><Text>Inscrivez vous</Text></Pressable></Text>
            {message === 404 ?
            <Text> Utilisateur introuvable</Text>
                : message === 401 ? 
                <Text> Utilisateur ou mot de passe incorrect</Text> : null }
            </View> 
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

export default Login;