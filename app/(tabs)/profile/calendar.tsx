import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Calendar as RNCalendar, DateData } from 'react-native-calendars';
import { format } from 'date-fns';
import { Clock, Check } from 'lucide-react-native';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const toggleTimeSlot = (slot: string) => {
    setSelectedSlots(current =>
      current.includes(slot)
        ? current.filter(s => s !== slot)
        : [...current, slot]
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };

  return (
    <View style={styles.container}>
      <RNCalendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#7C3AED',
          },
        }}
        theme={{
          todayTextColor: '#7C3AED',
          selectedDayBackgroundColor: '#7C3AED',
          arrowColor: '#7C3AED',
        }}
      />

      {selectedDate && (
        <View style={styles.timeSlotsContainer}>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          <Text style={styles.subtitle}>Available Time Slots</Text>
          
          <View style={styles.timeSlotGrid}>
            {TIME_SLOTS.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.timeSlot,
                  selectedSlots.includes(slot) && styles.selectedTimeSlot,
                ]}
                onPress={() => toggleTimeSlot(slot)}>
                <Clock
                  size={16}
                  color={selectedSlots.includes(slot) ? '#FFFFFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedSlots.includes(slot) && styles.selectedTimeSlotText,
                  ]}>
                  {slot}
                </Text>
                {selectedSlots.includes(slot) && (
                  <Check size={16} color="#FFFFFF" style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Availability</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  timeSlotsContainer: {
    padding: 24,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 16,
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    margin: 6,
    width: '45%',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  selectedTimeSlot: {
    backgroundColor: '#7C3AED',
  },
  timeSlotText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
  },
  checkIcon: {
    marginLeft: 4,
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
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