import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { colors } from '@/constants/colors';
import { Globe } from 'lucide-react-native';

type HeaderProps = {
  title: string;
  showLanguageToggle?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, showLanguageToggle = true }) => {
  const { t, toggleLocale, isRTL } = useTranslation();
  
  return (
    <View style={styles.container}>
      <View style={styles.skylineContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg' }} 
          style={styles.skylineImage} 
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.headerContent}>
        <Text style={[
          styles.title,
          { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
        ]}>
          {title}
        </Text>
        
        {showLanguageToggle && (
          <TouchableOpacity 
            style={styles.languageButton} 
            onPress={toggleLocale}
          >
            <Globe size={16} color={colors.white} />
            <Text style={[
              styles.languageText,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}>
              {t('switchLanguage')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: '100%',
    overflow: 'hidden',
  },
  skylineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  skylineImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 58, 138, 0.85)',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    color: colors.white,
    fontSize: 26,
    marginTop: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 20,
  },
  languageText: {
    color: colors.white,
    marginLeft: 4,
    fontSize: 14,
  },
});

export default Header;