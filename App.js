import { StyleSheet } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import Navigation from './src/routes/navigation';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    "PoppinsRegular": Poppins_400Regular,
    "PoppinsMedium": Poppins_500Medium,
    "InterMedium" : Inter_500Medium
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Navigation/>
  );
}
