import { makeAutoObservable } from "mobx";
import firestore from '@react-native-firebase/firestore';

class CartStore {
    items = null;
    initiated = false;

    constructor() {
        makeAutoObservable(this);
    }

    get totalPrice() {
        let totalPrice = 0;
        if (this.items) {
            this.items.forEach(item => {
                // quantity x price
                const itemTotalPrice = item.quantity * item.price;
                // Add on
                totalPrice += itemTotalPrice;
            });
        }
        return totalPrice;
    }

    // Get shopping cart items
    getCartItems = (userId) => {
        return new Promise((resolve, reject) => {
            firestore().collection('users').doc(userId)
                .onSnapshot(snapShot => {
                    const cart = snapShot.data().cart;
                    if (cart) {
                        this.setItems(cart);
                    }
                    this.setInitiated(true);
                    resolve();
                });
        });
    }

    // Add to cart
    addToCart = async (userId, product, selectedSize=null) => {
        if (!this.initiated) await this.getCartItems(userId);
        // User doc from firestore
        const userDoc = firestore().collection('users').doc(userId);
        // Add tyre
        if (selectedSize !== null) {
            // Check product quantity in users cart
            // If dont have product, make quantity = 1
            // If already in cart, make quantity += 1
            const productIndex = this.items.findIndex(x => x.id === product.id && x.inch === selectedSize.inch && x.width === selectedSize.width);
            if (productIndex !== -1) {
                this.items[productIndex].quantity += 1;
            } else {
                this.items.push({
                    ...product,
                    inch: selectedSize.inch, 
                    width: selectedSize.width,
                    quantity: 1
                });
            }
        // Add spare parts
        } else {
            const productIndex = this.items.findIndex(x => x.id === product.id);
            if (productIndex !== -1) {
                this.items[productIndex].quantity += 1;
            } else {
                this.items.push({
                    ...product,
                    quantity: 1
                });
            }
        }
        // Update in firestore
        await userDoc.update({ cart: this.items });
    }

    removeFromCart = async (userId, product, selectedSize=null) => {
        if (!this.initiated) await this.getCartItems(userId);
        // User doc from firestore
        const userDoc = firestore().collection('users').doc(userId);
        // Remove tyre
        if (selectedSize !== null) {
            // Check product quantity in users cart
            // If quantity = 1, remove it
            const productIndex = this.items.findIndex(x => x.id === product.id && x.inch === selectedSize.inch && x.width === selectedSize.width);
            // If have > 1 quantity, make quantity -= 1
            if (productIndex !== -1) {
                const product = this.items[productIndex];
                if (product.quantity !== 1) {
                    this.items[productIndex].quantity -= 1; // quantity - 1
                } else {
                    this.items.splice(productIndex, 1); // remove item
                }
            }
        // Remove spare parts
        } else {
            const productIndex = this.items.findIndex(x => x.id === product.id);
            if (productIndex !== -1) {
                const product = this.items[productIndex];
                if (product.quantity !== 1) {
                    this.items[productIndex].quantity -= 1; // quantity - 1
                } else {
                    this.items.splice(productIndex, 1); // remove item
                }
            }
        }
        // Update in firestore
        await userDoc.update({ cart: this.items });
    }

    setItems = (value) => this.items = value;
    setInitiated = (value) => this.initiated = value;
}

export const cartStore = new CartStore();