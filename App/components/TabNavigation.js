import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => (
  <View style={styles.tabs}>
    {tabs.map((tab, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.tab, activeTab === index && styles.activeTab]}
        onPress={() => onTabChange(index)}>
        <Text
          style={[styles.tabText, activeTab === index && styles.activeTabText]}>
          {tab.label}
        </Text>
      </TouchableOpacity>
    ))}
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
});

export default TabNavigation;
