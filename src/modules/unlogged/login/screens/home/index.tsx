import { LoggedStackParamList } from '@modules/logged';
import { UnloggedStackParamList } from '@modules/unlogged';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, Pressable } from 'react-native';
type HomeProps = StackScreenProps<UnloggedStackParamList, 'Home'>;
export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };
  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };
  console.log(getToken());
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>LOGIN SUCCESS</Text>
      <Pressable onPress={() => navigation.navigate('Home')}></Pressable>
      <Pressable
        onPress={() => logOut()}
        style={{ backgroundColor: 'black', padding: 10 }}>
        <Text style={{ color: 'white' }}>Log Out</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('ChangePasswordDraft')}
        style={{ backgroundColor: 'blue', padding: 10, marginTop: 30 }}>
        <Text style={{ color: 'white' }}>Change Password</Text>
      </Pressable>
    </View>
  );
};
