import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Header from '@/components/Header';
import GarageCard from '@/components/GarageCard';
import CalendarToggle from '@/components/CalendarToggle';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';
import { Calendar, Clock, Filter } from 'lucide-react-native';

// Mock garages data
const mockGarages = [
  {
    id: 1,
    name: 'ورشة التوفيق',
    rating: 4.8,
    distance: 2.3,
    address: 'شارع الملك فهد، الرياض',
    availability: 'اليوم، 9 صباحًا - 9 مساءً',
    imageUrl: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg',
    price: 350,
  },
  {
    id: 2,
    name: 'مركز الإمتياز للسيارات',
    rating: 4.2,
    distance: 3.8,
    address: 'شارع العليا، الرياض',
    availability: 'اليوم، 10 صباحًا - 8 مساءً',
    imageUrl: 'https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg',
    price: 280,
  },
  {
    id: 3,
    name: 'الورشة السعودية',
    rating: 4.5,
    distance: 5.1,
    address: 'طريق الدمام، الرياض',
    availability: 'غدًا، 8 صباحًا - 10 مساءً',
    imageUrl: 'https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg',
    price: 320,
  },
];

// Mock dates for calendar
const mockDates = [
  { id: 1, date: '22 شوال', day: 'الأحد' },
  { id: 2, date: '23 شوال', day: 'الإثنين' },
  { id: 3, date: '24 شوال', day: 'الثلاثاء' },
  { id: 4, date: '25 شوال', day: 'الأربعاء' },
  { id: 5, date: '26 شوال', day: 'الخميس' },
  { id: 6, date: '27 شوال', day: 'الجمعة' },
  { id: 7, date: '28 شوال', day: 'السبت' },
];

// Mock time slots
const mockTimes = [
  { id: 1, time: '9:00 AM' },
  { id: 2, time: '10:00 AM' },
  { id: 3, time: '11:00 AM' },
  { id: 4, time: '12:00 PM' },
  { id: 5, time: '1:00 PM' },
  { id: 6, time: '2:00 PM' },
  { id: 7, time: '3:00 PM' },
  { id: 8, time: '4:00 PM' },
];

// Sort options
enum SortOption {
  Distance = 'distance',
  Rating = 'rating',
  Price = 'price',
  Availability = 'availability',
}

export default function BookingScreen() {
  const { t, isRTL, toggleCalendarType } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.Distance);
  
  const handleGaragePress = (garageId: number) => {
    console.log(`Selected garage: ${garageId}`);
    // In a real app, this would navigate to a detail screen or booking confirmation
  };
  
  const handleSortOption = (option: SortOption) => {
    setSortOption(option);
    // In a real app, this would sort the garages list
  };
  
  return (
    <View style={styles.container}>
      <Header title={t('serviceBooking')} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.calendarContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleContainer}>
              <Calendar size={20} color={colors.primary} />
              <Text style={[
                styles.sectionTitle,
                { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
              ]}>
                {t('selectDate')}
              </Text>
            </View>
            
            <CalendarToggle onToggle={toggleCalendarType} />
          </View>
          
          <FlatList
            horizontal
            data={mockDates}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dateItem,
                  selectedDate === item.id && styles.selectedDateItem
                ]}
                onPress={() => setSelectedDate(item.id)}
              >
                <Text style={[
                  styles.dayText,
                  selectedDate === item.id && styles.selectedDayText,
                  { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
                ]}>
                  {item.day}
                </Text>
                <Text style={[
                  styles.dateText,
                  selectedDate === item.id && styles.selectedDateText,
                  { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
                ]}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        
        <View style={styles.timeContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleContainer}>
              <Clock size={20} color={colors.primary} />
              <Text style={[
                styles.sectionTitle,
                { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
              ]}>
                {t('selectTime')}
              </Text>
            </View>
          </View>
          
          <View style={styles.timeGrid}>
            {mockTimes.map((timeSlot) => (
              <TouchableOpacity
                key={timeSlot.id}
                style={[
                  styles.timeItem,
                  selectedTime === timeSlot.id && styles.selectedTimeItem
                ]}
                onPress={() => setSelectedTime(timeSlot.id)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === timeSlot.id && styles.selectedTimeText,
                  { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
                ]}>
                  {timeSlot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.garagesContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleContainer}>
              <Text style={[
                styles.sectionTitle,
                { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
              ]}>
                {t('nearbyGarages')}
              </Text>
            </View>
            
            <View style={styles.sortContainer}>
              <Text style={[
                styles.sortLabel,
                { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
              ]}>
                {t('sortBy')}:
              </Text>
              
              <TouchableOpacity 
                style={styles.sortButton}
                onPress={() => {}}
              >
                <Filter size={16} color={colors.gray[600]} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.sortOptions}>
            {Object.values(SortOption).map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.sortOptionButton,
                  sortOption === option && styles.selectedSortOption
                ]}
                onPress={() => handleSortOption(option)}
              >
                <Text style={[
                  styles.sortOptionText,
                  sortOption === option && styles.selectedSortOptionText,
                  { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
                ]}>
                  {t(option)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {mockGarages.map((garage) => (
            <GarageCard
              key={garage.id}
              name={garage.name}
              rating={garage.rating}
              distance={garage.distance}
              address={garage.address}
              availability={garage.availability}
              imageUrl={garage.imageUrl}
              price={garage.price}
              onPress={() => handleGaragePress(garage.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.text,
    marginLeft: 8,
  },
  calendarContainer: {
    marginBottom: 24,
  },
  datesList: {
    paddingVertical: 8,
  },
  dateItem: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.white,
    marginRight: 12,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedDateItem: {
    backgroundColor: colors.primary,
  },
  dayText: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: colors.text,
  },
  selectedDayText: {
    color: colors.white,
  },
  selectedDateText: {
    color: colors.white,
  },
  timeContainer: {
    marginBottom: 24,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeItem: {
    width: '23%',
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedTimeItem: {
    backgroundColor: colors.primary,
  },
  timeText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedTimeText: {
    color: colors.white,
  },
  garagesContainer: {
    marginBottom: 24,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginRight: 8,
  },
  sortButton: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: colors.gray[200],
  },
  sortOptions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sortOptionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.gray[200],
    marginRight: 8,
  },
  selectedSortOption: {
    backgroundColor: colors.primary,
  },
  sortOptionText: {
    fontSize: 12,
    color: colors.gray[700],
  },
  selectedSortOptionText: {
    color: colors.white,
  },
});