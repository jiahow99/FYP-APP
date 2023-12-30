import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Surface } from 'react-native-paper'
import { TouchableOpacity } from 'react-native';
import { userStore } from '../../store/UserStore';
import { toast } from '@backpackapp-io/react-native-toast';
import { cartStore } from '../../store/CartStore';

const BottomAddCart = ({ product }) => {
    const { user } = userStore;
    const { addToCart } = cartStore;
    // Add to cart
    const handleAddToCart = async () => {
        const loadingToast = toast.loading('Adding cart');
        try {
            await addToCart(user.uid, product);
            toast.success('Added to your cart !');
        } catch (error) {
            toast.error("Something went wrong.");
            // alert(error);
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    return (
        <Surface className="absolute bottom-0 left-0 w-full bg-[#4B515D] py-4 rounded-t-2xl" elevation={4}>
            <View className="w-11/12 mx-auto flex flex-row">
                {/* Add to cart */}
                <TouchableOpacity onPress={handleAddToCart} className="w-11/12 mx-auto bg-[#1FE89C] rounded-xl py-3 flex items-center justify-center">
                    <Text className="font-bold text-white text-xl">
                        Add to Cart
                    </Text>
                </TouchableOpacity>
            </View>
        </Surface>
    )
}

export default BottomAddCart