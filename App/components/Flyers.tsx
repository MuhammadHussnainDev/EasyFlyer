import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import FlyerItem from '../../utils/FlyerItem';
import {
  fetchFlyersByPostalCodeWithBrandImage,
  Flyer,
} from '../../actions/flyer/fetch-flyer';
import { toggleBrandFlyer } from '../../store/slices/brandSlice';
import { RootState } from '../../store/store';
import { filterExpiredContent } from '../../utils/dateUtils';

const FlyersComponent = ({ userData, navigation }: any) => {
  const dispatch = useDispatch();

  const brandFlyers = useSelector((state: RootState) => state.brandFlyers);
  const selectedCategories = useSelector(
    (state: RootState) => state.categories,
  );

  const {
    data: flyers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Flyer[]>({
    queryKey: ['flyers', userData?.postalCode, selectedCategories],
    queryFn: async () => {
      const allFlyers = await fetchFlyersByPostalCodeWithBrandImage(
        userData?.postalCode,
        selectedCategories,
      );
      return filterExpiredContent(allFlyers, 'validTo') as Flyer[];
    },
    enabled: !!userData?.postalCode,
  });

  const toggleFavorite = useCallback(
    (flyer: Flyer) => {
      if (!flyer || !flyer.id || !flyer.title) {
        console.error('Invalid flyer:', flyer);
        return;
      }
      dispatch(toggleBrandFlyer({ id: flyer.id, name: flyer.title }));
    },
    [dispatch],
  );

  const renderFlyer = ({ item }: { item: Flyer }) => {
    const isFavorite = brandFlyers.some((flyer: any) => flyer.id === item.id);

    return (
      <FlyerItem
        item={item}
        navigation={navigation}
        isFavorite={isFavorite}
        toggleFavorite={() => toggleFavorite(item)}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4C6EF5" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load flyers. Please try again.</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (flyers.length === 0) {
    return (
      <View style={styles.noFlyersContainer}>
        <Text style={styles.noFlyersText}>
          No flyers available for this location.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={flyers}
      keyExtractor={item => item.id}
      renderItem={renderFlyer}
      contentContainerStyle={styles.flyerList}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
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
  },
  noFlyersText: {
    fontSize: 16,
    color: '#777',
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
  flyerList: {
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
    fontSize: 16,
  },
});

export default FlyersComponent;
