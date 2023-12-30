import { makeAutoObservable } from "mobx";
import useMap from "../utils/useMap";
import Geolocation from '@react-native-community/geolocation';
import { trackingStore } from "./TrackingStore";

class NotificationStore {
    requestInfo = null;
    modalOpen = false;
    tyreModalOpen = false;
    requireLocationOpen = false;
    wazeModal = false;
    userLocation = null;

    constructor() {
        makeAutoObservable(this);
    }

    toggleModal = (value, info=null) => {
        this.modalOpen = value;
        // Info in modal
        if (info !== null) {
            this.requestInfo = info;
        }
    }

    toggleTyreModal = (value, data=null) => {
        this.tyreModalOpen = value;        
        this.requestInfo = data;
    }

    toggleRequireLocation = (value) => {
        this.requireLocationOpen = value;
    }
    
    toggleWazeModal = (value, latitude=null, longitude=null) => {
        // Open modal
        this.wazeModal = value;
        // Set user location for navigation
        this.setUserLocation({latitude, longitude}); 
    };

    setRequestInfo = (value) => this.requestInfo = value;
    setUserLocation = (value) => this.userLocation = value;
}

export const notificationStore = new NotificationStore();