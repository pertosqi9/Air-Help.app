import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="calendar"
        options={{
          title: 'Availability',
          headerShown: true,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="payment-methods"
        options={{
          title: 'Payment Methods',
          headerShown: true,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="stories"
        options={{
          title: 'Stories',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="videos"
        options={{
          title: 'Videos',
          headerShown: true,
        }}
      />
    </Stack>
  );
}