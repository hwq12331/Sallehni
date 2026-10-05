import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { X as Close, Phone, Mail, MessageCircle, FileText } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';

export default function SupportScreen() {
  const router = useRouter();
  const { t, isRTL } = useTranslation();

  const supportOptions = [
    {
      icon: <Phone size={24} color={colors.primary} />,
      title: t('callSupport'),
      description: t('callSupportDesc'),
      action: () => console.log('Call support')
    },
    {
      icon: <Mail size={24} color={colors.primary} />,
      title: t('emailSupport'),
      description: t('emailSupportDesc'),
      action: () => console.log('Email support')
    },
    {
      icon: <MessageCircle size={24} color={colors.primary} />,
      title: t('liveChat'),
      description: t('liveChatDesc'),
      action: () => console.log('Open live chat')
    },
    {
      icon: <FileText size={24} color={colors.primary} />,
      title: t('helpCenter'),
      description: t('helpCenterDesc'),
      action: () => console.log('Open help center')
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
        ]}>
          {t('support')}
        </Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Close size={24} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[
          styles.subtitle,
          { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
        ]}>
          {t('supportDesc')}
        </Text>

        {supportOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={option.action}
          >
            <View style={styles.optionIcon}>
              {option.icon}
            </View>
            <View style={styles.optionContent}>
              <Text style={[
                styles.optionTitle,
                { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
              ]}>
                {option.title}
              </Text>
              <Text style={[
                styles.optionDescription,
                { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
              ]}>
                {option.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  title: {
    fontSize: 24,
    color: colors.text,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 24,
    lineHeight: 24,
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.gray[600],
    lineHeight: 20,
  },
});