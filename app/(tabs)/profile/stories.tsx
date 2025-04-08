import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const DEMO_STORIES = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=500',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-person-doing-push-ups-during-workout-40007-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&q=80&w=500',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
];

export default function StoriesScreen() {
  const router = useRouter();
  const [activeStory, setActiveStory] = useState(null);
  const videoRef = useRef(null);

  const formatTimestamp = (date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (60 * 60 * 1000));
    return `${hours}h ago`;
  };

  const handleAddStory = () => {
    router.push('/profile/create-story');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.storiesContainer}>
        <TouchableOpacity style={styles.addStoryButton} onPress={handleAddStory}>
          <View style={styles.addIconContainer}>
            <Camera size={24} color="#7C3AED" />
          </View>
          <Text style={styles.addStoryText}>Add Story</Text>
        </TouchableOpacity>

        {DEMO_STORIES.map((story) => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyContainer}
            onPress={() => setActiveStory(story)}>
            {story.type === 'image' ? (
              <Image source={{ uri: story.url }} style={styles.storyThumbnail} />
            ) : (
              <Image source={{ uri: story.thumbnail }} style={styles.storyThumbnail} />
            )}
            <View style={styles.storyInfo}>
              <Text style={styles.storyType}>
                {story.type === 'image' ? '📷 Photo' : '🎥 Video'}
              </Text>
              <Text style={styles.storyTimestamp}>
                {formatTimestamp(story.timestamp)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {activeStory && (
        <View style={styles.storyViewer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setActiveStory(null)}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          {activeStory.type === 'image' ? (
            <Image
              source={{ uri: activeStory.url }}
              style={styles.activeStoryContent}
              resizeMode="contain"
            />
          ) : (
            <Video
              ref={videoRef}
              style={styles.activeStoryContent}
              source={{ uri: activeStory.url }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping={false}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  storiesContainer: {
    padding: 16,
  },
  addStoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addStoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  storyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  storyThumbnail: {
    width: '100%',
    height: 200,
  },
  storyInfo: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyType: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  storyTimestamp: {
    fontSize: 12,
    color: '#64748B',
  },
  storyViewer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  activeStoryContent: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1001,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});