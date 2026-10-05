import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';
import HistoryItem from '@/components/HistoryItem';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';

// Service type filter options
type FilterOption = 'all' | 'oil' | 'repair' | 'inspection';

// Mock history data
const mockHistory = [
  {
    id: 1,
    date: '15 رمضان 1446',
    serviceName: 'صيانة دورية',
    garage: 'ورشة التوفيق - الرياض',
    cost: 450,
    serviceType: 'inspection' as const,
    warrantyValid: true,
  },
  {
    id: 2,
    date: '1 رجب 1446',
    serviceName: 'تغيير زيت المحرك',
    garage: 'مركز الإمتياز للسيارات - الرياض',
    cost: 180,
    serviceType: 'oil' as const,
    warrantyValid: false,
  },
  {
    id: 3,
    date: '10 جمادى الآخرة 1446',
    serviceName: 'إصلاح نظام التكييف',
    garage: 'الورشة السعودية - الرياض',
    cost: 350,
    serviceType: 'repair' as const,
    warrantyValid: true,
  },
  {
    id: 4,
    date: '25 ربيع الثاني 1446',
    serviceName: 'استبدال البطارية',
    garage: 'ورشة التوفيق - الرياض',
    cost: 280,
    serviceType: 'repair' as const,
    warrantyValid: true,
  },
  {
    id: 5,
    date: '12 ربيع الأول 1446',
    serviceName: 'تغيير زيت المحرك والفلتر',
    garage: 'مركز الإمتياز للسيارات - الرياض',
    cost: 220,
    serviceType: 'oil' as const,
    warrantyValid: false,
  },
];

export default function HistoryScreen() {
  const { t, isRTL } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  
  const filteredHistory = activeFilter === 'all'
    ? mockHistory
    : mockHistory.filter(item => item.serviceType === activeFilter);
  
  const handleHistoryItemPress = (id: number) => {
    console.log(`Selected history item: ${id}`);
    // In a real app, navigate to detailed view
  };
  
  return (
    <View style={styles.container}>
      <Header title={t('maintenanceHistory')} />
      
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'all' && styles.activeFilterButton
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[
              styles.filterText,
              activeFilter === 'all' && styles.activeFilterText,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}>
              {t('allServices')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'oil' && styles.activeFilterButton
            ]}
            onPress={() => setActiveFilter('oil')}
          >
            <Text style={[
              styles.filterText,
              activeFilter === 'oil' && styles.activeFilterText,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}>
              {t('oilChanges')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'repair' && styles.activeFilterButton
            ]}
            onPress={() => setActiveFilter('repair')}
          >
            <Text style={[
              styles.filterText,
              activeFilter === 'repair' && styles.activeFilterText,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}>
              {t('repairs')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'inspection' && styles.activeFilterButton
            ]}
            onPress={() => setActiveFilter('inspection')}
          >
            <Text style={[
              styles.filterText,
              activeFilter === 'inspection' && styles.activeFilterText,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}>
              {t('inspections')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredHistory.map(item => (
          <HistoryItem
            key={item.id}
            date={item.date}
            serviceName={item.serviceName}
            garage={item.garage}
            cost={item.cost}
            serviceType={item.serviceType}
            warrantyValid={item.warrantyValid}
            onPress={() => handleHistoryItemPress(item.id)}
          />
        ))}
        
        {filteredHistory.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={[
              styles.emptyText,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}>
              No history records found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  filtersContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filtersScrollContent: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray[200],
    marginRight: 12,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.gray[700],
  },
  activeFilterText: {
    color: colors.white,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[500],
  },
});