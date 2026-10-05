import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';

type UrgencyLevel = 'urgent' | 'minor' | 'routine';

interface IssueCardProps {
  title: string;
  description: string;
  costRange: { min: number; max: number };
  urgency: UrgencyLevel;
  onViewDetails: () => void;
  onBookRepair: () => void;
}

const IssueCard: React.FC<IssueCardProps> = ({
  title,
  description,
  costRange,
  urgency,
  onViewDetails,
  onBookRepair,
}) => {
  const { t, isRTL } = useTranslation();
  
  const getUrgencyColor = (level: UrgencyLevel) => {
    switch (level) {
      case 'urgent':
        return colors.error;
      case 'minor':
        return colors.warning;
      case 'routine':
        return colors.success;
      default:
        return colors.gray[500];
    }
  };
  
  const getUrgencyLabel = (level: UrgencyLevel) => {
    switch (level) {
      case 'urgent':
        return t('urgentAttention');
      case 'minor':
        return t('minorIssue');
      case 'routine':
        return t('routineMaintenance');
      default:
        return '';
    }
  };
  
  const urgencyColor = getUrgencyColor(urgency);
  
  return (
    <View style={[styles.container, { borderLeftColor: urgencyColor }]}>
      <View style={styles.urgencyBadge}>
        <Text style={[
          styles.urgencyText,
          { 
            color: urgencyColor,
            fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium'
          }
        ]}>
          {getUrgencyLabel(urgency)}
        </Text>
      </View>
      
      <Text style={[
        styles.title,
        { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
      ]}>
        {title}
      </Text>
      
      <Text style={[
        styles.description,
        { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
      ]}>
        {description}
      </Text>
      
      <View style={styles.costContainer}>
        <Text style={[
          styles.costLabel,
          { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
        ]}>
          {t('estimatedCost')}:
        </Text>
        <Text style={[
          styles.costValue,
          { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
        ]}>
          {costRange.min} - {costRange.max} {t('sar')}
        </Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.detailsButton} 
          onPress={onViewDetails}
        >
          <Text style={[
            styles.detailsButtonText,
            { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
          ]}>
            {t('viewDetails')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bookButton} 
          onPress={onBookRepair}
        >
          <Text style={[
            styles.bookButtonText,
            { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
          ]}>
            {t('bookRepair')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    borderLeftWidth: 4,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  urgencyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    marginBottom: 8,
  },
  urgencyText: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 12,
    lineHeight: 20,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  costLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  costValue: {
    fontSize: 16,
    color: colors.primary,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: colors.text,
  },
  bookButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: colors.white,
  },
});

export default IssueCard;