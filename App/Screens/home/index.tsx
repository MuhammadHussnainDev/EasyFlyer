import React, { useCallback, useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntitiesByPostalCode, Entity } from '../../../actions/brand/fetch-brands';
import { toggleFavorite } from '../../../store/slices/favoritesSlice';
import { AuthContext } from '../../../lib/AuthContext';
import { RootState } from '../../../store/store';

const HomeScreen = ({ navigation }: any) => {
  const { userData } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  const {
    data: stores = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Entity[]>({
    queryKey: ['entities', userData?.postalCode],
    queryFn: async () => {
      const result = await fetchEntitiesByPostalCode(userData?.postalCode);
      if (!result.success) {
        throw new Error(result.message || 'Failed to load brands.');
      }
      return result.entities ?? [];
    },
    enabled: !!userData?.postalCode,
  });

  const handleToggleFavorite = useCallback(
    (brand: Entity) => {
      dispatch(toggleFavorite(brand));
    },
    [dispatch],
  );

  const filteredStores = stores.filter(store =>
    store.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderStoreItem = useCallback(
    ({ item }: { item: Entity }) => {
      const isFavorite = (favorites as Entity[]).some(fav => fav.id === item.id);

      return (
        <Pressable
          style={[styles.storeItem, isFavorite && styles.favoriteItem]}
          onPress={() => handleToggleFavorite(item)}>
          <Image
            source={
              item.image
                ? { uri: item.image }
                : require('../../../assets/appstore.png')
            }
            style={styles.storeIcon}
            resizeMode="cover"
          />
          <Text style={styles.storeName} numberOfLines={1}>
            {item.name}
          </Text>
        </Pressable>
      );
    },
    [favorites, handleToggleFavorite],
  );

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#4C6EF5" />;
    }

    if (isError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something went wrong. Please try again.</Text>
          <TouchableOpacity
            onPress={() => refetch()}
            style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredStores}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={renderStoreItem}
        contentContainerStyle={styles.storeList}
        removeClippedSubviews
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.headerText}>
        {filteredStores.length} Brands found near you!
      </Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a store"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={'#000'}
      />
      {renderContent()}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('categories')}
          style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next (1/2)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('categories')}>
          <Text style={styles.skipText}>Skip this step</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    position: 'relative',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchBar: {
    height: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
  },
  storeList: { paddingHorizontal: 5 },
  storeItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  favoriteItem: {
    borderWidth: 2,
    borderColor: '#4C6EF5',
  },
  storeIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  nextButton: {
    backgroundColor: '#4C6EF5',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  skipText: { color: '#4C6EF5', fontSize: 14, textAlign: 'center' },
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
});

export default HomeScreen;
