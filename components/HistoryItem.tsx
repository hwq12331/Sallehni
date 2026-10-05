import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';
import { FileText, Shield, Share2 } from 'lucide-react-native';

type ServiceType = 'oil' | 'repair' | 'inspection';

interface HistoryItemProps {
  date: string;
  serviceName: string;
  garage: string;
  cost: number;
  serviceType: ServiceType;
  warrantyValid: boolean;
  onPress: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  serviceName,
  garage,
  cost,
  serviceType,
  warrantyValid,
  onPress,
}) => {
  const { t, isRTL } = useTranslation();
  
  const getServiceIcon = (type: ServiceType) => {
    switch (type) {
      case 'oil':
        return colors.success;
      case 'repair':
        return colors.warning;
      case 'inspection':
        return colors.primary;
    }
  };
  
  const serviceColor = getServiceIcon(serviceType);
  
  return (
    <TouchableOpacity 
      style={[styles.container, { borderLeftColor: serviceColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.headerRow}>
        <Text style={[
          styles.date,
          { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
        ]}>
          {date}
        </Text>
        <Text style={[
          styles.cost,
          { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
        ]}>
          {cost} {t('sar')}
        </Text>
      </View>
      
      <Text style={[
        styles.serviceName,
        { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
      ]}>
        {serviceName}
      </Text>
      
      <Text style={[
        styles.garage,
        { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
      ]}>
        {garage}
      </Text>
      
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <FileText size={16} color={colors.gray[600]} />
          <Text style={[
            styles.actionText,
            { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
          ]}>
            {t('downloadReceipt')}
          </Text>
        </TouchableOpacity>
        
        {warrantyValid && (
          <TouchableOpacity style={styles.actionButton}>
            <Shield size={16} color={colors.success} />
            <Text style={[
              styles.actionText,
              { color: colors.success, fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
            ]}>
              {t('viewWarranty')}
            </Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={16} color={colors.gray[600]} />
          <Text style={[
            styles.actionText,
            { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
          ]}>
            {t('shareRecord')}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: colors.gray[500],
  },
  cost: {
    fontSize: 16,
    color: colors.primary,
  },
  serviceName: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 4,
  },
  garage: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 12,
    color: colors.gray[600],
    marginLeft: 4,
  },
});

export default HistoryItem;