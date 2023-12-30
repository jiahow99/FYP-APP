import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import storage from '@react-native-firebase/storage';
import { notificationStore } from './NotificationStore';
import { router } from 'expo-router';
import { toast } from '@backpackapp-io/react-native-toast';

class MechanicStore {
    user = null;
    loading = true;
    location = null;
    fieldValues = null;
    fieldErrors = null;

    constructor() {
        makeAutoObservable(this);
        this.initAuth();
        this.initLocation();
        // this.logout();
        this.setLoading(false);
    }

    // Init location
    initLocation = () => {
        Geolocation.getCurrentPosition(
            async (info) => {
                try {
                    const {latitude, longitude} = info.coords;
                    this.setLocation({latitude, longitude});
                } catch (error) {
                    alert(JSON.stringify(error));
                }
            },
            (error) => alert(JSON.stringify(error))
        );        
    }

    // Init Auth
    initAuth = () => {
        const onAuthStateChanged = async (userData) => {
            // Active session
            if (userData !== null) {
                this.setLoading(true);
                const uid = userData.uid;
                // Check if is mechanic or normal user
                const userDoc = await firestore().collection('users').doc(uid).get();
                if (!userDoc.exists) {
                    // Database get store data
                    // Create token if dont have in database
                    const { data } = await axios.get(`https://f76d-113-23-129-82.ngrok-free.app/api/store/uid/${uid}`);
                    if (data.token === null || data.token === '' || data.token === undefined)
                    {
                        const newToken = await this.createToken();
                        const updatedStore = await axios.put(`https://f76d-113-23-129-82.ngrok-free.app/api/store/${uid}/update-token`, {
                            token: newToken
                        });
                        this.setUser(updatedStore.data);
                        return ;
                    }
                    // Get mehcanic profile photo
                    const image = await storage().ref(`/mechanic/${data.place_id}`).getDownloadURL();
                    // Already have token, set user
                    this.setUser({...data, image});
                }
            } else {
                // Logout
                this.setUser(null)
            }
            if (this.loading) this.setLoading(false);

        }; 
        auth().onAuthStateChanged(onAuthStateChanged);
    }

    // Login
    login = async(email, password) => {        
        const { user } = await auth().signInWithEmailAndPassword(email, password);
        return user;
    }

    // Register store
    registerStore = async(values) => {
        const { email, password } = this.fieldValues;
        const { mechanic_image } = values;
        // Firebase register
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        // Register to API
        // Create token and save to Database
        if (user) {
            const token = await this.createToken();
            const data = {
                ...this.fieldValues,
                ...values,
                token,
                uid: user.uid
            }
            const store = await axios.post(`https://f76d-113-23-129-82.ngrok-free.app/api/store/create`, data, 
            {headers: {'Accept': 'application/json'}});
            // Upload Photo
            const reference = storage().ref(`/mechanic/${store.data.place_id}`);
            await reference.putFile(mechanic_image);
            const imageUrl = await reference.getDownloadURL();            
            // Set store
            this.setUser({uid: user.uid, imageUrl, ...store.data});
        }
        
        
        return user;
    }

    // Save FCM token of the store to API
    createToken = async() => {
        return await messaging().getToken();
    }

    // Logout
    logout = () => {
        return auth().signOut();
    }

    // Accept request
    acceptRequest = async (requestInfo) => {
        const loadingToast = toast.loading('Proccessing request');
        try {
            // Get latest location
            Geolocation.getCurrentPosition(
                info => {
                    this.setLocation({
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude
                    })
                },
                error => alert(JSON.stringify(error))
            );
            // // Firestore create tracking records
            // const { id } = await firestore().collection('tracking').add({
            //     userId: requestInfo?.userId,
            //     placeId: this.user.place_id,
            //     userLocation: {
            //         latitude: parseFloat(requestInfo.userLatitude),
            //         longitude: parseFloat(requestInfo.userLongitude),
            //     },
            //     mechanicLocation: {
            //         latitude: this.location.latitude,
            //         longitude: this.location.longitude,
            //     }
            // })
            // // Watch for position change
            // // Update firestore with interval 10 seconds
            // Geolocation.watchPosition(
            //     // Success callback
            //     (position) => {
            //         firestore().collection('tracking').doc(id).update({
            //             mechanicLocation: {
            //                 latitude: position.coords.latitude,
            //                 longitude: position.coords.longitude
            //             }
            //         })
            //     },
            //     (error) => {
            //       console.log('Error getting location:', error);
            //     },
            //     {
            //       enableHighAccuracy: true,
            //       interval: 10000, // Update every 10 seconds
            //       fastestInterval: 2000, // But not more frequently than every 2 seconds
            //       timeout: 10000, // Timeout after 10 seconds
            //       distanceFilter: 100, // Minimum distance change to trigger an update (10 meters)
            //     }
            // );
            // Data
            const data = {
                status: 'accepted',
                // trackingId: id,
                trackingId: '6BcBZ3xTE4ysOJ7U2wSm',
                placeId: this.user.place_id,
                userId: requestInfo.userId,
                userToken: requestInfo.userToken,
                storeToken: this.user.token, 
                storeName: this.user.name,
            };
            // Call API
            const success = await axios.post(`https://f76d-113-23-129-82.ngrok-free.app/api/accept-request`, data);
            if (success.status >= 200 && success.status < 300) {
                return requestInfo;
            }
        } catch (error) {
            alert(error);
            toast.error("Something went wrong.");
            return false;
        } finally {
            toast.dismiss(loadingToast);
        }
    }

    // Reject request
    rejectRequest = async (userId, userToken) => {
        const status = 'rejected';
        // Data
        const placeId = this.user.place_id;
        const storeToken = this.user.token;
        const data = {status, placeId, userId, userToken, storeToken,
            storeName: this.user.name
        };
        // Call API
        const res = await axios.post(`https://f76d-113-23-129-82.ngrok-free.app/api/accept-request`, data);
        if (res.status >= 200 && res.status < 300) {
            return true;
        }
        return false;
    }

    // Complete service
    completeService = async (trackingInfo) => {
        const res = await axios.post(`https://f76d-113-23-129-82.ngrok-free.app/api/complete-request`, trackingInfo);
        return res.status >= 200 && res.status < 300;
    }

    // Set 
    setLoading = (value) => this.loading = value;
    setUser = (value) => this.user = value;
    setLocation = (value) => this.location = value;
    setFieldValues = (value) => this.fieldValues = value;
    setFieldErrors = (value) => this.fieldErrors = {...this.fieldErrors, ...value};
}

export const mechanicStore = new MechanicStore();