import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { Photo } from '../types';
import {
  getFavorites,
  saveFavorites,
} from '../services/storage';

interface HomeScreenProps {
  onLogout: () => void;
  onFavorites: () => void;
  onProfile: () => void;
  onImagePress: (photo: Photo) => void;
}

const HomeScreen = ({
  onLogout,
  onFavorites,
  onProfile,
  onImagePress,
}: HomeScreenProps) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [favorites, setFavorites] = useState<Photo[]>([]);

  const [search, setSearch] = useState('');

  const [filter, setFilter] = useState<'all' | 'am' | 'nz'>('all');

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  }, []);

  // Load first page
  useEffect(() => {
    fetchPhotos(1, true);
  }, []);

  // Fetch photos from Picsum
  const fetchPhotos = async (
    pageNumber: number,
    replace: boolean = false
  ) => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=12`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data: Photo[] = await response.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      if (replace) {
        setPhotos(data);
      } else {
        setPhotos((previousPhotos) => [
          ...previousPhotos,
          ...data,
        ]);
      }

      setPage(pageNumber);
    } catch (err) {
      setError('Unable to load images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load more
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchPhotos(page + 1);
    }
  };

  // Refresh
  const handleRefresh = () => {
    setHasMore(true);
    fetchPhotos(1, true);
  };

  // Check if photo is favorite
  const isFavorite = (photoId: string) => {
    return favorites.some(
      (photo) => photo.id === photoId
    );
  };

  // Add / remove favorite
  const toggleFavorite = (photo: Photo) => {
    let updatedFavorites: Photo[];

    if (isFavorite(photo.id)) {
      updatedFavorites = favorites.filter(
        (item) => item.id !== photo.id
      );
    } else {
      updatedFavorites = [
        ...favorites,
        photo,
      ];
    }

    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  // Search + filter
  const filteredPhotos = photos.filter((photo) => {
    const authorName = photo.author.toLowerCase();
    const searchText = search.toLowerCase();

    const matchesSearch =
      authorName.includes(searchText);

    let matchesFilter = true;

    if (filter === 'am') {
      matchesFilter =
        authorName.charAt(0) >= 'a' &&
        authorName.charAt(0) <= 'm';
    }

    if (filter === 'nz') {
      matchesFilter =
        authorName.charAt(0) >= 'n' &&
        authorName.charAt(0) <= 'z';
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>

  <View>
    <Text style={styles.title}>
      Image Gallery
    </Text>

    <Text style={styles.subtitle}>
      Explore beautiful images
    </Text>
  </View>

  <View style={styles.headerButtons}>

    <Pressable
      style={styles.profileButton}
      onPress={onProfile}
    >
      <Text style={styles.profileText}>
        Profile
      </Text>
    </Pressable>

    <Pressable
      style={styles.logoutButton}
      onPress={onLogout}
    >
      <Text style={styles.logoutText}>
        Logout
      </Text>
    </Pressable>

  </View>

</View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by author..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Filter buttons */}
      <View style={styles.filterContainer}>

        <Pressable
          style={[
            styles.filterButton,
            filter === 'all' && styles.activeFilter,
          ]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === 'am' && styles.activeFilter,
          ]}
          onPress={() => setFilter('am')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'am' && styles.activeFilterText,
            ]}
          >
            A - M
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === 'nz' && styles.activeFilter,
          ]}
          onPress={() => setFilter('nz')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'nz' && styles.activeFilterText,
            ]}
          >
            N - Z
          </Text>
        </Pressable>

      </View>

      {/* Action buttons */}
      <View style={styles.actionContainer}>

        <Pressable
          style={styles.actionButton}
          onPress={handleRefresh}
        >
          <Text style={styles.actionText}>
            Refresh
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={onFavorites}
        >
          <Text style={styles.actionText}>
            Favorites ({favorites.length})
          </Text>
        </Pressable>
        {/* <Pressable
    style={styles.actionButton}
    onPress={onProfile}
  >
    <Text style={styles.actionText}>
      Profile
    </Text>
  </Pressable> */}

      </View>

      {/* Error */}
      {error !== '' && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {/* Loading */}
      {loading && photos.length === 0 && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Loading images...
          </Text>
        </View>
      )}

      {/* Gallery */}
      <View style={styles.gallery}>

        {filteredPhotos.map((photo) => (
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
                style={[
                  styles.favoriteButton,
                  isFavorite(photo.id) &&
                    styles.favoriteActive,
                ]}
                onPress={() =>
                  toggleFavorite(photo)
                }
              >
                <Text
                  style={[
                    styles.favoriteText,
                    isFavorite(photo.id) &&
                      styles.favoriteActiveText,
                  ]}
                >
                  {isFavorite(photo.id)
                    ? '♥ Favorited'
                    : '♡ Favorite'}
                </Text>
              </Pressable>

            </View>

          </View>
        ))}

      </View>

      {/* No results */}
      {!loading &&
        filteredPhotos.length === 0 && (
          <Text style={styles.noResults}>
            No images found.
          </Text>
        )}

      {/* Load More */}
      {hasMore && (
        <Pressable
          style={styles.loadMoreButton}
          onPress={handleLoadMore}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.loadMoreText}>
              Load More
            </Text>
          )}
        </Pressable>
      )}

    </ScrollView>
  );
};

export default HomeScreen;

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

  headerButtons: {
  flexDirection: 'row',
  gap: 10,
},

profileButton: {
  backgroundColor: '#2563eb',
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 8,
},

profileText: {
  color: '#ffffff',
  fontWeight: 'bold',
},

  logoutButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  logoutText: {
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

  filterContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  filterButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  activeFilter: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },

  filterText: {
    color: '#333333',
    fontWeight: '600',
  },

  activeFilterText: {
    color: '#ffffff',
  },

  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  actionButton: {
    backgroundColor: '#111827',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  actionText: {
    color: '#ffffff',
    fontWeight: '600',
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

  favoriteButton: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 9,
    borderRadius: 7,
    alignItems: 'center',
  },

  favoriteActive: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
  },

  favoriteText: {
    fontWeight: '600',
    color: '#333333',
  },

  favoriteActiveText: {
    color: '#dc2626',
  },

  loadingContainer: {
    alignItems: 'center',
    padding: 30,
  },

  loadingText: {
    marginTop: 10,
    color: '#666666',
  },

  error: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 15,
  },

  noResults: {
    textAlign: 'center',
    fontSize: 17,
    color: '#666666',
    marginTop: 30,
  },

  loadMoreButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    minWidth: 150,
  },

  loadMoreText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});