import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useI18n } from '@/lib/i18n';
import { Globe } from 'lucide-react-native';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

export function LanguageSelector() {
  const { locale } = useI18n();

  const handleLanguageChange = (languageCode: string) => {
    // Here you would implement the language change logic
    console.log('Changing language to:', languageCode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Globe size={24} color="#1E293B" />
        <Text style={styles.title}>Select Language</Text>
      </View>

      <ScrollView style={styles.languageList}>
        {LANGUAGES.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageItem,
              locale === language.code && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageChange(language.code)}>
            <View>
              <Text style={styles.languageName}>{language.name}</Text>
              <Text style={styles.nativeName}>{language.nativeName}</Text>
            </View>
            {locale === language.code && (
              <View style={styles.selectedIndicator} />
            )}
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
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  selectedLanguage: {
    backgroundColor: '#F8FAFC',
  },
  languageName: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  nativeName: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C3AED',
  },
});