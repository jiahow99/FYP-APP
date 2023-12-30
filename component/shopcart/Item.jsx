import { View, Text } from 'react-native'
import React from 'react'
import { Surface } from 'react-native-paper'
import { Image } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { cartStore } from '../../store/CartStore';
import { userStore } from '../../store/UserStore';
import { observer } from 'mobx-react';

const Item = observer(({ product }) => {
    const { user } = userStore;
    const { addToCart, removeFromCart } = cartStore;

    return (
        <View className="w-full my-2 h-24 rounded-xl bg-white p-2 flex flex-row justify-between items-center">
            {/* Image */}
            <View className="w-3/12 aspect-square">
                <Image source={{ uri:product.images[0].url }} className="w-full h-full" resizeMode='cover' />
            </View>

            {/* Info */}
            <View className="w-7/12">
                <Text className="font-medium text-gray-600">{product.name}</Text>
                <Text className="text-lg font-bold">RM {Number(product.price).toFixed(2)}</Text>
            </View>

            {/* Quantity */}
            <View className="w-8 py-1 h-full rounded-lg bg-[#4B515D] flex flex-col justify-between items-center">
                <Entypo name="plus" onPress={() => addToCart(user.uid, product)} size={20} color="white" />
                <Text className="text-white">{product.quantity}</Text>
                <Entypo name="minus" onPress={() => removeFromCart(user.uid, product)} size={20} color="white" />
            </View>
        </View>
    )
})

export default Item