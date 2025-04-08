import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, CreditCard, MapPin, Star, Shield, Settings, ChevronRight, Camera, Video } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Maria Rodriguez</Text>
            <Shield size={20} color="#7C3AED" style={styles.verifiedBadge} />
          </View>
          <Text style={styles.profession}>Personal Trainer</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Star size={16} color="#EAB308" />
              <Text style={styles.rating}>4.9</Text>
              <Text style={styles.reviews}>(128 reviews)</Text>
            </View>
            <View style={styles.stat}>
              <MapPin size={16} color="#64748B" />
              <Text style={styles.location}>Downtown</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/profile/stories')}>
            <Camera size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Stories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/profile/videos')}>
            <Video size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/profile/calendar')}>
            <Calendar size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Calendar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Personal Information</Text>
              <ChevronRight size={20} color="#64748B" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Notifications</Text>
              <ChevronRight size={20} color="#64748B" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Privacy & Security</Text>
              <ChevronRight size={20} color="#64748B" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => router.push('/auth/register')}>
        <LinearGradient
          colors={['#FF0000', '#0000FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}>
          <Text style={styles.signUpText}>Easy Sign-Up</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileInfo: {
    marginTop: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: '#F3E8FF',
    padding: 8,
    borderRadius: 8,
  },
  profession: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 2,
  },
  location: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  section: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  menuList: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  menuContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#1E293B',
  },
  signUpButton: {
    margin: 24,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});