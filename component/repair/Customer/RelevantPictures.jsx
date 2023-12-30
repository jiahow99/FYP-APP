import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CameraToggle from './CameraToggle'
import { FlashList } from '@shopify/flash-list'
import ImageUpload from './ImageUpload'
import { useField } from 'formik'

const RelevantPictures = () => {
  // Formik usefield
  const [field, meta, helpers] = useField('images');

  // add image
  const addImages = (pickedImages) => {
    pickedImages.map(image => {
      helpers.setValue([...field.value, image.uri]);
    })
  }

  // Camera toggle 
  const cameraToggleItem = { uri: 'camera_toggle_placeholder', isCameraToggle: true };

  return (
    <View className="mt-3">
        {/* Relevant Pictures */}
        <Text className="text-white font-bold text-lg">Relevant Pictures (car, location)</Text>

        <View className="w-full">          
          {/* Images */}
          <FlashList 
            data={[cameraToggleItem, ...field.value]}
            numColumns={3}
            estimatedItemSize={10}
            renderItem={({ item }) => {
              if (item.isCameraToggle) {
                return <CameraToggle addImages={addImages} />;
              } else {
                return <ImageUpload uri={item} />;
              }
            }}
          />
        </View>
        

    </View>
  )
}

export default RelevantPictures