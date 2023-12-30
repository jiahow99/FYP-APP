import { View, Text } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { TouchableOpacity } from 'react-native'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import { useRef } from 'react'
import { renderBackdrop, snapPoints } from '../../utils/bottomsheet'
import { toast } from '@backpackapp-io/react-native-toast'
import { router, useLocalSearchParams } from 'expo-router'
import { productStore } from '../../store/ProductStore'
import { userStore } from '../../store/UserStore'

const RequestMechanicModal = forwardRef(({ product, selectedSize }, ref) => {
    // Ref
    const modalRef = useRef(null);

    useImperativeHandle(ref, () => ({
        present(){
            modalRef.current?.present();
        }
    }));

    const { user } = userStore;
    const { addToCart } = productStore;

    const { place_id } = useLocalSearchParams();
    
    // Add to cart
    const addProduct = async () => {
        // Loading
        const loadingToast = toast.loading('Adding your item')
        // Add to cart
        try {
            await addToCart(user.uid, product, selectedSize);
            toast.success('Added to your cart !');
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            toast.dismiss(loadingToast);
        }
    }

    // Navigate to choose mechanic
    const requestMechanic = () => {
        modalRef.current?.dismiss();
        place_id === null 
            ? router.push(`(tabs)/repair/mechanic?tyreChange=true&tyreId=${product.id}&inch=${selectedSize.inch}&width=${selectedSize.width}`)
            : router.push(`/(tabs)/repair/customer?tyreChange=true&place_id=${place_id}&tyreId=${product.id}&inch=${selectedSize.inch}&width=${selectedSize.width}`);
        
    }

    return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints(['20%'])}
            backdropComponent={renderBackdrop(0,null, 'close')}
            enablePanDownToClose
        >
            <View className="w-full h-full flex items-center justify-center">
            <TouchableOpacity onPress={requestMechanic} className="w-full py-3 flex items-center justify-center">
                <Text className="text-lg font-semibold text-gray-700">Request Mechanic</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={addProduct} className="w-full py-3 flex items-center justify-center">
                <Text className="text-lg font-semibold text-gray-700">Add To Cart</Text>
            </TouchableOpacity >
            </View>
        </BottomSheetModal>
    )
})

export default RequestMechanicModal