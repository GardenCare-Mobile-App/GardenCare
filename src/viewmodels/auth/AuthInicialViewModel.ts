import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';

type AuthNav = NativeStackNavigationProp<AuthStackParamList>;
export function useInicialViewModel() {

  const navigation = useNavigation<AuthNav>();
  return {

    irParaLogin: () => navigation.navigate('Login'),

    irParaRegistrar: () => navigation.navigate('Register'),

  };
}