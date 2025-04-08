import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { CreditCard, SignalLow as PaypalLogo, Ban as Bank, Smartphone, Plus, Check } from 'lucide-react-native';

const PAYMENT_METHODS = [
  {
    id: 1,
    type: 'card',
    name: 'Credit Card',
    icon: CreditCard,
    last4: '4242',
    expiry: '12/24',
    isDefault: true,
  },
  {
    id: 2,
    type: 'paypal',
    name: 'PayPal',
    icon: PaypalLogo,
    email: 'maria@example.com',
  },
  {
    id: 3,
    type: 'bank',
    name: 'Bank Account',
    icon: Bank,
    last4: '9876',
  },
];

export default function PaymentMethodsScreen() {
  const [showAddCard, setShowAddCard] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Payment Methods</Text>
        {PAYMENT_METHODS.map((method) => (
          <View key={method.id} style={styles.paymentMethod}>
            <View style={styles.methodIcon}>
              <method.icon size={24} color="#1E293B" />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>{method.name}</Text>
              {method.last4 && (
                <Text style={styles.methodDetails}>
                  •••• {method.last4}
                  {method.expiry && ` • Expires ${method.expiry}`}
                </Text>
              )}
              {method.email && (
                <Text style={styles.methodDetails}>{method.email}</Text>
              )}
            </View>
            {method.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddCard(true)}>
        <Plus size={20} color="#7C3AED" />
        <Text style={styles.addButtonText}>Add Payment Method</Text>
      </TouchableOpacity>

      {showAddCard && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add New Card</Text>
          <View style={styles.cardForm}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="4242 4242 4242 4242"
                keyboardType="number-pad"
                maxLength={19}
              />
            </View>
            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Name on Card</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                autoCapitalize="words"
              />
            </View>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  methodIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  methodDetails: {
    fontSize: 14,
    color: '#64748B',
  },
  defaultBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  defaultText: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 24,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '500',
  },
  cardForm: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});