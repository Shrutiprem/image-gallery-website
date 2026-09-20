import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Photo } from '../types';

import {
  getFavorites,
  saveFavorites,
} from '../services/storage';

interface ImageDetailsScreenProps {
  photo: Photo;
  onBack: () => void;
}

const ImageDetailsScreen = ({
  photo,
  onBack,
}: ImageDetailsScreenProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check whether image is already favorite
  useEffect(() => {
    const favorites = getFavorites();

    const exists = favorites.some(
      (item) => item.id === photo.id
    );

    setIsFavorite(exists);
  }, [photo.id]);

  // Add / remove favorite
  const toggleFavorite = () => {
    const favorites = getFavorites();

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (item) => item.id !== photo.id
      );

      saveFavorites(updatedFavorites);
      setIsFavorite(false);
    } else {
      const updatedFavorites = [
        ...favorites,
        photo,
      ];

      saveFavorites(updatedFavorites);
      setIsFavorite(true);
    }
  };

  // Download image
  const handleDownload = () => {
    const link = document.createElement('a');

    link.href = photo.download_url;

    link.download = `image-${photo.id}.jpg`;

    link.target = '_blank';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* Back button */}
      <Pressable
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backButtonText}>
          ← Back to Gallery
        </Text>
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>
        Image Details
      </Text>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: photo.download_url,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Details */}
      <View style={styles.detailsCard}>

        <Text style={styles.label}>
          Author
        </Text>

        <Text style={styles.value}>
          {photo.author}
        </Text>

        <Text style={styles.label}>
          Image ID
        </Text>

        <Text style={styles.value}>
          {photo.id}
        </Text>

        <Text style={styles.label}>
          Dimensions
        </Text>

        <Text style={styles.value}>
          {photo.width} × {photo.height}
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>

          <Pressable
            style={[
              styles.favoriteButton,
              isFavorite &&
                styles.favoriteButtonActive,
            ]}
            onPress={toggleFavorite}
          >
            <Text
              style={[
                styles.favoriteText,
                isFavorite &&
                  styles.favoriteTextActive,
              ]}
            >
              {isFavorite
                ? '♥ Remove Favorite'
                : '♡ Add to Favorites'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.downloadButton}
            onPress={handleDownload}
          >
            <Text style={styles.downloadText}>
              ↓ Download Image
            </Text>
          </Pressable>

        </View>

      </View>

    </ScrollView>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
  },

  backButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  imageContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 500,
  },

  image: {
    width: '100%',
    height: 500,
  },

  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 25,
    marginTop: 20,
  },

  label: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
  },

  value: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 25,
  },

  favoriteButton: {
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  favoriteButtonActive: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
  },

  favoriteText: {
    color: '#2563eb',
    fontWeight: 'bold',
  },

  favoriteTextActive: {
    color: '#dc2626',
  },

  downloadButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  downloadText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});