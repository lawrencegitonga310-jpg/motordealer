# Mrenga Carhire Android App

## Overview
A native Android application for Mrenga Carhire car rental service, providing users with convenient mobile access to browse, book, and manage car rentals.

## Features
- **Car Browsing** - View available vehicles with details and images
- **Search & Filter** - Find cars by type, price range, and location
- **User Authentication** - Login, registration, and profile management
- **Booking System** - Reserve cars with date/time selection
- **Payment Integration** - Secure payment processing
- **Location Services** - Find nearest branches and get directions
- **Booking History** - View past and current rentals
- **Push Notifications** - Booking confirmations and reminders

## Technology Stack
- **Framework**: React Native
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **API Integration**: Axios
- **UI Components**: Native Elements
- **Authentication**: JWT tokens
- **Storage**: AsyncStorage
- **Maps**: Google Maps API

## Project Structure
```
android-app/
├── src/
│   ├── components/
│   │   ├── HomeScreen.js
│   │   ├── CarListScreen.js
│   │   ├── CarDetailScreen.js
│   │   ├── BookingScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── LocationScreen.js
│   │   └── AuthScreen.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── storage.js
│   ├── utils/
│   │   └── helpers.js
│   └── styles/
│       └── styles.js
├── android/
│   ├── app/
│   │   └── build.gradle
│   └── gradle/
│       └── wrapper/
├── ios/
│   └── (for future React Native iOS support)
├── package.json
└── index.js
```

## API Endpoints
- Base URL: `https://gitongalawrence.alwaysdata.net/api/`
- Authentication: `/signin`, `/signup`
- Cars: `/get_products`
- Bookings: `/add_booking`
- Locations: Custom location endpoints

## Development Phases

### Phase 1: Setup & Navigation
- Initialize React Native project
- Set up navigation structure
- Create basic screen components
- Implement tab navigation

### Phase 2: Core Features
- Car browsing and search
- User authentication
- Basic booking functionality
- Location services integration

### Phase 3: Advanced Features
- Payment processing
- Booking history
- Push notifications
- Offline support

### Phase 4: Polish & Deploy
- UI/UX improvements
- Performance optimization
- Testing and debugging
- App store deployment

## Getting Started

### Prerequisites
- Node.js and npm/yarn
- React Native CLI
- Android Studio
- Physical Android device or emulator

### Installation
```bash
npx react-native init MrengaCarhire
cd MrengaCarhire
npm install @reduxjs/toolkit react-navigation @react-native-async-storage/async-storage axios
```

### Running the App
```bash
npx react-native run-android
# or
npx react-native start
```

## Design Guidelines
- Follow Material Design principles
- Use Mrenga Carhire brand colors (#007bff, #28a745)
- Implement responsive layouts
- Ensure accessibility standards
- Optimize for performance

## Security Considerations
- Secure API communication
- Token-based authentication
- Input validation and sanitization
- Secure storage of sensitive data
