import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Search, MapPin, Star, Clock, Shield, Award } from 'lucide-react-native';
import { DailyGreeting } from '@/components/DailyGreeting';

const FEATURED_PROFESSIONALS = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    profession: 'Personal Trainer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 128,
    hourlyRate: 45,
    location: 'Downtown',
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: 'David Chen',
    profession: 'Massage Therapist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 93,
    hourlyRate: 60,
    location: 'West Side',
    verified: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    profession: 'Life Coach',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 75,
    hourlyRate: 85,
    location: 'North End',
    verified: true,
    featured: false,
  },
];

const CATEGORIES = [
  { id: 1, name: 'Fitness', icon: '💪' },
  { id: 2, name: 'Wellness', icon: '🧘‍♀️' },
  { id: 3, name: 'Beauty', icon: '💅' },
  { id: 4, name: 'Education', icon: '📚' },
  { id: 5, name: 'Business', icon: '💼' },
  { id: 6, name: 'Tech', icon: '💻' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <DailyGreeting />
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by service or professional..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryButton}
              onPress={() => router.push(`/search?category=${category.name}`)}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.featuredSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Professionals</Text>
          <TouchableOpacity onPress={() => router.push('/search')}>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>

        {FEATURED_PROFESSIONALS.map((professional) => (
          <TouchableOpacity
            key={professional.id}
            style={styles.professionalCard}
            onPress={() => router.push(`/professional/${professional.id}`)}>
            <Image source={{ uri: professional.image }} style={styles.professionalImage} />
            
            <View style={styles.professionalInfo}>
              <View style={styles.professionalHeader}>
                <View>
                  <Text style={styles.professionalName}>{professional.name}</Text>
                  <Text style={styles.profession}>{professional.profession}</Text>
                </View>
                {professional.verified && (
                  <Shield size={20} color="#7C3AED" style={styles.verifiedBadge} />
                )}
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Star size={16} color="#EAB308" />
                  <Text style={styles.rating}>{professional.rating}</Text>
                  <Text style={styles.reviews}>({professional.reviews})</Text>
                </View>

                <View style={styles.stat}>
                  <MapPin size={16} color="#64748B" />
                  <Text style={styles.location}>{professional.location}</Text>
                </View>
              </View>

              <View style={styles.footer}>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${professional.hourlyRate}</Text>
                  <Text style={styles.perHour}>/hour</Text>
                </View>

                {professional.featured && (
                  <View style={styles.featuredBadge}>
                    <Award size={14} color="#7C3AED" />
                    <Text style={styles.featuredText}>Featured</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
    paddingTop: Platform.OS === 'web' ? 24 : 60,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    marginTop: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1E293B',
  },
  categoriesSection: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingBottom: 8,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  featuredSection: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllButton: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '600',
  },
  professionalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  professionalImage: {
    width: '100%',
    height: 200,
  },
  professionalInfo: {
    padding: 16,
  },
  professionalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  profession: {
    fontSize: 14,
    color: '#64748B',
  },
  verifiedBadge: {
    backgroundColor: '#F3E8FF',
    padding: 8,
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  perHour: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 2,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7C3AED',
    marginLeft: 4,
  },
});