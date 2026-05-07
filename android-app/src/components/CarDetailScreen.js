import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Button, ActivityIndicator, Alert } from 'react-native';
import { API_BASE_URL } from '../services/api';

const CarDetailScreen = ({ route, navigation }) => {
  const { car } = route.params;
  const [loading, setLoading] = useState(false);

  const handleBookNow = () => {
    setLoading(true);
    // Simulate booking API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Booking Confirmed!',
        `Your ${car.product_name} has been reserved. You will receive a confirmation shortly.`,
        [
          { text: 'OK', onPress: () => navigation.navigate('Bookings') }
        ]
      );
    }, 2000);
  };

  const handleCallBranch = () => {
    Alert.alert(
      'Call Branch',
      'Would you like to call our customer service to complete your booking?',
      [
        { text: 'Call', onPress: () => console.log('Calling branch...') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{car.product_name}</Text>
      </View>

      {/* Car Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: `${API_BASE_URL}/static/images/${car.product_photo}` }}
          style={styles.carImage}
          resizeMode="cover"
        />
      </View>

      {/* Car Details */}
      <ScrollView style={styles.detailsContainer}>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>Premium Sedan</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Seats:</Text>
            <Text style={styles.detailValue}>5 Passengers</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transmission:</Text>
            <Text style={styles.detailValue}>Automatic</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fuel:</Text>
            <Text style={styles.detailValue}>Petrol</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Rental Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Daily Rate:</Text>
            <Text style={styles.detailValue}>KES {car.product_cost}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Availability:</Text>
            <Text style={styles.detailValue}>Available Now</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Deposit:</Text>
            <Text style={styles.detailValue}>KES {(parseInt(car.product_cost) * 0.3)}</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{car.product_description}</Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.bookButton]}
          onPress={handleBookNow}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.actionButtonText}>Book Now</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.callButton]}
          onPress={handleCallBranch}
        >
          <Text style={styles.actionButtonText}>Call Branch</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#007bff',
  },
  backButton: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  imageContainer: {
    height: 250,
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  detailSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  descriptionSection: {
    marginBottom: 25,
  },
  description: {
    fontSize: 15,
    color: '#6c757d',
    lineHeight: 22,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 30,
  },
  actionButton: {
    flex: 1,
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButton: {
    backgroundColor: '#28a745',
  },
  callButton: {
    backgroundColor: '#17a2b8',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CarDetailScreen;
