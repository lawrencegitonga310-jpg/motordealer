import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, DatePickerAndroid } from 'react-native';
import { api } from '../services/api';

const BookingScreen = ({ route, navigation }) => {
  const { car } = route.params;
  const [bookingData, setBookingData] = useState({
    car_id: car.id,
    start_date: '',
    end_date: '',
    pickup_location: '',
    return_location: '',
    total_cost: car.product_cost,
    customer_name: '',
    customer_phone: '',
    customer_email: '',
  });
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    // Validation
    if (!bookingData.start_date || !bookingData.end_date || !bookingData.customer_name || !bookingData.customer_phone) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await api.createBooking(bookingData);
      Alert.alert(
        'Booking Confirmed!',
        `Your ${car.product_name} has been reserved from ${bookingData.start_date} to ${bookingData.end_date}. Total cost: KES ${bookingData.total_cost}`,
        [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]
      );
    } catch (error) {
      Alert.alert('Booking Failed', error.message || 'Unable to complete booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book {car.product_name}</Text>
      </View>

      {/* Car Summary */}
      <View style={styles.carSummary}>
        <Text style={styles.sectionTitle}>Vehicle Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Vehicle:</Text>
          <Text style={styles.summaryValue}>{car.product_name}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Daily Rate:</Text>
          <Text style={styles.summaryValue}>KES {car.product_cost}</Text>
        </View>
      </View>

      {/* Booking Form */}
      <ScrollView style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Pickup Date</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.dateInput}>{bookingData.start_date || 'Select date'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Return Date</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.dateInput}>{bookingData.end_date || 'Select date'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Pickup Location</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter pickup location"
            value={bookingData.pickup_location}
            onChangeText={(text) => setBookingData({...bookingData, pickup_location: text})}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Return Location</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter return location"
            value={bookingData.return_location}
            onChangeText={(text) => setBookingData({...bookingData, return_location: text})}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your full name"
            value={bookingData.customer_name}
            onChangeText={(text) => setBookingData({...bookingData, customer_name: text})}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone number"
            value={bookingData.customer_phone}
            onChangeText={(text) => setBookingData({...bookingData, customer_phone: text})}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            value={bookingData.customer_email}
            onChangeText={(text) => setBookingData({...bookingData, customer_email: text})}
            keyboardType="email-address"
          />
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBooking}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.bookButtonText}>Processing...</Text>
          ) : (
            <Text style={styles.bookButtonText}>Complete Booking</Text>
          )}
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
  carSummary: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#2c3e50',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  bookButton: {
    backgroundColor: '#28a745',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
