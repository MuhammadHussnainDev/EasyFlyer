import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Vector Icons

const DealScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Walmart Canada</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon name="share" size={24} color="#000000" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="chat-bubble-outline"
              size={24}
              color="#000000"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="more-vert"
              size={24}
              color="#000000"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Store Info */}
      <View style={styles.storeInfo}>
        <Text style={styles.storeTitle}>Walmart Canada</Text>
        <Text style={styles.dateRange}>Aug 01 to Sep 04</Text>
      </View>

      {/* Flyer Image */}
      <ScrollView style={styles.flyerContent} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: 'https://via.placeholder.com/350x500' }} // Replace with actual flyer image
          style={styles.flyerImage}
        />
      </ScrollView>

      {/* Deal Info */}
      <View style={styles.dealInfo}>
        <View style={styles.dealDetails}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100x100' }} // Replace with actual product image
            style={styles.dealImage}
          />
          <View style={styles.dealText}>
            <Text style={styles.dealTitle}>Mainstays 2-Slice Toaster</Text>
            <Text style={styles.dealPrice}>$9.98</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('List')}
            style={styles.buyNowButton}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareDealButton}>
            <Text style={styles.shareDealText}>Share deal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  storeInfo: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  storeTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  dateRange: {
    fontSize: 14,
    color: '#000000',
    marginTop: 5,
  },
  flyerContent: {
    flex: 1,
    padding: 10,
  },
  flyerImage: {
    width: '100%',
    height: 400,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  dealInfo: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dealDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dealImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  dealText: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dealPrice: {
    fontSize: 18,
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#4C6EF5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    marginRight: 10,
    shadowColor: '#4C6EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareDealButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4C6EF5',
  },
  shareDealText: {
    color: '#4C6EF5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DealScreen;
