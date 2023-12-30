import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import ProductImage from '../../../component/product/ProductImage';
import Price from '../../../component/product/Price';
import ProductName from '../../../component/product/ProductName';
import InStock from '../../../component/product/InStock';
import { Divider, Surface } from 'react-native-paper';
import SizeOptions from '../../../component/product/SizeOptions';
import Description from '../../../component/product/Description';
import Reviews from '../../../component/product/Reviews';
import Detailbards from '../../../component/product/Detailbards';
import axios from 'axios';
import { productStore } from '../../../store/ProductStore';
import BottomActionTab from '../../../component/product/BottomActionTab';
import { toast } from '@backpackapp-io/react-native-toast';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { renderBackdrop, snapPoints } from '../../../utils/bottomsheet';
import RequestMechanicModal from '../../../component/product/RequestMechanicModal';

const detail = () => {
    // Ref
    const modalRef = useRef(null);
    // State
    const [details, setDetails] = useState('description');
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const { id } = useLocalSearchParams();

    const { getProduct } = productStore;
    const { tyreChange } = useLocalSearchParams();

    // Open request mechanic modal
    const openModal = () => modalRef.current?.present();

    useEffect(() => {
        (async () => {
            try {
                const tyre = await getProduct(id);
                setProduct(tyre);
                setSelectedSize(tyre.available_inchs[0]);
            } catch (error) {
                toast.error('Failed to get product.');
            }
        })();
    }, [id, getProduct]);
    
return product && (
    <>
    <Stack.Screen options={{ animation: 'slide_from_right' }} />

    <View className="w-full h-full relative">
        <ScrollView className="w-full h-[100vh]">
            <ProductImage images={product.images} />
            <View className="w-11/12 mx-auto">
                {/* Price */}
                <View className="flex flex-row justify-end mt-3">
                    <Price price={product.price} />
                </View>
                {/* Name */}
                <ProductName name={product.name} />

                {/* In Stock */}
                <InStock stock={selectedSize?.stock} />

                <Divider className="my-3" />

                {/* Select the size */}
                <Text className="font-bold text-xl">
                    Select tire size :
                </Text>

                {/* Size 0ptions */}
                <SizeOptions inchs={product.available_inchs} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                
                {/* Details type */}
                <Detailbards details={details} setDetails={setDetails} />

                {details === 'description' && <Description description={product.description} />}
                {details === 'review' && <Reviews />}
            </View>
        </ScrollView>
        
        {/* Bottom bar */}
        <BottomActionTab product={product} tyreChange={tyreChange} selectedSize={selectedSize} openModal={openModal} />
        
        {/* Request mechanic modal */}
        <RequestMechanicModal ref={modalRef} product={product} selectedSize={selectedSize} />
    </View>
    </>
)
}

export default detail