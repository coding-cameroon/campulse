import React from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

const campusRegion = {
  latitude: 37.78825, // Replace with your Campus Lat
  longitude: -122.4324, // Replace with your Campus Long
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

// Define the coordinates for the walking path
const freshmanPath = [
  { latitude: 37.78825, longitude: -122.4324 }, // Gate
  { latitude: 37.78925, longitude: -122.4334 }, // Turn at Fountain
  { latitude: 37.79025, longitude: -122.4344 }, // Library Entrance
];

export default function CampusMap() {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={campusRegion}
        provider={PROVIDER_GOOGLE} // Recommended for consistent styling
      >
        {/* Entrance Marker */}
        <Marker 
          coordinate={freshmanPath[0]} 
          title="Main Gate" 
          description="Start your journey here!"
        />

        {/* Library Marker */}
        <Marker 
          coordinate={freshmanPath[2]} 
          title="Central Library" 
          description="Open 24/7 during finals."
          pinColor="blue"
        />

        {/* The Pathway */}
        <Polyline
          coordinates={freshmanPath}
          strokeColor="#f97316" // Your orange theme color
          strokeWidth={4}
          lineDashPattern={[1]} // Optional: makes it look like a dotted path
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
});