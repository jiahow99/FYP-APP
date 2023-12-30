import { makeAutoObservable } from "mobx";
import firestore from '@react-native-firebase/firestore';
import { toast } from "@backpackapp-io/react-native-toast";
import axios from "axios";
import Geocoder from 'react-native-geocoding';

class TrackingStore {
    trackingInfo=null;
    trackingId=null;
    pending=true;
    placeId=null;
    userInfo=null;
    tyreInfo=null;
    userLocation=null;
    mechanicLocation=null;
    initiating=false;
    mechanicInfo=null;
    eta=null;
    duration=null;
    userAddress=null;
    mechanicAddress=null;
    completed=false;

    constructor() {
        makeAutoObservable(this);
    }

    initTracking = async (trackingId, mechanicInfo) => {
        if (this.completed) this.setCompleted(false);
        this.setInitiating(true);
        try {
            this.setMechanicInfo(JSON.parse(mechanicInfo));
            this.setTrackingId(trackingId);
            // Listen for location change from firestore
            // Update mechanic movement
            firestore().collection('tracking').doc(trackingId).onSnapshot(async (snapShop) => {
                if (snapShop.exists){
                    const {userLocation, mechanicLocation} = snapShop.data();
                    this.setUserLocation(userLocation);
                    this.setMechanicLocation(mechanicLocation);
                    // Update ETA
                    const { duration, eta } = await this.calculateEta(userLocation, mechanicLocation);
                    this.setDuration(duration);
                    this.setEta(eta);
                    // Get address with coordinates
                    Geocoder.init(process.env.GOOGLE_API_KEY);
                    const { results: userAddressResult } = await Geocoder.from([userLocation.latitude, userLocation.longitude]);
                    this.setUserAddress(userAddressResult[0].formatted_address);
                    const { results: mechanicAddressResult } = await Geocoder.from([mechanicLocation.latitude, mechanicLocation.longitude]);
                    this.setMechanicAddress(mechanicAddressResult[0].formatted_address);
                }
            })
            this.setInitiating(false);
        } catch (error) {
            // toast.error("Error initiate tracking.");
            alert(error);
        } finally {
            this.setPending(false);
        }
    }

    calculateEta = async (userLocation, mechanicLocation) => {
        // Call Api
        const { data } = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
            params: {
                origins: `${userLocation.latitude},${userLocation.longitude}`,
                destinations: `${mechanicLocation.latitude},${mechanicLocation.longitude}`,
                key: process.env.GOOGLE_API_KEY
            }
        });
        const durationInSeconds = data.rows[0].elements[0].duration.value;
        const durationInMinutes = Math.ceil(durationInSeconds / 60);
        // Calculate ETA based on the current time
        const now = new Date();
        const eta = new Date(now.getTime() + durationInSeconds * 1000);
        // Format ETA in "12:30 PM" format
        const formattedETA = eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        return {
            duration: durationInMinutes,
            eta: formattedETA
        }
    }

    // Complete tracking
    completeTracking = async (trackingId) => {
        this.setCompleted(true);
        // Delete tracking record
        // firestore()
        //     .collection('tracking')
        //     .doc(trackingId)
        //     .delete();
    }

    // Set
    setTrackingId = (value) => this.trackingId = value;
    setMechanicLocation = (value) => this.mechanicLocation = value;
    setPending = (value) => this.pending = value;
    setPlaceId = (value) => this.placeId = value;
    setUserInfo = (value) => this.userInfo = value;
    setUserLocation = (value) => this.userLocation = value;
    setTyreInfo = (value) => this.tyreInfo = value;
    setInitiating = (value) => this.initiating = value;
    setTrackingInfo = (value) => this.trackingInfo = value;
    setMechanicInfo = (value) => this.mechanicInfo = value;
    setEta = (value) => this.eta = value;
    setDuration = (value) => this.duration = value;
    setMechanicAddress = (value) => this.mechanicAddress = value;
    setUserAddress = (value) => this.userAddress = value;
    setCompleted = (value) => this.completed = value;
}

export const trackingStore = new TrackingStore();