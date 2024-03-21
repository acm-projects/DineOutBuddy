import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

export default function useCustomFonts(fontsLoaded, fontError) {

    [fontsLoaded, fontError] = useFonts({
    'Metropolis-Black': require('../../assets/fonts/Metropolis-Black.ttf'),
    'Metropolis-BlackItalic': require('../../assets/fonts/Metropolis-BlackItalic.ttf'),
    'Metropolis-Bold': require('../../assets/fonts/Metropolis-Bold.ttf'),
    'Metropolis-BoldItalic': require('../../assets/fonts/Metropolis-BoldItalic.ttf'),
    'Metropolis-ExtraBold': require('../../assets/fonts/Metropolis-ExtraBold.ttf'),
    'Metropolis-ExtraBoldItalic': require('../../assets/fonts/Metropolis-ExtraBoldItalic.ttf'),
    'Metropolis-ExtraLight': require('../../assets/fonts/Metropolis-ExtraLight.ttf'),
    'Metropolis-ExtraLightItalic': require('../../assets/fonts/Metropolis-ExtraLightItalic.ttf'),
    'Metropolis-Medium': require('../../assets/fonts/Metropolis-Medium.ttf'),
    'Metropolis-MediumItalic': require('../../assets/fonts/Metropolis-MediumItalic.ttf'),
    'Metropolis-Regular': require('../../assets/fonts/Metropolis-Regular.ttf'),
    'Metropolis-RegularItalic': require('../../assets/fonts/Metropolis-RegularItalic.ttf'),
    'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-SemiBold.ttf'),
    'Metropolis-SemiBoldItalic': require('../../assets/fonts/Metropolis-SemiBoldItalic.ttf'),
    'Metropolis-Thin': require('../../assets/fonts/Metropolis-Thin.ttf'),
    'Metropolis-ThinItalic': require('../../assets/fonts/Metropolis-ThinItalic.ttf'),
    'HeyComic': require('../../assets/fonts/HeyComic.ttf'),
  });

    // IT WORKS!!!
    useEffect(() => {
        if (fontsLoaded || fontError) {
          SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);
    
    return { fontsLoaded, fontError };
};