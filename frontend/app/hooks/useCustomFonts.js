import { useFonts } from "expo-font";
//import { useCallback } from "react";
//import * as SplashScreen from 'expo-splash-screen';

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

    /*
    // Would love to make this work just to figure out how this works tbh, because the function refuses to run even after the dependencies change NO MATTER WHAT TYPE THE VARIABLES ARE 😭)
    // Will come back and try to figure this out if I have enough time ¯\_(ツ)_/¯ for now I'm not using these diggity darn async functions
    useCallback(async () => {
        if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);
    */

    return { fontsLoaded, fontError };
};