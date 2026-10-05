import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { 
  Inter_400Regular, 
  Inter_500Medium,
  Inter_700Bold 
} from '@expo-google-fonts/inter';
import {
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold
} from '@expo-google-fonts/tajawal';
import { SplashScreen } from 'expo-router';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { CircleHelp as HelpCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { I18nProvider } from '@/contexts/I18nContext';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
    'Tajawal-Regular': Tajawal_400Regular,
    'Tajawal-Medium': Tajawal_500Medium,
    'Tajawal-Bold': Tajawal_700Bold
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <I18nProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="support" options={{ presentation: 'modal' }} />
      </Stack>
      <View style={styles.supportButtonContainer}>
        <TouchableOpacity
          style={styles.supportButton}
          onPress={() => router.push('/support')}
        >
          <HelpCircle size={24} color={colors.white} />
          <Text style={styles.supportButtonText}>Support</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </I18nProvider>
  );
}

const styles = StyleSheet.create({
  supportButtonContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 1000,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  supportButtonText: {
    color: colors.white,
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  }
});