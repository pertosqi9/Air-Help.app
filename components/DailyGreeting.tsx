import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

const DAILY_MESSAGES = {
  0: {
    // Sunday
    greeting: '¡Buenos días!',
    message: 'Hoy es un nuevo comienzo, llénalo de momentos que te hagan sonreír.',
  },
  1: {
    // Monday
    greeting: '¡Buenos días!',
    message: 'Tu actitud positiva es la llave maestra que abre todas las puertas.',
  },
  2: {
    // Tuesday
    greeting: '¡Buenos días!',
    message: 'Cada paso que das te acerca más a tus sueños, sigue adelante.',
  },
  3: {
    // Wednesday
    greeting: '¡Buenos días!',
    message: 'La perseverancia de hoy será el éxito que celebrarás mañana.',
  },
  4: {
    // Thursday
    greeting: '¡Buenos días!',
    message: 'Tu potencial es infinito, confía en ti y alcanza las estrellas.',
  },
  5: {
    // Friday
    greeting: '¡Buenos días!',
    message: 'Hoy es el día perfecto para hacer realidad lo que tanto deseas.',
  },
  6: {
    // Saturday
    greeting: '¡Buenos días!',
    message: 'Agradece el presente y construye con ilusión tu mejor futuro.',
  },
};

export function DailyGreeting() {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  const message = DAILY_MESSAGES[currentDay as keyof typeof DAILY_MESSAGES];

  return (
    <View style={[styles.container, { opacity }]}>
      <Text style={styles.greeting}>{message.greeting}</Text>
      <Text style={styles.message}>{message.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    transform: [{ scale: 1 }],
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#64748B',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
});