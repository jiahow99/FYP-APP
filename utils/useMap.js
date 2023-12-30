import * as Location from 'expo-location';
import {GOOGLE_API_KEY, API_URL} from '@env';
import axios from 'axios';
import storeDummyData from '../assets/data/stores.json';

const useMap = () => {
    // Get location service
    const getLocationService = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        return status === 'granted';
    }

    // Search nearby place
    const searchNearbyStore = async (lat, lng, radius=10) => {
        try {
            const response = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
              params: {
                location: `${lat},${lng}`,
                radius: radius * 1000,   // 10 km
                type: 'car_repair',
                key: GOOGLE_API_KEY
              }
            });
            const results =  response.data.results;
            // Verifit stores with API
            // add "is_registered" and "token" tp registered store
            const data = {stores: results};
            const verifiedStores = await axios.post(`https://f76d-113-23-129-82.ngrok-free.app/api/verify-stores`, data);
            return verifiedStores.data;
        } catch (error) {
            alert(`Error verify stores. ${JSON.stringify(error)}`);
        }
    }

    
    // Calculate distance between user and the store (km)
    const calculateDistance = (storeCoords, userCoords) => {    
        const radlat1 = (Math.PI * userCoords.latitude) / 180;
        const radlat2 = (Math.PI * storeCoords.lat) / 180;
        const theta = userCoords.longitude - storeCoords.lng;
        const radtheta = (Math.PI * theta) / 180;
    
        let distance =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    
        if (distance > 1) {
            distance = 1;
        }
    
        distance = Math.acos(distance);
        distance = (distance * 180) / Math.PI;
        distance = distance * 60 * 1.1515;
    
        // Convert distance to the desired unit (e.g., kilometers)
        distance = distance * 1.609344;
    
        return distance.toFixed(2); // Rounding to 2 decimal places
      };


    return {getLocationService, searchNearbyStore, calculateDistance};
}

export default useMap;