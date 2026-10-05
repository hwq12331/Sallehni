import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Header from '@/components/Header';
import IssueCard from '@/components/IssueCard';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';
import { useRouter } from 'expo-router';

// Mock issues data
const mockIssues = [
  {
    id: 1,
    title: 'انخفاض ضغط زيت المحرك',
    description: 'انخفاض مستوى الزيت قد يؤدي إلى تلف المحرك وتقليل عمره الافتراضي. ينصح بفحص مستوى الزيت وإضافة زيت جديد إذا لزم الأمر.',
    costRange: { min: 150, max: 300 },
    urgency: 'urgent' as const,
  },
  {
    id: 2,
    title: 'تآكل في وسادات الفرامل الأمامية',
    description: 'وسادات الفرامل الأمامية متآكلة بنسبة 75٪ وتحتاج إلى استبدال قريبًا للحفاظ على قدرة الفرامل وسلامة السيارة.',
    costRange: { min: 200, max: 400 },
    urgency: 'minor' as const,
  },
  {
    id: 3,
    title: 'نظام تكييف الهواء بحاجة إلى إعادة شحن',
    description: 'انخفاض مستوى سائل التبريد في نظام التكييف. يوصى بإعادة شحن النظام للحفاظ على أداء وفعالية التكييف.',
    costRange: { min: 120, max: 250 },
    urgency: 'routine' as const,
  }
];

enum DiagnosticState {
  Initial,
  Connecting,
  Diagnosing,
  Complete
}

export default function DiagnosticsScreen() {
  const { t, isRTL } = useTranslation();
  const router = useRouter();
  const [state, setState] = useState<DiagnosticState>(DiagnosticState.Connecting);
  const [issues, setIssues] = useState<typeof mockIssues>([]);
  
  // Start diagnostic process immediately
  useEffect(() => {
    const connectingTimer = setTimeout(() => {
      setState(DiagnosticState.Diagnosing);
      
      const diagnosticTimer = setTimeout(() => {
        setState(DiagnosticState.Complete);
        setIssues(mockIssues);
      }, 3000);
      
      return () => clearTimeout(diagnosticTimer);
    }, 2000);
    
    return () => clearTimeout(connectingTimer);
  }, []);
  
  const handleViewDetails = (issueId: number) => {
    console.log(`View details for issue ${issueId}`);
    // In a real app, we would navigate to a details page
  };
  
  const handleBookRepair = (issueId: number) => {
    router.push('/booking');
  };
  
  const renderContent = () => {
    switch (state) {
      case DiagnosticState.Connecting:
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[
              styles.loadingText,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}>
              {t('connectingToVehicle')}
            </Text>
          </View>
        );
        
      case DiagnosticState.Diagnosing:
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[
              styles.loadingText,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}>
              {t('runningDiagnostics')}
            </Text>
          </View>
        );
        
      case DiagnosticState.Complete:
        return (
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.resultsContainer}>
              <Text style={[
                styles.resultsTitle,
                { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
              ]}>
                {t('diagnosticsComplete')}
              </Text>
              
              <Text style={[
                styles.issuesFound,
                { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
              ]}>
                {issues.length > 0 ? `${t('issuesFound')}: ${issues.length}` : t('noIssuesFound')}
              </Text>
              
              {issues.map(issue => (
                <IssueCard
                  key={issue.id}
                  title={issue.title}
                  description={issue.description}
                  costRange={issue.costRange}
                  urgency={issue.urgency}
                  onViewDetails={() => handleViewDetails(issue.id)}
                  onBookRepair={() => handleBookRepair(issue.id)}
                />
              ))}
            </View>
          </ScrollView>
        );
        
      default:
        return (
          <View style={styles.initialContainer}>
            <Text style={[
              styles.initialText,
              { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
            ]}>
              Press the button to start vehicle diagnostics
            </Text>
          </View>
        );
    }
  };
  
  return (
    <View style={styles.container}>
      <Header title={t('vehicleDiagnostics')} />
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  initialText: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: colors.primary,
    marginTop: 20,
  },
  resultsContainer: {
    paddingBottom: 30,
  },
  resultsTitle: {
    fontSize: 22,
    color: colors.text,
    marginBottom: 8,
  },
  issuesFound: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 20,
  },
});