import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';

interface CalendarToggleProps {
  onToggle: () => void;
}

const CalendarToggle: React.FC<CalendarToggleProps> = ({ onToggle }) => {
  const { t, isRTL, isHijri } = useTranslation();
  
  return (
    <View style={styles.container}>
      <Text style={[
        styles.label,
        { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
      ]}>
        {t('selectCalendar')}:
      </Text>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            isHijri ? styles.activeButton : styles.inactiveButton,
            { borderTopRightRadius: isRTL ? 0 : 20, borderBottomRightRadius: isRTL ? 0 : 20, borderTopLeftRadius: isRTL ? 20 : 0, borderBottomLeftRadius: isRTL ? 20 : 0 }
          ]}
          onPress={isHijri ? undefined : onToggle}
        >
          <Text style={[
            styles.toggleText,
            isHijri ? styles.activeText : styles.inactiveText,
            { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
          ]}>
            {t('hijri')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !isHijri ? styles.activeButton : styles.inactiveButton,
            { borderTopLeftRadius: isRTL ? 0 : 20, borderBottomLeftRadius: isRTL ? 0 : 20, borderTopRightRadius: isRTL ? 20 : 0, borderBottomRightRadius: isRTL ? 20 : 0 }
          ]}
          onPress={!isHijri ? undefined : onToggle}
        >
          <Text style={[
            styles.toggleText,
            !isHijri ? styles.activeText : styles.inactiveText,
            { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
          ]}>
            {t('gregorian')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: colors.gray[600],
    marginRight: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  inactiveButton: {
    backgroundColor: colors.gray[200],
  },
  toggleText: {
    fontSize: 14,
  },
  activeText: {
    color: colors.white,
  },
  inactiveText: {
    color: colors.gray[600],
  },
});

export default CalendarToggle;