import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyCart from '../../component/shopcart/MyCart'
import BackButton from '../../component/BackButton';
import { Stack, router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import Item from '../../component/shopcart/Item';
import { ScrollView } from 'react-native';
import AddToCartBar from '../../component/shopcart/AddToCartBar';
import { useEffect } from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { cartStore } from '../../store/CartStore';
import LoadingAnimation from '../../component/LoadingAnimation';
import { userStore } from '../../store/UserStore';

const shopcart = observer(() => {
    const { user } = userStore;
    const { items, getCartItems, initiated } = cartStore;

    // Fetch cart items
    useEffect(() => {
        (async () => {
            if (!initiated) {
                getCartItems(user.uid);
            }
        })();
    }, [initiated]);

    return (
        <>
        {/* <Stack.Screen options={{ headerShown: false }} /> */}

        <View className="bg-[#F6F6F6]">
        <SafeAreaView>
        <View className="relative w-full h-[100vh] ">
        <ScrollView className="w-11/12 mx-auto h-[83vh]" showsVerticalScrollIndicator={false}>
            <View className="mt-3 flex flex-row justify-between">
                {/* Back */}
                <BackButton onPress={() => router.back()} />
                {/* Title (Cart) */}
                <MyCart />
                <BackButton show={false} />
            </View>
            {/* Products */}
            {initiated ? (
                <View className="w-full h-full min-h-[3px] mt-3">
                <FlashList
                    data={items}
                    renderItem={({item: product}) => (<Item product={product} />)}
                    estimatedItemSize={100}
                />
                </View>
            ):(
                <LoadingAnimation isVisible={!initiated}>Loading</LoadingAnimation>
            )}
        </ScrollView>
        
        {/* Add to cart */}
        <AddToCartBar />
        </View>
        </SafeAreaView>
    </View>
    </>
    )
})

export default shopcart