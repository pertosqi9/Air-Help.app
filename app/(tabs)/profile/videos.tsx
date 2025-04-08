import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Upload, Play, Pause } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const DEMO_VIDEOS = [
  {
    id: '1',
    title: 'Morning Workout Routine',
    thumbnail: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&q=80&w=500',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-person-doing-push-ups-during-workout-40007-large.mp4',
    duration: '2:30',
    views: 1234,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '2',
    title: 'Healthy Meal Prep Tips',
    thumbnail: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?auto=format&fit=crop&q=80&w=500',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-preparing-a-delicious-meal-in-a-kitchen-4685-large.mp4',
    duration: '3:45',
    views: 2345,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
];

export default function VideosScreen() {
  const router = useRouter();
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const formatTimestamp = (date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (24 * 60 * 60 * 1000));
    return `${days}d ago`;
  };

  const formatViews = (views) => {
    return views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views;
  };

  const handleUploadVideo = () => {
    router.push('/profile/upload-video');
  };

  const togglePlayPause = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.videosContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadVideo}>
          <View style={styles.uploadIconContainer}>
            <Upload size={24} color="#7C3AED" />
          </View>
          <Text style={styles.uploadText}>Upload New Video</Text>
        </TouchableOpacity>

        {DEMO_VIDEOS.map((video) => (
          <TouchableOpacity
            key={video.id}
            style={styles.videoContainer}
            onPress={() => setActiveVideo(video)}>
            <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{video.duration}</Text>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <View style={styles.videoStats}>
                <Text style={styles.viewCount}>{formatViews(video.views)} views</Text>
                <Text style={styles.timestamp}>{formatTimestamp(video.timestamp)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {activeVideo && (
        <View style={styles.videoPlayer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setActiveVideo(null);
              setIsPlaying(false);
            }}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <Video
            ref={videoRef}
            style={styles.activeVideo}
            source={{ uri: activeVideo.url }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping={true}
            onPlaybackStatusUpdate={status => setIsPlaying(status.isPlaying)}
          />

          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={togglePlayPause}>
            {isPlaying ? (
              <Pause size={24} color="#FFFFFF" />
            ) : (
              <Play size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
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
  videosContainer: {
    padding: 16,
  },
  uploadButton: {
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
  uploadIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  videoContainer: {
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
  videoThumbnail: {
    width: '100%',
    height: 200,
  },
  durationBadge: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCount: {
    fontSize: 14,
    color: '#64748B',
    marginRight: 12,
  },
  timestamp: {
    fontSize: 14,
    color: '#64748B',
  },
  videoPlayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  activeVideo: {
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
  playPauseButton: {
    position: 'absolute',
    bottom: 40,
    zIndex: 1001,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});