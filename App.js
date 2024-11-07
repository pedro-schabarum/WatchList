import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import Navigation from './src/routes/navigation';

import { GlobalProvider } from './src/contexts/GlobalContext';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    "PoppinsRegular": Poppins_400Regular,
    "PoppinsMedium": Poppins_500Medium,
    "InterMedium" : Inter_500Medium,
    "InterSemi" : Inter_600SemiBold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <GlobalProvider>
      <Navigation/>
    </GlobalProvider>
  );
}
