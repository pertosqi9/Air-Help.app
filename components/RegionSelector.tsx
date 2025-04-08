import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useI18n } from '@/lib/i18n';
import { MapPin, Search } from 'lucide-react-native';
import { useState } from 'react';

const REGIONS = [
  { code: 'US', name: 'United States', currency: 'USD', timezone: 'America/New_York' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', timezone: 'Europe/London' },
  { code: 'FR', name: 'France', currency: 'EUR', timezone: 'Europe/Paris' },
  { code: 'DE', name: 'Germany', currency: 'EUR', timezone: 'Europe/Berlin' },
  { code: 'JP', name: 'Japan', currency: 'JPY', timezone: 'Asia/Tokyo' },
  { code: 'AU', name: 'Australia', currency: 'AUD', timezone: 'Australia/Sydney' },
];

export function RegionSelector() {
  const { format } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegionChange = (regionCode: string) => {
    // Here you would implement the region change logic
    console.log('Changing region to:', regionCode);
  };

  const filteredRegions = REGIONS.filter(region =>
    region.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MapPin size={24} color="#1E293B" />
        <Text style={styles.title}>Select Region</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search regions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
        </View>
      </View>

      <ScrollView style={styles.regionList}>
        {filteredRegions.map((region) => (
          <TouchableOpacity
            key={region.code}
            style={styles.regionItem}
            onPress={() => handleRegionChange(region.code)}>
            <View>
              <Text style={styles.regionName}>{region.name}</Text>
              <View style={styles.regionDetails}>
                <Text style={styles.detailText}>
                  {format.currency(100, region.currency)}
                </Text>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.detailText}>{region.timezone}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 12,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1E293B',
  },
  regionList: {
    flex: 1,
  },
  regionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  regionName: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
    marginBottom: 4,
  },
  regionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#64748B',
  },
  separator: {
    marginHorizontal: 8,
    color: '#64748B',
  },
});