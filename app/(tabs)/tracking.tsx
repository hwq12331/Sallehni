import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import Header from '@/components/Header';
import StatusBar from '@/components/StatusBar';
import { colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';
import { Send, Camera, FileText } from 'lucide-react-native';

// Mock chat data
const initialMessages = [
  {
    id: 1,
    sender: 'mechanic',
    message: 'السلام عليكم، قمنا باستلام سيارتكم وبدأنا بالفحص الأولي. سنقوم بإخباركم بالنتائج قريبًا.',
    time: '10:30 AM',
  },
  {
    id: 2,
    sender: 'user',
    message: 'شكرًا لكم. هل يمكنكم إخباري عن الوقت المتوقع للانتهاء؟',
    time: '10:35 AM',
  },
  {
    id: 3,
    sender: 'mechanic',
    message: 'نتوقع الانتهاء من الإصلاح بحلول الساعة 3:00 مساءً. سنرسل لكم صورًا للأجزاء التي تم استبدالها.',
    time: '10:40 AM',
  },
];

export default function TrackingScreen() {
  const { t, isRTL } = useTranslation();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'user',
        message: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate mechanic response
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: 'mechanic',
          message: 'شكرًا لرسالتك. سنقوم بتحديث حالة الإصلاح قريبًا.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        
        setMessages(prevMessages => [...prevMessages, response]);
      }, 1000);
    }
  };
  
  return (
    <View style={styles.container}>
      <Header title={t('repairStatus')} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusContainer}>
          <Text style={[
            styles.statusTitle,
            { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
          ]}>
            {t('repairStatus')}
          </Text>
          
          <StatusBar currentStatus="inService" />
          
          <View style={styles.estimatedTimeContainer}>
            <Text style={[
              styles.estimatedTimeLabel,
              { fontFamily: isRTL ? 'Tajawal-Medium' : 'Inter-Medium' }
            ]}>
              {t('estimatedCompletion')}:
            </Text>
            <Text style={[
              styles.estimatedTimeValue,
              { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
            ]}>
              3:00 PM
            </Text>
          </View>
        </View>
        
        <View style={styles.chatSection}>
          <Text style={[
            styles.chatTitle,
            { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
          ]}>
            {t('chatWithMechanic')}
          </Text>
          
          <View style={styles.chatContainer}>
            {messages.map((msg) => (
              <View 
                key={msg.id}
                style={[
                  styles.messageContainer,
                  msg.sender === 'user' ? styles.userMessage : styles.mechanicMessage,
                  { alignSelf: msg.sender === 'user' ? (isRTL ? 'flex-start' : 'flex-end') : (isRTL ? 'flex-end' : 'flex-start') }
                ]}
              >
                <Text style={[
                  styles.messageText,
                  { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
                ]}>
                  {msg.message}
                </Text>
                <Text style={[
                  styles.messageTime,
                  { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
                ]}>
                  {msg.time}
                </Text>
              </View>
            ))}
          </View>
          
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Camera size={20} color={colors.gray[600]} />
            </TouchableOpacity>
            
            <TextInput
              style={[
                styles.input,
                { fontFamily: isRTL ? 'Tajawal-Regular' : 'Inter-Regular' }
              ]}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder={isRTL ? 'اكتب رسالة...' : 'Type a message...'}
              placeholderTextColor={colors.gray[400]}
              multiline
            />
            
            <TouchableOpacity 
              style={[
                styles.sendButton,
                !newMessage.trim() && styles.disabledSendButton
              ]}
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send size={20} color={newMessage.trim() ? colors.white : colors.gray[400]} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.photosSection}>
          <Text style={[
            styles.photosTitle,
            { fontFamily: isRTL ? 'Tajawal-Bold' : 'Inter-Bold' }
          ]}>
            {t('viewPhotos')}
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photosContainer}
          >
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg' }}
              style={styles.photo}
            />
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg' }}
              style={styles.photo}
            />
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/4489767/pexels-photo-4489767.jpeg' }}
              style={styles.photo}
            />
          </ScrollView>
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
  statusContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusTitle: {
    fontSize: 20,
    color: colors.text,
    marginBottom: 16,
  },
  estimatedTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  estimatedTimeLabel: {
    fontSize: 16,
    color: colors.gray[600],
    marginRight: 8,
  },
  estimatedTimeValue: {
    fontSize: 18,
    color: colors.primary,
  },
  chatSection: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chatTitle: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
  },
  chatContainer: {
    marginBottom: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: colors.primary,
  },
  mechanicMessage: {
    backgroundColor: colors.gray[200],
  },
  messageText: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray[100],
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: colors.gray[300],
  },
  photosSection: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  photosTitle: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
  },
  photosContainer: {
    paddingBottom: 8,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
});