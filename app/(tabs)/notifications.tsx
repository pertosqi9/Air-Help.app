import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, MessageSquare, Star, Calendar } from 'lucide-react-native';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'request',
    title: 'New Service Request',
    message: 'John Doe requested house cleaning service',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    message: 'Sarah responded to your inquiry',
    time: '4 hours ago',
    unread: true,
  },
  {
    id: 3,
    type: 'review',
    title: 'New Review',
    message: 'You received a 5-star review',
    time: '1 day ago',
    unread: false,
  },
];

export default function NotificationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {NOTIFICATIONS.map((notification) => (
        <TouchableOpacity
          key={notification.id}
          style={[
            styles.notificationItem,
            notification.unread && styles.unreadNotification,
          ]}>
          <View style={styles.iconContainer}>
            {notification.type === 'request' && (
              <Calendar size={24} color="#0066ff" />
            )}
            {notification.type === 'message' && (
              <MessageSquare size={24} color="#00cc66" />
            )}
            {notification.type === 'review' && (
              <Star size={24} color="#ffcc00" />
            )}
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationMessage}>{notification.message}</Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  unreadNotification: {
    backgroundColor: '#f0f7ff',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999999',
  },
});