import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { colors } from '@/constants/colors';
import Svg, { Circle, CircleProps } from 'react-native-svg';

type HealthGaugeProps = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
};

const HealthGauge: React.FC<HealthGaugeProps> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
}) => {
  const { isRTL } = useTranslation();
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const alpha = Math.PI * 2 * (percentage / 100);
  const strokeDashoffset = circumference * (1 - percentage / 100);
  
  // Determine color based on percentage
  const getColor = (percent: number) => {
    if (percent >= 80) return colors.success;
    if (percent >= 50) return colors.warning;
    return colors.error;
  };
  
  const healthColor = getColor(percentage);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.gray[200]}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Foreground Circle (Health Indicator) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={healthColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      
      <View style={styles.textContainer}>
        <Text style={[
          styles.percentageText,
          { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
        ]}>
          {percentage}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    transform: [{ rotate: '0deg' }],
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 24,
    color: colors.text,
  },
});

export default HealthGauge;