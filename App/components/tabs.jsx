/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

export const Tabs = ({
  activeTab,
  setActiveTab,
  activeSubTab,
  setActiveSubTab,
}) => (
  <View>
    {/* Main Tabs */}
    <View style={styles.tabs}>
      {['Flyers', 'Special Events', 'Gift Cards'].map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTab === index && styles.activeTab]}
          onPress={() => setActiveTab(index)}>
          <Text
            style={[
              styles.tabText,
              activeTab === index && styles.activeTabText,
            ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    {/* Sub-Tabs for Flyers */}
    {activeTab === 0 && (
      <View style={styles.subTabs}>
        {['Brand Flyers', 'Store Flyers'].map((subTab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.subTab,
              activeSubTab === index && styles.activeSubTab,
            ]}
            onPress={() => setActiveSubTab(index)}>
            <Text
              style={[
                styles.subTabText,
                activeSubTab === index && styles.activeSubTabText,
              ]}>
              {subTab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    minHeight: 50,
    paddingVertical: 8,
  },
  tab: {
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#4C6EF5' },
  tabText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#4C6EF5',
    fontWeight: 'bold',
  },
  subTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    minHeight: 44,
  },
  subTab: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  activeSubTab: { borderBottomWidth: 2, borderBottomColor: '#4C6EF5' },
  subTabText: {
    color: '#777',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeSubTabText: {
    color: '#4C6EF5',
    fontWeight: 'bold',
  },
});
