import { Tabs } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { Chrome as Home, CircleAlert as AlertCircle, Calendar, Activity, History } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { colors } from '@/constants/colors';

export default function TabLayout() {
  const { t, isRTL } = useTranslation();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: {
          fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium',
          fontSize: 12,
          paddingBottom: 4,
        },
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diagnostics"
        options={{
          title: t('diagnostics'),
          tabBarIcon: ({ color, size }) => (
            <AlertCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: t('booking'),
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: t('tracking'),
          tabBarIcon: ({ color, size }) => (
            <Activity size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t('history'),
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingTop: 6,
    paddingBottom: 6,
    elevation: 8,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
});