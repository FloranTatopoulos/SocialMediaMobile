import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';

const Home = ({ navigation }) => {
    
    return (
    <View style={styles.container}>
          <Text style={styles.title}>Bienvenue !</Text>
          <Button title="Connexion" onPress={() => navigation.navigate('Login')} />
          <Button title="Inscription" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default Home;
