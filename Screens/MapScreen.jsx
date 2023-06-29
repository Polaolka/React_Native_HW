import React, { useState, useEffect} from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from "expo-location";

export default function MapScreen({ route }) {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
          }
    
          let location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setLocation(coords);
        })();
      }, []);
  
      return (
        <View style={{ flex: 1 }}>
          {location && (
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                ...location,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={location}
                title="I am here"
                description="Hello"
              />
            </MapView>
          )}
        </View>
      );
    
  }