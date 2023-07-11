import * as Location from "expo-location";

export const coordsToLocationName = async (latitude, longitude) => {
  try {
    const locationName = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    return locationName;
  } catch (error) {
    console.log("error:", error);
  }
};