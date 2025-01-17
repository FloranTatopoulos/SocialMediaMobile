import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Welcome from './src/components/Welcome';
import VideoCall from './src/components/VideoCall';
import Messages from './src/components/Messages';
import Profil from './src/components/Profil';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Accueil' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Connexion' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Inscription' }} />  
        <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }} />
        {/* <Stack.Screen name="VideoCall" component={VideoCall} options={{ title: 'VideoCall' }} /> */}
        <Stack.Screen name="Messages" component={Messages} options={{ title: 'Messages' }} />
        <Stack.Screen name='Profil' component={Profil} options={{ title: 'Profil' }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
