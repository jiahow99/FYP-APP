import auth from '@react-native-firebase/auth';
import { makeAutoObservable } from 'mobx';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
import useMap from '../utils/useMap';
import {GOOGLE_API_KEY} from '@env';
import axios from 'axios';

class UserStore {
    user = null;
    location = null;
    loading = true;
    activeSteps = 1;
    nearbyStores = null;
    cart = [];

    constructor() {
        makeAutoObservable(this);
        this.initAuth();
        // this.logout();
    }
    
    // Init Auth
    initAuth = async () => {
        const onAuthStateChanged = async (userData) => {
            // Active session
            if (userData !== null) {
                const userId = userData.uid;
                // Firestore get user data
                const userDoc = await firestore().collection('users').doc(userId).get();
                // Check if user has token
                // If no token then create one
                // Load user's shopping cart
                if (userDoc.exists) {
                    let { uid, username, email, token } = userDoc.data();
                    if (token === null || token === '' || token === undefined) {
                        const newToken = await this.saveToken(uid);
                        firestore().collection('carts').doc(uid).get()
                            .then(documentSnapshot => {
                                if (documentSnapshot.exists) {
                                    alert(JSON.stringify(documentSnapshot));
                                }
                            });
                        this.setUser({
                            uid,
                            username,
                            email,
                            token: newToken
                        });
                    } else {
                        this.setUser({uid: userId,username,email,token});
                    }
                } 
                // Logout
            } else {
                this.setUser(null)
            }
        }; 
        // Get nearby stores
        this.getNearbyStore();
        this.setLoading(false);
        auth().onAuthStateChanged(onAuthStateChanged);
    }

    // Get nearby store
    getNearbyStore = () => {
        // const {searchNearbyStore} = useMap();
        // Get current position
        // Then call Places API to search nearby store
        Geolocation.getCurrentPosition(
            async (info) => {
                try {
                    const {latitude, longitude} = info.coords;
                    this.setLocation({latitude, longitude});
                    const storesFromGoogle = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
                        params: {
                          location: `${latitude},${longitude}`,
                          radius: 10 * 1000,   // 10 km
                          type: 'car_repair',
                          key: GOOGLE_API_KEY
                        }
                    });
                    const data = {stores: storesFromGoogle.data.results};
                    const verifiedStores = await axios.post(`https://f76d-113-23-129-82.ngrok-free.app/api/verify-stores`, data);
                    this.setNearbyStores(verifiedStores.data);
                    // this.nearbyStores = verifiedStores.data;
                    // return verifiedStores.data;
                    // alert(JSON.stringify(verifiedStores.data[0]));
                } catch (error) {
                    alert(error);
                }
            },
            (error) => alert(JSON.stringify(error))
        );        
    }

    // Login
    login = async(email, password) => {
        this.setLoading(true);
        
        const { user } = await auth().signInWithEmailAndPassword(email, password);
        const uid = user.uid;
        // Check if user have token in db
        const userFromDb = await firestore()
            .collection('users')
            .doc(uid)
            .get(); 
        const userToken = userFromDb.data().token;

        // Create token if dun have
        if (userToken === null || userToken === '' || userToken === undefined) {
            const token = await this.saveToken(user);
            this.setUser({...userFromDb.data(),token});
        }

        this.setLoading(false);
    }

    // Register user
    registerUser = async(username, email, password) => {
        const { user } = await auth().createUserWithEmailAndPassword(email, password)
        const token = await this.saveToken(user, true, {username,cart:[]});
        this.setUser({
            username,
            email,
            token,
        })
        return true;
    }

    // Logout
    logout = () => {
        return auth().signOut();
    }

    // Save FCM token to "user"
    saveToken = async(user, newUser=false, additionValues={}) => {
        const newToken = await messaging().getToken();
        // Add the token to the users datastore
        if (newUser) {
            await firestore()
                .collection('users')
                .doc(user.uid)
                .set({
                    uid: user.uid,
                    email: user.email,
                    token: newToken,
                    ...additionValues
                });
        } else {
            await firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    token: newToken
                });
        }
        return newToken;
    }

    removeFromCart = async (product) => {
        // User doc from firestore
        const userDoc = firestore().collection('users').doc(this.user.uid);
        // Check product index in users cart
        // If have > 1, decrement quantity
        // If quantity = 1, remove 
        const productIndex = this.cart.findIndex(x => x.id === product.id);
        const currentQuantity = this.cart[productIndex];
        if (currentQuantity > 1) {
            this.cart[productIndex].quantity -= 1;  // decrement
        } else {
            this.cart.splice(productIndex, 1);  // remove
        }
        // Update in firestore
        await userDoc.update({ cart: this.cart });
    }

    // Set 
    setLoading = (value) => this.loading = value;
    setUser = (value) => this.user = value;
    setLocation = (value) => this.location = value;
    setSteps = (value) => this.steps = value;
    setNearbyStores = (value) => this.nearbyStores = value;
}

export const userStore = new UserStore();