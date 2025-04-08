import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { Upload, Hash, Type, Globe, Lock, Users } from 'lucide-react-native';

type PrivacyOption = 'public' | 'private' | 'followers';

export default function UploadVideoScreen() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [privacy, setPrivacy] = useState<PrivacyOption>('public');
  const videoRef = useRef(null);
  const router = useRouter();

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const publishVideo = () => {
    // Here you would implement the actual publishing logic
    router.back();
  };

  const PrivacyButton = ({ type, icon: Icon, label }: { type: PrivacyOption; icon: any; label: string }) => (
    <TouchableOpacity
      style={[styles.privacyButton, privacy === type && styles.privacyButtonActive]}
      onPress={() => setPrivacy(type)}>
      <Icon size={20} color={privacy === type ? '#7C3AED' : '#64748B'} />
      <Text style={[styles.privacyButtonText, privacy === type && styles.privacyButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Video</Text>
      </View>

      {!videoUri ? (
        <TouchableOpacity style={styles.uploadArea} onPress={pickVideo}>
          <Upload size={48} color="#7C3AED" />
          <Text style={styles.uploadText}>Tap to select a video</Text>
          <Text style={styles.uploadSubtext}>MP4, MOV up to 100MB</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.videoPreview}>
          <Video
            ref={videoRef}
            style={styles.video}
            source={{ uri: videoUri }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      )}

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Add a title to your video"
            placeholderTextColor="#64748B"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Tell viewers about your video"
            placeholderTextColor="#64748B"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Hashtags</Text>
          <View style={styles.hashtagInput}>
            <Hash size={20} color="#64748B" />
            <TextInput
              style={styles.hashtagTextInput}
              value={hashtags}
              onChangeText={setHashtags}
              placeholder="Add hashtags"
              placeholderTextColor="#64748B"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Privacy</Text>
          <View style={styles.privacyOptions}>
            <PrivacyButton type="public" icon={Globe} label="Public" />
            <PrivacyButton type="followers" icon={Users} label="Followers" />
            <PrivacyButton type="private" icon={Lock} label="Private" />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.publishButton, !videoUri && styles.publishButtonDisabled]}
          onPress={publishVideo}
          disabled={!videoUri}>
          <Text style={styles.publishButtonText}>Publish Video</Text>
        </TouchableOpacity>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  uploadArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 40,
    margin: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
  videoPreview: {
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  hashtagInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  hashtagTextInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1E293B',
  },
  privacyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  privacyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  privacyButtonActive: {
    backgroundColor: '#F3E8FF',
    borderColor: '#7C3AED',
  },
  privacyButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
  },
  privacyButtonTextActive: {
    color: '#7C3AED',
  },
  publishButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  publishButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});