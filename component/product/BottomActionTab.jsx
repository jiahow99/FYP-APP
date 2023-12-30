import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Surface } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { cartStore } from '../../store/CartStore';
import { toast } from '@backpackapp-io/react-native-toast';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { userStore } from '../../store/UserStore';

const BottomActionTab = ({ product, selectedSize, tyreChange=false, openModal }) => {
    const { user } = userStore;
    const { addToCart } = cartStore;
    // Add to cart
    const handleAddToCart = async () => {
        const loadingToast = toast.loading('Adding cart');
        try {
            await addToCart(user.uid, product, selectedSize);
            toast.success('Added to your cart !');
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    return (
        <Surface className="absolute bottom-0 left-0 w-full bg-[#4B515D] py-4 rounded-t-2xl" elevation={4}>
            <View className="w-11/12 mx-auto flex flex-row">
                {/* Add to cart */}
                <TouchableOpacity onPress={tyreChange === 'true' ? openModal : handleAddToCart} className="w-11/12 mx-auto bg-[#1FE89C] rounded-xl py-3 flex items-center justify-center">
                    <Text className="font-bold text-white text-xl">
                        {tyreChange === 'true' ? 'Choose' : 'Add To Cart'}
                    </Text>
                </TouchableOpacity>
            </View>
        </Surface>
    )
}

export default BottomActionTab