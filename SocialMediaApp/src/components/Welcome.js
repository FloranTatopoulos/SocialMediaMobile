import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
    const [username, setUsername] = useState("");
    const navigation = useNavigation();

    // useEffect(() => {
    // AsyncStorage.getItem('username')
    //   .then((username) => {
    //     if (username) {
    //       setUsername(username);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Erreur lors de la récupération du nom d\'utilisateur :', error);
    //   });
    // }, []);
    
    const handleLogout = async () => {
    //   try {
    //     await AsyncStorage.removeItem('username');
    //     navigation.replace('Accueil')
    //     console.log('Vous avez bien été déconnecté');
    //   } catch (error) {
    //     console.log('Error logging out: ', error);
    //   }
    }

    return (
        <View style={styles.container} >
            <View style={styles.header}> 
                {/* <Pressable onPress={handleLogout}>
                <Image style={styles.logout} source={require('../../assets/logout.jpg')} />
                </Pressable> */}
            </View>
            <View style={styles.content}> 
                <View style={styles.cardwelcome}>
                <Text style={styles.username}>Bienvenue {username}</Text>
                {/* <Image
                style={styles.logo}
                source={require('../../assets/Logo_Unique.png')}
                /> */}
                <Pressable style={styles.buttonblog} onPress={() => 
                navigation.navigate('Messages')}></Pressable>
                </View>
            </View> 
    </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        backgroundColor:'white',
      },
    logout:{
        width: 50, height: 50,       
    },
    content:{
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop:20,
    },
    cardwelcome:{
        width: 300,
        height: 600,
        borderRadius:15,
        backgroundColor: 'rgb(230,230,230)',
        alignItems: 'center',
    },
    logo :{
        marginTop:30,
        width:210,
        height:210,    
      },
    username:{
        marginTop:30,
        fontSize:30,
    },
    buttonblog: {
        marginTop:50,
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        width:200,
        borderRadius: 10,
        backgroundColor: 'rgb(200,200,200)',
      },
});

export default Welcome;