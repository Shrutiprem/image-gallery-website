import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
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

interface FavoritesScreenProps {
  onBack: () => void;
  onImagePress: (photo: Photo) => void;
}

const FavoritesScreen = ({
  onBack,
  onImagePress,
}: FavoritesScreenProps) => {
  const [favorites, setFavorites] = useState<Photo[]>([]);
  const [search, setSearch] = useState('');

  // Load favorites when screen opens
  useEffect(() => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  }, []);

  // Remove favorite
  const removeFavorite = (photoId: string) => {
    const updatedFavorites = favorites.filter(
      (photo) => photo.id !== photoId
    );

    setFavorites(updatedFavorites);

    saveFavorites(updatedFavorites);
  };

  // Search favorites by author
  const filteredFavorites = favorites.filter(
    (photo) =>
      photo.author
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>

        <View>
          <Text style={styles.title}>
            Favorites
          </Text>

          <Text style={styles.subtitle}>
            Your saved images
          </Text>
        </View>

        <Pressable
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>
            Back to Gallery
          </Text>
        </Pressable>

      </View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search favorites by author..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Count */}
      <Text style={styles.countText}>
        {favorites.length} favorite
        {favorites.length !== 1 ? 's' : ''}
      </Text>

      {/* Favorites Gallery */}
      <View style={styles.gallery}>

        {filteredFavorites.map((photo) => (
          <View
            key={photo.id}
            style={styles.card}
          >

            <Pressable
  onPress={() => onImagePress(photo)}
>
  <Image
    source={{
      uri: photo.download_url,
    }}
    style={styles.image}
    resizeMode="cover"
  />
</Pressable>

            <View style={styles.cardContent}>

              <Text
                style={styles.author}
                numberOfLines={1}
              >
                {photo.author}
              </Text>

              <Pressable
                style={styles.removeButton}
                onPress={() =>
                  removeFavorite(photo.id)
                }
              >
                <Text style={styles.removeButtonText}>
                  ♥ Remove Favorite
                </Text>
              </Pressable>

            </View>

          </View>
        ))}

      </View>

      {/* No favorites */}
      {favorites.length === 0 && (
        <View style={styles.emptyContainer}>

          <Text style={styles.emptyTitle}>
            No Favorites Yet
          </Text>

          <Text style={styles.emptyText}>
            Go to the gallery and add some images
            to your favorites.
          </Text>

          <Pressable
            style={styles.galleryButton}
            onPress={onBack}
          >
            <Text style={styles.galleryButtonText}>
              Go to Gallery
            </Text>
          </Pressable>

        </View>
      )}

      {/* No search result */}
      {favorites.length > 0 &&
        filteredFavorites.length === 0 && (
          <Text style={styles.noResults}>
            No favorite images found.
          </Text>
        )}

    </ScrollView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#666666',
    marginTop: 5,
  },

  backButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  backButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 13,
    fontSize: 16,
    marginBottom: 15,
  },

  countText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },

  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    width: 280,
    marginBottom: 10,
  },

  image: {
    width: '100%',
    height: 220,
  },

  cardContent: {
    padding: 12,
  },

  author: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  removeButton: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#ef4444',
    padding: 9,
    borderRadius: 7,
    alignItems: 'center',
  },

  removeButtonText: {
    color: '#dc2626',
    fontWeight: '600',
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  emptyText: {
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },

  galleryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  galleryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  noResults: {
    textAlign: 'center',
    marginTop: 30,
    color: '#666666',
    fontSize: 16,
  },
});