import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';
import { Calendar, Clock, MapPin } from 'lucide-react-native';

interface ServiceCardProps {
  date: string;
  time: string;
  location: string;
  serviceName: string;
  onPress: () => void;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  date,
  time,
  location,
  serviceName,
  onPress,
}) => {
  const { isRTL } = useTranslation();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <Text 
          style={[
            styles.serviceName,
            { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
          ]}
        >
          {serviceName}
        </Text>
        
        <View style={styles.infoRow}>
          <Calendar size={16} color={colors.primary} />
          <Text 
            style={[
              styles.infoText,
              { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
            ]}
          >
            {date}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Clock size={16} color={colors.primary} />
          <Text 
            style={[
              styles.infoText,
              { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
            ]}
          >
            {time}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={16} color={colors.primary} />
          <Text 
            style={[
              styles.infoText,
              { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
            ]}
          >
            {location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  serviceName: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 8,
  },
});

export default ServiceCard;