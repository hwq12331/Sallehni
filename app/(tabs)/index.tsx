import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import HealthGauge from '@/components/HealthGauge';
import QuickActionButton from '@/components/QuickActionButton';
import ServiceCard from '@/components/ServiceCard';
import { useRouter } from 'expo-router';
import { Wrench, TriangleAlert as AlertTriangle, Activity, Clock, Car } from 'lucide-react-native';

export default function HomeScreen() {
  const { t, isRTL } = useTranslation();
  const router = useRouter();
  
  // Mock data for demo
  const vehicleHealth = 85;
  const upcomingService = {
    date: '23 شوال 1446',
    time: '10:30 AM',
    location: 'ورشة التوفيق - الرياض',
    serviceName: 'الفحص الدوري',
  };
  
  // Time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 18) return t('goodAfternoon');
    return t('goodEvening');
  };
  
  return (
    <View style={styles.container}>
      <Header title={`${t('welcome')} خالد`} />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.vehicleContainer}>
          <View style={styles.vehicleInfo}>
            <Text style={[
              styles.sectionTitle,
              { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
            ]}>
              {t('vehicleHealth')}
            </Text>
            <HealthGauge percentage={vehicleHealth} />
          </View>
          
          <View style={styles.vehicleImageContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/2771008/pexels-photo-2771008.jpeg' }} 
              style={styles.vehicleImage}
              resizeMode="contain"
            />
            <Text style={[
              styles.vehicleName,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}>
              Toyota Camry 2023
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
          ]}>
            {t('upcomingService')}
          </Text>
          
          <ServiceCard 
            date={upcomingService.date}
            time={upcomingService.time}
            location={upcomingService.location}
            serviceName={upcomingService.serviceName}
            onPress={() => router.push('/booking')}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
          ]}>
            {t('quickActions')}
          </Text>
          
          <View style={styles.actionsGrid}>
            <View style={styles.actionRow}>
              <QuickActionButton
                title={t('bookService')}
                icon={<Wrench size={20} color={colors.white} />}
                onPress={() => router.push('/booking')}
                primary
                style={styles.actionButton}
              />
              
              <QuickActionButton
                title={t('runDiagnostics')}
                icon={<AlertTriangle size={20} color={colors.white} />}
                onPress={() => router.push('/diagnostics')}
                primary
                style={styles.actionButton}
              />
            </View>
            
            <View style={styles.actionRow}>
              <QuickActionButton
                title={t('trackRepair')}
                icon={<Activity size={20} color={colors.primary} />}
                onPress={() => router.push('/tracking')}
                style={styles.actionButton}
              />
              
              <QuickActionButton
                title={t('viewHistory')}
                icon={<Clock size={20} color={colors.primary} />}
                onPress={() => router.push('/history')}
                style={styles.actionButton}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  vehicleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginTop: -40,
    marginBottom: 20,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  vehicleInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  vehicleImage: {
    width: 120,
    height: 80,
    marginBottom: 8,
  },
  vehicleName: {
    fontSize: 14,
    color: colors.gray[700],
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.text,
    marginBottom: 16,
  },
  actionsGrid: {
    marginHorizontal: -8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});