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
import { partStore } from '../../../store/PartStore';
import BottomActionTab from '../../../component/product/BottomActionTab';
import { toast } from '@backpackapp-io/react-native-toast';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { renderBackdrop, snapPoints } from '../../../utils/bottomsheet';
import RequestMechanicModal from '../../../component/product/RequestMechanicModal';
import BottomAddCart from '../../../component/parts/BottomAddCart';

const detail = () => {
    // State
    const [details, setDetails] = useState('description');
    const [part, setPart] = useState(null);

    const { id } = useLocalSearchParams();
    
    const { fetchPart } = partStore;

    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetchPart(id);
                setPart(data);
            } catch (error) {
                // toast.error('Failed to get product.');
                alert(JSON.stringify(error));
            }
        })();
    }, [id, fetchPart]);
    
return part && (
    <>
    <Stack.Screen options={{ animation: 'slide_from_right' }} />

    <View className="w-full h-full relative">
        <ScrollView className="w-full h-[100vh]">
            <ProductImage images={part.images} />
            <View className="w-11/12 mx-auto">
                {/* Price */}
                <View className="flex flex-row justify-end mt-3">
                    <Price price={part.price} />
                </View>
                {/* Name */}
                <ProductName name={part.name} />

                {/* In Stock */}
                <InStock stock={part.stock} />

                <Divider className="my-3" />
                
                {/* Details type */}
                <Detailbards details={details} setDetails={setDetails} />

                {details === 'description' && <Description description={part.description} />}
                {details === 'review' && <Reviews />}
            </View>
        </ScrollView>
        
        {/* Bottom bar */}
        <BottomAddCart product={part} />
    </View>
    </>
)
}

export default detail