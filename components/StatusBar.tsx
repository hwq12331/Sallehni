import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';

type Status = 'received' | 'diagnosed' | 'inService' | 'completed';

type StatusBarProps = {
  currentStatus: Status;
};

const StatusBar: React.FC<StatusBarProps> = ({ currentStatus }) => {
  const { t, isRTL } = useTranslation();
  
  const statuses: Status[] = ['received', 'diagnosed', 'inService', 'completed'];
  
  const getCurrentIndex = () => {
    return statuses.findIndex(status => status === currentStatus);
  };
  
  const isCompleted = (status: Status) => {
    const currentIndex = getCurrentIndex();
    const statusIndex = statuses.findIndex(s => s === status);
    return statusIndex <= currentIndex;
  };
  
  const getStatusLabel = (status: Status) => {
    switch (status) {
      case 'received':
        return t('vehicleReceived');
      case 'diagnosed':
        return t('diagnosed');
      case 'inService':
        return t('inService');
      case 'completed':
        return t('completed');
      default:
        return '';
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.statusLine} />
      
      {statuses.map((status, index) => (
        <View 
          key={status} 
          style={[
            styles.statusItemContainer,
            { 
              left: `${index * (100 / (statuses.length - 1))}%`,
              marginLeft: index === 0 ? 0 : -25 // Adjust for dot size
            }
          ]}
        >
          <View 
            style={[
              styles.statusDot,
              isCompleted(status) ? styles.completedDot : styles.pendingDot
            ]} 
          />
          <Text 
            style={[
              styles.statusText,
              isCompleted(status) ? styles.completedText : styles.pendingText,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}
          >
            {getStatusLabel(status)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    position: 'relative',
    marginVertical: 20,
  },
  statusLine: {
    position: 'absolute',
    top: 15,
    left: 25,
    right: 25,
    height: 3,
    backgroundColor: colors.gray[200],
    zIndex: 1,
  },
  statusItemContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: 50,
    zIndex: 2,
  },
  statusDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  completedDot: {
    backgroundColor: colors.primary,
  },
  pendingDot: {
    backgroundColor: colors.gray[300],
  },
  statusText: {
    textAlign: 'center',
    fontSize: 12,
    width: 70,
  },
  completedText: {
    color: colors.primary,
  },
  pendingText: {
    color: colors.gray[500],
  },
});

export default StatusBar;