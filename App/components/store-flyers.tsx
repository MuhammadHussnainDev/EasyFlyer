import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreFlyersWithStoreImage } from '../../actions/store-flyers/fetch-store-flyers';
import { toggleStoreFlyer } from '../../store/slices/storeSlice';
import { RootState } from '../../store/store';
import { filterExpiredContent } from '../../utils/dateUtils';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

interface StoreFlyer {
  id: string;
  image?: string | null;
  storeImage?: string | null;
  storeName?: string;
  title?: string;
  validTo?: string;
  storeQrCode?: string;
  brandQrCode?: string;
}

const StoreFlyersComponent = ({ userData, navigation }: any) => {
  const dispatch = useDispatch();
  const [storeFlyers, setStoreFlyers] = useState<StoreFlyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const favorites = useSelector((state: RootState) => state.storeFlyers || []);
  const selectedCategories = useSelector(
    (state: RootState) => state.categories,
  );

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadFlyers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const flyers = await fetchStoreFlyersWithStoreImage(
        userData?.postalCode,
        selectedCategories,
      );
      if (!isMountedRef.current) {
        return;
      }
      // Filter out expired content
      const validFlyers = filterExpiredContent(flyers, 'validTo') as StoreFlyer[];
      setStoreFlyers(validFlyers);
    } catch (err) {
      if (!isMountedRef.current) {
        return;
      }
      console.error('Error fetching store flyers:', err);
      setError('Failed to load flyers. Please try again.');
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [userData?.postalCode, selectedCategories]);

  useEffect(() => {
    loadFlyers();
  }, [loadFlyers]);

  const toggleFavorite = (flyer: StoreFlyer) => {
    dispatch(toggleStoreFlyer(flyer));
  };

  const navigateToFlyerScreen = (item: StoreFlyer) => {
    navigation.navigate('Flyer', { deal: item });
  };

  const renderFlyer = ({ item }: { item: StoreFlyer }) => {
    const isFavorite = (favorites as StoreFlyer[]).some(
      (flyer: StoreFlyer) => flyer.id === item.id,
    );

    return (
      <View style={styles.flyerCard}>
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFavorite(item)}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-o'}
            size={22}
            color={isFavorite ? '#FF0000' : '#888'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToFlyerScreen(item)}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={styles.flyerImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.flyerImage, styles.imagePlaceholder]} />
          )}
          <View style={styles.flyerInfo}>
            {item.storeImage ? (
              <Image
                source={{ uri: item.storeImage }}
                style={styles.storeImage}
              />
            ) : (
              <View style={[styles.storeImage, styles.imagePlaceholder]} />
            )}
            <View style={styles.textInfo}>
              <Text style={styles.storeName}>{item.storeName}</Text>
              <Text style={styles.flyerTitle}>{item.title}</Text>
              {item.validTo ? (
                <Text style={styles.flyerValidity}>
                  Until : {formatDate(item.validTo)}
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4C6EF5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={loadFlyers} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (storeFlyers.length === 0) {
    return (
      <View style={styles.noFlyersContainer}>
        <Text style={styles.noFlyersText}>
          No flyers available for this store.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={storeFlyers}
      keyExtractor={item => item.id}
      renderItem={renderFlyer}
      contentContainerStyle={styles.flyerList}
      removeClippedSubviews
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFlyersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noFlyersText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#888',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e53e3e',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#4C6EF5',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePlaceholder: {
    backgroundColor: '#ddd',
  },
  flyerList: {
    padding: 10,
  },
  flyerCard: {
    backgroundColor: '#ffffff',
    // marginBottom: 15,
    marginBottom: 5,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  flyerImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  flyerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  storeImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  flyerTitle: {
    fontSize: 16,
    color: '#555',
  },
  flyerValidity: {
    fontSize: 14,
    color: '#777',
  },
  heartIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    elevation: 5,
    zIndex: 10, // Ensures it's above other elements
  },
});

export default StoreFlyersComponent;
