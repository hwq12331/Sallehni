import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';

type QuickActionButtonProps = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  primary?: boolean;
};

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  title,
  icon,
  onPress,
  style,
  textStyle,
  primary = false,
}) => {
  const { isRTL } = useTranslation();
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        primary ? styles.primaryButton : styles.secondaryButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <Text
        style={[
          styles.buttonText,
          primary ? styles.primaryText : styles.secondaryText,
          { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 6,
    elevation: 2,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 12,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.text,
  },
});

export default QuickActionButton;