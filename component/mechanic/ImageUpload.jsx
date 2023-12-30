import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { useField } from 'formik';

const ImageUpload = () => {
    const [field, meta, helpers] = useField('mechanic_image');

    // Launch image pick
    // Pick Image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [1,1],
        });
        // Set images
        if (!result.canceled) {
            helpers.setValue(result.assets[0].uri)
        }
    }


    return (
        <View className="w-full flex items-center justify-center mt-3">
            {meta.value ? (
            <Image 
                onPress={pickImage}
                source={{ uri: meta.value }} 
                resizeMode='cover' 
                className="w-32 h-32 rounded-full"
            />
            ):(
            <TouchableOpacity onPress={pickImage} className="w-32 h-32 rounded-full bg-gray-500 flex items-center justify-center">
                <FontAwesome name="camera" size={35} color="black" />
            </TouchableOpacity>
            )}

            {/* Error message */}
            {meta.touched && meta.error && 
                <Text className="text-red-500 font-bold w-fit mx-auto mt-1">
                    Please upload an image
                </Text>
            }
        </View>
    )
}

export default ImageUpload