import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, MapPin, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';

interface GarageCardProps {
  name: string;
  rating: number;
  distance: number;
  address: string;
  availability: string;
  imageUrl: string;
  price: number;
  onPress: () => void;
}

const GarageCard: React.FC<GarageCardProps> = ({
  name,
  rating,
  distance,
  address,
  availability,
  imageUrl,
  price,
  onPress,
}) => {
  const { t, isRTL } = useTranslation();
  
  // Render stars for rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} fill={colors.accent} color={colors.accent} size={16} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} fill={colors.accent} color={colors.accent} size={16} strokeWidth={1} />);
      } else {
        stars.push(<Star key={i} color={colors.gray[300]} size={16} />);
      }
    }
    
    return (
      <View style={styles.starsContainer}>
        {stars}
        <Text style={[
          styles.ratingText,
          { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
        ]}>
          ({rating})
        </Text>
      </View>
    );
  };
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={[
          styles.name,
          { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
        ]}>
          {name}
        </Text>
        
        {renderStars()}
        
        <View style={styles.infoRow}>
          <MapPin size={14} color={colors.gray[500]} />
          <Text style={[
            styles.infoText,
            { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
          ]}>
            {address} ({distance} {t('km')})
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Clock size={14} color={colors.gray[500]} />
          <Text style={[
            styles.infoText,
            { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
          ]}>
            {availability}
          </Text>
        </View>
        
        <View style={styles.priceRow}>
          <Text style={[
            styles.price,
            { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
          ]}>
            {price} {t('sar')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.gray[600],
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  infoText: {
    fontSize: 13,
    color: colors.gray[600],
    marginLeft: 6,
  },
  priceRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  price: {
    fontSize: 16,
    color: colors.primary,
  },
});

export default GarageCard;