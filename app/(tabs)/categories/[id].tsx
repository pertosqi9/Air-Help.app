import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Clock, Star, ArrowLeft, Loader as Loader2 } from 'lucide-react-native';
import { supabase } from '../../../lib/supabase';

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  provider: {
    name: string;
    avatar_url: string;
  };
};

type Category = {
  id: string;
  name: string;
  description: string;
  services: Service[];
};

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategoryDetails();
  }, [id]);

  async function fetchCategoryDetails() {
    try {
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          description,
          services (
            id,
            title,
            description,
            price,
            user:users (
              name,
              avatar_url
            )
          )
        `)
        .eq('id', id)
        .single();

      if (categoryError) throw categoryError;
      setCategory(categoryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            fetchCategoryDetails();
          }}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loader2 size={32} color="#0066ff" />
        <Text style={styles.loadingText}>Loading category details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.categoryName}>{category?.name}</Text>
      </View>

      <Text style={styles.description}>{category?.description}</Text>

      <View style={styles.servicesContainer}>
        <Text style={styles.sectionTitle}>Available Services</Text>
        {category?.services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => router.push(`/services/${service.id}`)}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceDescription} numberOfLines={2}>
              {service.description}
            </Text>
            
            <View style={styles.serviceFooter}>
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{service.provider.name}</Text>
              </View>
              <Text style={styles.servicePrice}>${service.price}/hr</Text>
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
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    marginRight: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    padding: 16,
    lineHeight: 24,
  },
  servicesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerName: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066ff',
  },
  errorText: {
    textAlign: 'center',
    color: '#ff4444',
    fontSize: 16,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#0066ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});