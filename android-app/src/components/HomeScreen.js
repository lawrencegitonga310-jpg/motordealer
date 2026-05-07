import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../redux/slices/carSlice';
import { API_BASE_URL } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector(state => state.cars);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = cars.filter(car => 
        car.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.product_description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [cars, searchQuery]);

  const handleCarPress = (car) => {
    navigation.navigate('CarDetail', { car });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const renderCarItem = (car) => (
    <TouchableOpacity 
      style={styles.carCard}
      onPress={() => handleCarPress(car)}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: `${API_BASE_URL}/static/images/${car.product_photo}` }}
        style={styles.carImage}
        resizeMode="cover"
      />
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{car.product_name}</Text>
        <Text style={styles.carPrice}>KES {car.product_cost}/day</Text>
        <Text style={styles.carDescription} numberOfLines={2}>
          {car.product_description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading cars...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading cars. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mrenga Carhire</Text>
        <Text style={styles.headerSubtitle}>Premium Car Rental Service</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search cars..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Cars List */}
      <ScrollView 
        style={styles.carsList}
        showsVerticalScrollIndicator={false}
      >
        {filteredCars.map((car) => (
          <View key={car.id} style={styles.carContainer}>
            {renderCarItem(car)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    alignItems: 'center',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchInput: {
    height: 45,
    fontSize: 16,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  carsList: {
    flex: 1,
    padding: 15,
  },
  carContainer: {
    marginBottom: 15,
  },
  carCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  carImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  marginRight: 15,
  },
  carInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  carPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
    marginBottom: 5,
  },
  carDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
});

export default HomeScreen;
